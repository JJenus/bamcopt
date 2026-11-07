import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { getUserFor, updateUser } from "../../services/users";

export default defineEventHandler(async (event) => {
	const id = await uuidParam(event);
	const auth = requireSelfOrAdmin(event, id);
	await getUserFor(id, auth.userId); // an admin cannot touch the super admin
	const user = await updateUser(id, await parseBody(event, S.UserUpdateBody), isAdmin(auth));
	return isAdmin(auth) ? user.toAdminJSON() : user;
});
