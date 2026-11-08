import { Op } from "sequelize";
import { SecurityLog, SecurityLogAction, User } from "../models";
import type { AuthContext } from "../utils/auth";
import { parseDevice, type DeviceType } from "../utils/device";
import { forbidden, notFound } from "../utils/errors";
import { verifySuperAdmin } from "../utils/superadmin";
import { countAdminActions } from "./audit";
import { activeSessionsOf } from "./user-sessions";

/** How many recent successful sign-ins are grouped into devices. */
const WINDOW = 1000;
const FAILED_DAYS = 30;

export type DeviceSession = {
	key: string; label: string; browser: string; os: string; deviceType: DeviceType;
	signIns: number; firstSeen: string; lastSeen: string;
	/** sessions that are still signed in on this device, and when one of them last made a request */
	activeSessions: number; lastActive: string | null; online: boolean;
	lastIp: string; lastLocation: string; ips: string[]; locations: string[]; userAgent: string; current: boolean;
};

export type LoginEvent = {
	id: string; action: string; createdAt: string; ip: string; location: string; reason: string; userAgent: string;
	device: { key: string; label: string; browser: string; os: string; deviceType: DeviceType };
};

const iso = (value: unknown) => new Date(value as string).toISOString();

const toEvent = (row: SecurityLog): LoginEvent => {
	const r = row.toJSON() as any;
	const device = parseDevice(r.deviceInfo);
	return {
		id: r.id, action: r.action, createdAt: iso(r.createdAt), ip: r.ip || "unknown", location: r.location || "",
		reason: r.reason || "", userAgent: r.deviceInfo || "", device: { key: device.key, label: device.label, browser: device.browser, os: device.os, deviceType: device.deviceType },
	};
};

/**
 * Who may read someone's sign-in data: the person themself; a super admin (anyone);
 * an admin (customers only, never other admins or the super admin).
 */
export const assertCanViewSessions = async (auth: AuthContext, target: { id: string; userType: string }) => {
	if (auth.userId === target.id) return;
	if (auth.userType === "superadmin") { await verifySuperAdmin(auth); return; }
	if (auth.userType === "admin" && target.userType === "user") return;
	throw forbidden();
};

/**
 * Successful sign-ins grouped by device (browser + OS + type from the user agent), newest first.
 * Failed attempts are reported separately: they are never a session.
 */
export const deviceSessions = async (userId: string, currentKey?: string) => {
	const logins = await SecurityLog.findAll({ where: { userId, action: SecurityLogAction.LOGIN }, order: [["createdAt", "DESC"]], limit: WINDOW });
	const groups = new Map<string, DeviceSession>();
	for (const row of logins) {
		const event = toEvent(row);
		let g = groups.get(event.device.key);
		if (!g) {
			g = { ...event.device, signIns: 0, firstSeen: event.createdAt, lastSeen: event.createdAt, lastIp: event.ip, lastLocation: event.location, ips: [], locations: [], userAgent: event.userAgent, current: event.device.key === currentKey, activeSessions: 0, lastActive: null, online: false };
			groups.set(event.device.key, g);
		}
		g.signIns++;
		g.firstSeen = event.createdAt; // rows arrive newest first, so the last one seen is the oldest
		if (!g.lastLocation && event.location) g.lastLocation = event.location;
		if (event.ip && !g.ips.includes(event.ip)) g.ips.push(event.ip);
		if (event.location && !g.locations.includes(event.location)) g.locations.push(event.location);
	}

	// which devices are signed in right now (server-side sessions that were not revoked and have not expired)
	const active = await activeSessionsOf(userId);
	const ONLINE_MS = 5 * 60 * 1000;
	for (const row of active) {
		const g = groups.get(parseDevice(row.userAgent).key);
		if (!g) continue;
		g.activeSessions++;
		const seen = new Date(row.lastSeenAt).toISOString();
		if (!g.lastActive || seen > g.lastActive) g.lastActive = seen;
		if (Date.now() - new Date(row.lastSeenAt).getTime() < ONLINE_MS) g.online = true;
	}

	const since = new Date(Date.now() - FAILED_DAYS * 86400000);
	const failedWhere = { userId, action: SecurityLogAction.ATTEMPT_FAILED, createdAt: { [Op.gte]: since } };
	const [failedCount, failedRecent] = await Promise.all([
		SecurityLog.count({ where: failedWhere }),
		SecurityLog.findAll({ where: failedWhere, order: [["createdAt", "DESC"]], limit: 5 }),
	]);

	return {
		devices: [...groups.values()].sort((a, b) => b.lastSeen.localeCompare(a.lastSeen)),
		activeSessions: active.length,
		failedAttempts: { days: FAILED_DAYS, count: failedCount, recent: failedRecent.map(toEvent) },
		truncated: logins.length === WINDOW,
	};
};

/** The raw audit trail, newest first, paged with `before` (the createdAt of the last row you have). */
export const loginEvents = async (userId: string, opts: { limit?: number; before?: string; action?: "login" | "attempt_failed" | "logout" } = {}) => {
	const limit = Math.min(Math.max(Number(opts.limit) || 50, 1), 200);
	const where: Record<string, unknown> = { userId };
	if (opts.action) where.action = opts.action;
	if (opts.before && !Number.isNaN(Date.parse(opts.before))) where.createdAt = { [Op.lt]: new Date(opts.before) };
	const rows = await SecurityLog.findAll({ where, order: [["createdAt", "DESC"]], limit: limit + 1 });
	const page = rows.slice(0, limit).map(toEvent);
	return { events: page, nextBefore: rows.length > limit ? page[page.length - 1].createdAt : null };
};

/** One row per administrator for the super admin: who they are and how they last signed in. */
export const adminOverview = async () => {
	const admins = await User.findAll({ where: { userType: "admin" }, order: [["createdAt", "ASC"]] });
	return Promise.all(admins.map(async (admin) => {
		const [{ devices, failedAttempts, activeSessions }, actions7d] = await Promise.all([deviceSessions(admin.id), countAdminActions(admin.id, 7)]);
		const latest = devices[0];
		// devices first seen this week, not counting the very first device the account ever used
		const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
		const firstEver = devices.reduce((min, d) => (d.firstSeen < min ? d.firstSeen : min), "9999");
		const newDevices7d = Math.max(0, devices.filter((d) => d.firstSeen >= weekAgo).length - (firstEver >= weekAgo ? 1 : 0));
		return {
			id: admin.id, name: admin.name, email: admin.email, status: admin.status, createdAt: admin.createdAt,
			lastSignIn: latest ? { at: latest.lastSeen, ip: latest.lastIp, location: latest.lastLocation, device: latest.label } : null,
			devices: devices.length, signIns: devices.reduce((sum, d) => sum + d.signIns, 0), failedAttempts: failedAttempts.count, actions7d, newDevices7d, activeSessions, online: devices.some((d) => d.online),
		};
	}));
};

export const getAdminForSuper = async (id: string) => {
	const admin = await User.findByPk(id);
	if (!admin || admin.userType !== "admin") throw notFound("Administrator not found");
	return admin;
};
