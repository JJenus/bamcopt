import { getHeader, getRequestURL } from "h3";
import { verifySession } from "../utils/auth";
import { unauthorized } from "../utils/errors";

/** Everything under /api needs a valid session token, except the few public routes. */
export default defineEventHandler((event) => {
	const path = getRequestURL(event).pathname;
	if (!path.startsWith("/api/") || event.method === "OPTIONS") return;
	if (path.startsWith("/api/auth/")) return;
	if (event.method === "GET" && path.startsWith("/api/transactions/find/")) return; // public receipt tracking

	const token = getHeader(event, "authorization")?.split(" ")[1];
	if (!token) throw unauthorized();
	event.context.auth = verifySession(token);
});
