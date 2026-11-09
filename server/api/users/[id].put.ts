import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { getUserFor, updateUser } from "../../services/users";
import { unprocessable } from "../../utils/errors";
import { pick, recordAdminAction } from "../../services/audit";
import { revokeSessions } from "../../services/user-sessions";
import { forgetUser, isSuspended } from "../../utils/access";
import { USER_CODE_POLICIES } from "../../../utils/app-defaults";

export default defineEventHandler(async (event) => {
	const id = await uuidParam(event);
	const auth = requireSelfOrAdmin(event, id);
	await getUserFor(id, auth.userId); // an admin cannot touch the super admin
	const body = await parseBody(event, S.UserUpdateBody);
	// customers cannot set a status (ignored, as before); an administrator can only set a real one
	if (isAdmin(auth) && body.status !== undefined) {
		const status = S.UserStatusValue.safeParse(body.status);
		if (!status.success) throw unprocessable("Status must be ACTIVE, HOLD or SUSPENDED");
		body.status = status.data;
	}
	if (isAdmin(auth) && body.transferCodesPolicy !== undefined) {
		const policy = String(body.transferCodesPolicy).trim().toLowerCase();
		if (!(USER_CODE_POLICIES as readonly string[]).includes(policy)) throw unprocessable("Transfer codes must be default, off, always or remember");
		body.transferCodesPolicy = policy;
	}
	const user = await updateUser(id, body, isAdmin(auth));
	if (body.status !== undefined) {
		forgetUser(id);
		// a suspension ends every session the account has right now
		if (isSuspended(user)) await revokeSessions(id, { by: auth.userId, reason: "Account suspended" });
	}
	if (isAdmin(auth) && auth.userId !== id) {
		const fields = Object.keys(body).filter((key) => (body as any)[key] !== undefined);
		await recordAdminAction(event, auth, { action: "user.update", targetType: "user", targetId: id, summary: `Updated ${user.email} (${fields.join(", ") || "no fields"})`, meta: { fields, ...pick(body as any, ["verified", "emailVerified", "status", "transferCodesPolicy"]) } });
	}
	return isAdmin(auth) ? user.toAdminJSON() : user;
});
