import { User } from "../models";
import type { AuthContext } from "./auth";
import { unauthorized } from "./errors";

/** ACTIVE: normal. HOLD: signs in, cannot send money. SUSPENDED: cannot sign in and every session is dead. */
export const USER_STATUSES = ["ACTIVE", "HOLD", "SUSPENDED"] as const;
export const SUSPENDED_MESSAGE = "Your account is suspended. Contact support.";

export const isSuspended = (user: { status?: string | null }) => String(user.status ?? "").trim().toUpperCase() === "SUSPENDED";

// Same idea as the session check: trusted for a few seconds so a page that fires several calls reads the user once.
// A status change forgets it at once (single instance), so the delay never applies to a suspension made here.
const allowedUntil = new Map<string, number>();
const CONFIRM_MS = 5000;
export const forgetUser = (userId: string) => { for (const key of [...allowedUntil.keys()]) if (key.startsWith(`${userId}:`)) allowedUntil.delete(key); };

/**
 * Runs for every authenticated request, whatever token is presented (also tokens issued before sessions were stored).
 * Ends the request with 401 when the account was suspended, was deleted, or has a different role than the token claims
 * (a demoted administrator must not keep admin powers until the token expires). A database error fails open.
 */
export const assertUserAllowed = async (auth: AuthContext) => {
	const now = Date.now();
	const key = `${auth.userId}:${auth.userType}`; // the claimed role is part of what was confirmed
	if ((allowedUntil.get(key) ?? 0) > now) return;
	let user: User | null;
	try {
		user = await User.findByPk(auth.userId, { attributes: ["id", "status", "userType"] });
	} catch (error) {
		console.error("[access] could not check the account:", (error as Error).message);
		return;
	}
	if (!user) throw unauthorized("Session ended");
	if (isSuspended(user)) { forgetUser(auth.userId); throw unauthorized(SUSPENDED_MESSAGE); }
	if (user.userType !== auth.userType) { forgetUser(auth.userId); throw unauthorized("Session ended"); }
	if (allowedUntil.size > 5000) allowedUntil.clear();
	allowedUntil.set(key, now + CONFIRM_MS);
};
