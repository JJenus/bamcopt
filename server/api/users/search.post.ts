import { createError } from "h3";
import { requireAuth } from "../../utils/auth";
import { parseBody } from "../../utils/validate";
import { RecipientSearchBody } from "../../utils/schemas";
import { searchRecipients } from "../../services/users";

// Single-process protection, consistent with the existing verification throttles.
const searches = new Map<string, { count: number; until: number }>();
export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	const { query } = await parseBody(event, RecipientSearchBody);
	const now = Date.now();
	for (const [id, window] of searches) if (window.until <= now) searches.delete(id);
	const window = searches.get(auth.userId) || { count: 0, until: now + 60_000 };
	if (window.count >= 30) throw createError({ statusCode: 429, message: "Too many recipient searches. Try again in a minute." });
	window.count++;
	searches.set(auth.userId, window);
	return searchRecipients(query, auth.userId);
});
