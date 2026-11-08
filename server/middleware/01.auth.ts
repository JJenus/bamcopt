import { getHeader, getRequestURL } from "h3";
import { verifySession } from "../utils/auth";
import { dbReady } from "../utils/db";
import "../models";
import { unauthorized } from "../utils/errors";
import { assertSessionActive } from "../services/user-sessions";
import { assertUserAllowed } from "../utils/access";

/** Everything under /api needs a valid session token, except the few public routes. */
export default defineEventHandler(async (event) => {
	const path = getRequestURL(event).pathname;
	if (!path.startsWith("/api/") || event.method === "OPTIONS") return;
	await dbReady();
	if (path.startsWith("/api/auth/")) return;
	if (event.method === "GET" && path.startsWith("/api/transactions/find/")) return; // public receipt tracking

	const token = getHeader(event, "authorization")?.split(" ")[1];
	if (!token) throw unauthorized();
	const auth = verifySession(token);
	// a revoked or expired session ends on the next request, whatever the token's own expiry says
	if (auth.sid) await assertSessionActive(auth.sid);
	// suspended accounts and changed roles stop at once, for every token including older ones
	await assertUserAllowed(auth);
	event.context.auth = auth;
});
