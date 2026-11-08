import { Op } from "sequelize";
import { SecurityLog, SecurityLogAction, UserSession } from "../models";
import { parseDevice } from "../utils/device";
import { unauthorized } from "../utils/errors";

/** Matches the 5 day lifetime of the session token. */
export const SESSION_TTL_MS = 5 * 24 * 60 * 60 * 1000;

type Info = { ip: string; device: string };

/** Stores the session and returns its id for the token. Never throws: without a row the token still works, it just cannot be revoked. */
export const createSession = async (userId: string, info?: Info): Promise<string | undefined> => {
	try {
		const row = await UserSession.create({
			userId, userAgent: (info?.device || "unknown").slice(0, 250), ip: info?.ip || "unknown",
			lastSeenAt: new Date(), expiresAt: new Date(Date.now() + SESSION_TTL_MS),
		});
		return row.id;
	} catch (error) {
		console.error("[session] could not store the session:", (error as Error).message);
		return undefined;
	}
};

// A session confirmed active is trusted for a few seconds so a page that fires several calls checks the database once.
// Revoking forgets it at once (single instance), so the delay never applies to a revoked session.
const activeUntil = new Map<string, number>();
const lastTouch = new Map<string, number>();
const CONFIRM_MS = 5000;
const TOUCH_MS = 60000;

/** Throws 401 when the session was revoked or has expired. A database error fails open: it must not lock everyone out. */
export const assertSessionActive = async (sid: string) => {
	const now = Date.now();
	if ((activeUntil.get(sid) ?? 0) > now) return;
	let row: UserSession | null;
	try {
		row = await UserSession.findByPk(sid);
	} catch (error) {
		console.error("[session] could not check the session:", (error as Error).message);
		return;
	}
	if (!row || row.revokedAt || row.expiresAt.getTime() <= now) {
		activeUntil.delete(sid);
		throw unauthorized("Session ended");
	}
	if (activeUntil.size > 5000) activeUntil.clear();
	activeUntil.set(sid, now + CONFIRM_MS);
	if (now - (lastTouch.get(sid) ?? 0) > TOUCH_MS) {
		lastTouch.set(sid, now);
		if (lastTouch.size > 5000) lastTouch.clear();
		void row.update({ lastSeenAt: new Date() }).catch(() => {});
	}
};

export const activeSessionsOf = (userId: string) =>
	UserSession.findAll({ where: { userId, revokedAt: null, expiresAt: { [Op.gt]: new Date() } } });

/**
 * Ends sessions of a user: one device (`deviceKey`), everything except `exceptSid`, or all of them.
 * Each ended session also leaves a "logout" row in the sign-in history. Returns how many were ended.
 */
export const revokeSessions = async (userId: string, opts: { deviceKey?: string; exceptSid?: string; by: string; reason: string }) => {
	const rows = await activeSessionsOf(userId);
	const targets = rows.filter((row) => row.id !== opts.exceptSid && (!opts.deviceKey || parseDevice(row.userAgent).key === opts.deviceKey));
	if (!targets.length) return 0;
	await UserSession.update({ revokedAt: new Date(), revokedBy: opts.by, revokeReason: opts.reason.slice(0, 200) }, { where: { id: targets.map((row) => row.id) } });
	for (const row of targets) activeUntil.delete(row.id);
	try {
		await SecurityLog.bulkCreate(targets.map((row) => ({ userId, action: SecurityLogAction.LOGOUT, ip: row.ip || "unknown", deviceInfo: row.userAgent || "unknown", reason: opts.reason })));
	} catch {}
	return targets.length;
};

/** Ends exactly one session (the caller's own, on sign-out). Idempotent. */
export const endSession = async (sid: string, userId: string) => {
	const row = await UserSession.findByPk(sid);
	if (!row || row.userId !== userId || row.revokedAt) return false;
	await row.update({ revokedAt: new Date(), revokedBy: userId, revokeReason: "Signed out" });
	activeUntil.delete(sid);
	try { await SecurityLog.create({ userId, action: SecurityLogAction.LOGOUT, ip: row.ip || "unknown", deviceInfo: row.userAgent || "unknown", reason: "Signed out" }); } catch {}
	return true;
};
