import { Op } from "sequelize";
import { AuditLog, SecurityLog, UserSession } from "../models";

const days = (key: string, fallback: number) => {
	const raw = process.env[key];
	if (raw === undefined || raw.trim() === "") return fallback;
	const n = Number(raw);
	return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback;
};

/**
 * How long records are kept. 0 means forever.
 * Sign-in history: 365 days. Ended sessions (expired or revoked): 30 days. The admin audit trail is a financial record
 * and is kept forever unless AUDIT_RETENTION_DAYS says otherwise.
 */
export const retentionSettings = () => ({
	securityLogDays: days("SECURITY_LOG_RETENTION_DAYS", 365),
	auditLogDays: days("AUDIT_RETENTION_DAYS", 0),
	sessionDays: days("SESSION_RETENTION_DAYS", 30),
});

const before = (d: number) => new Date(Date.now() - d * 86400000);

/** Deletes what is past its retention. Returns how many rows went from each table. */
export const pruneOldRecords = async () => {
	const cfg = retentionSettings();
	const removed = { securityLogs: 0, auditLogs: 0, sessions: 0 };
	if (cfg.securityLogDays) removed.securityLogs = await SecurityLog.destroy({ where: { createdAt: { [Op.lt]: before(cfg.securityLogDays) } } });
	if (cfg.auditLogDays) removed.auditLogs = await AuditLog.destroy({ where: { createdAt: { [Op.lt]: before(cfg.auditLogDays) } } });
	if (cfg.sessionDays) {
		const cutoff = before(cfg.sessionDays);
		removed.sessions = await UserSession.destroy({ where: { [Op.or]: [{ expiresAt: { [Op.lt]: cutoff } }, { revokedAt: { [Op.lt]: cutoff } }] } });
	}
	return removed;
};

export const retentionReport = async () => ({
	settings: retentionSettings(),
	rows: { securityLogs: await SecurityLog.count(), auditLogs: await AuditLog.count(), sessions: await UserSession.count() },
});
