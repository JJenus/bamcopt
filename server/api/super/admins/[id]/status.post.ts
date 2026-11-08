import { parseBody, uuidParam } from "../../../../utils/validate";
import { requireSuperAdmin } from "../../../../utils/superadmin";
import { AdminStatusBody } from "../../../../utils/schemas";
import { forgetUser } from "../../../../utils/access";
import { requestInfo } from "../../../../utils/auth";
import { AuditLog } from "../../../../models";
import { getAdminForSuper } from "../../../../services/sessions";
import { revokeSessions } from "../../../../services/user-sessions";

/**
 * Switch an administrator off (SUSPENDED: cannot sign in, every session ends now) or back on (ACTIVE).
 * Unlike "sign out everywhere", they cannot simply sign in again.
 */
export default defineEventHandler(async (event) => {
	const auth = await requireSuperAdmin(event);
	const admin = await getAdminForSuper(await uuidParam(event));
	const { status } = await parseBody(event, AdminStatusBody);
	await admin.update({ status });
	forgetUser(admin.id);
	const ended = status === "SUSPENDED" ? await revokeSessions(admin.id, { by: auth.userId, reason: "Suspended by the super admin" }) : 0;
	try {
		const info = requestInfo(event);
		await AuditLog.create({ actorId: auth.userId, action: status === "SUSPENDED" ? "admin.suspend" : "admin.restore", targetType: "user", targetId: admin.id, summary: `${status === "SUSPENDED" ? "Suspended" : "Restored"} administrator ${admin.email}`, ip: info.ip, deviceInfo: info.device.slice(0, 250) });
	} catch {}
	return { status, sessionsEnded: ended };
});
