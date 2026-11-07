import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import { getUserFor, publicProfile, withAccount } from "../../services/users";

export default defineEventHandler(async (event) => {
	const id = await uuidParam(event);
	const auth = requireAuth(event);
	const user = await getUserFor(id, auth.userId);
	// own profile / admin: everything; anyone else: public profile only (e.g. who sent me money)
	return auth.userId === id || isAdmin(auth) ? withAccount(user, isAdmin(auth)) : publicProfile(user);
});
