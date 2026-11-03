import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import { getUser, publicProfile, withAccount } from "../../services/users";

export default defineEventHandler(async (event) => {
	const id = await uuidParam(event);
	const auth = requireAuth(event);
	const user = await getUser(id);
	// own profile / admin: everything; anyone else: public profile only (e.g. who sent me money)
	return auth.userId === id || isAdmin(auth) ? withAccount(user) : publicProfile(user);
});
