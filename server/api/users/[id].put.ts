import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { getUserFor, updateUser } from "../../services/users";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const id = await uuidParam(event);
	const auth = requireSelfOrAdmin(event, id);
	await getUserFor(id, auth.userId); // an admin cannot touch the super admin
	const body = await parseBody(event, S.UserUpdateBody);
	const user = await updateUser(id, body, isAdmin(auth));
	if (isAdmin(auth) && auth.userId !== id) {
		const fields = Object.keys(body).filter((key) => (body as any)[key] !== undefined);
		await recordAdminAction(event, auth, { action: "user.update", targetType: "user", targetId: id, summary: `Updated ${user.email} (${fields.join(", ") || "no fields"})`, meta: { fields, ...pick(body as any, ["verified", "emailVerified", "status"]) } });
	}
	return isAdmin(auth) ? user.toAdminJSON() : user;
});
