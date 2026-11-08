import { getHeader } from "h3";
import { verifySession } from "../../utils/auth";
import { endSession } from "../../services/user-sessions";

/** Ends the caller's own session on the server. Always answers ok: an unknown or expired token has nothing left to end. */
export default defineEventHandler(async (event) => {
	const token = getHeader(event, "authorization")?.split(" ")[1];
	if (token) {
		try {
			const auth = verifySession(token);
			if (auth.sid) await endSession(auth.sid, auth.userId);
		} catch {}
	}
	return { ok: true };
});
