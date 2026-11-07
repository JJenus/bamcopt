import type { H3Event } from "h3";
import { User } from "../models";
import { requireAuth, type AuthContext } from "./auth";
import { forbidden } from "./errors";

/**
 * The super admin gate. The token only proves who signed in; the role and status are read from the database
 * on every call, so a demoted or suspended account loses access at once instead of when its token expires.
 */
export const verifySuperAdmin = async (auth: AuthContext): Promise<AuthContext> => {
	if (auth.userType !== "superadmin") throw forbidden();
	const user = await User.findByPk(auth.userId);
	if (!user || user.userType !== "superadmin" || String(user.status).toUpperCase() !== "ACTIVE") throw forbidden();
	return auth;
};

export const requireSuperAdmin = async (event: H3Event): Promise<AuthContext> => verifySuperAdmin(requireAuth(event));
