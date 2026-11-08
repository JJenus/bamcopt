import { parseBody, uuidParam } from "../../../utils/validate";
import { requireAuth } from "../../../utils/auth";
import { SessionRevokeBody } from "../../../utils/schemas";
import { forbidden } from "../../../utils/errors";
import { verifySuperAdmin } from "../../../utils/superadmin";
import { getUser } from "../../../services/users";
import { revokeSessions } from "../../../services/user-sessions";

/**
 * Sign devices out. You can do it for yourself; the super admin can do it for an administrator.
 * { deviceKey } one device · { others: true } every session except this one · { all: true } everything, this one too.
 */
export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	const body = await parseBody(event, SessionRevokeBody);
	const target = await getUser(await uuidParam(event));
	let reason = "Signed out by the account owner";
	if (auth.userId !== target.id) {
		await verifySuperAdmin(auth);
		if (target.userType !== "admin") throw forbidden();
		reason = "Signed out by the super admin";
	}
	const revoked = await revokeSessions(target.id, { deviceKey: body.deviceKey, exceptSid: body.others ? auth.sid : undefined, by: auth.userId, reason });
	return { revoked };
});
