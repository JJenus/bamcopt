import type { H3Event } from "h3";
import { Op } from "sequelize";
import { AuditLog } from "../models";
import { isAdmin, requestInfo, type AuthContext } from "../utils/auth";

export type AuditEntry = {
	/** area.verb, e.g. "account.credit". The part before the dot groups entries in the super admin filter. */
	action: string;
	targetType?: string;
	targetId?: string;
	summary: string;
	meta?: Record<string, unknown>;
};

/** The few request fields worth keeping in `meta`. Never copy a whole body: it may hold codes or account numbers. */
export const pick = (source: Record<string, unknown> | undefined, keys: string[]) =>
	Object.fromEntries(keys.filter((key) => source && source[key] !== undefined).map((key) => [key, source![key]]));

/**
 * Records something an administrator just did. Call it AFTER the change succeeded.
 * Best effort: a failing audit write is logged and never fails the admin's request.
 */
export const recordAdminAction = async (event: H3Event, auth: AuthContext, entry: AuditEntry) => {
	if (!isAdmin(auth)) return;
	try {
		const info = requestInfo(event);
		await AuditLog.create({
			actorId: auth.userId, action: entry.action, targetType: entry.targetType ?? null, targetId: entry.targetId ?? null,
			summary: entry.summary.slice(0, 500), meta: entry.meta ?? null, ip: info.ip, deviceInfo: info.device.slice(0, 250),
		});
	} catch (error) {
		console.error("[audit] could not record", entry.action, (error as Error).message);
	}
};

export type AdminAction = {
	id: string; action: string; targetType: string | null; targetId: string | null; summary: string;
	meta: Record<string, unknown> | null; ip: string; deviceInfo: string; createdAt: string;
};

/** Newest first, paged with `before`. `area` keeps one family of actions ("account", "user", "deposit"...). */
export const listAdminActions = async (actorId: string, opts: { limit?: number; before?: string; area?: string } = {}) => {
	const limit = Math.min(Math.max(Number(opts.limit) || 50, 1), 200);
	const where: Record<string, unknown> = { actorId };
	if (opts.area && /^[a-z]+$/.test(opts.area)) where.action = { [Op.like]: `${opts.area}.%` };
	if (opts.before && !Number.isNaN(Date.parse(opts.before))) where.createdAt = { [Op.lt]: new Date(opts.before) };
	const rows = await AuditLog.findAll({ where, order: [["createdAt", "DESC"]], limit: limit + 1 });
	const page = rows.slice(0, limit).map((row) => {
		const r = row.toJSON() as any;
		return { id: r.id, action: r.action, targetType: r.targetType, targetId: r.targetId, summary: r.summary, meta: r.meta ?? null, ip: r.ip || "unknown", deviceInfo: r.deviceInfo || "", createdAt: new Date(r.createdAt).toISOString() } as AdminAction;
	});
	return { actions: page, nextBefore: rows.length > limit ? page[page.length - 1].createdAt : null };
};

export const countAdminActions = (actorId: string, sinceDays: number) =>
	AuditLog.count({ where: { actorId, createdAt: { [Op.gte]: new Date(Date.now() - sinceDays * 86400000) } } });
