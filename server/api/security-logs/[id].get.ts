import { uuidParam } from "../../utils/validate";
import { requireAuth } from "../../utils/auth";
import { listSecurityLogs } from "../../services/catalog";
import { assertCanViewSessions } from "../../services/sessions";
import { getUser } from "../../services/users";

export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	const target = await getUser(await uuidParam(event));
	await assertCanViewSessions(auth, target);
	return listSecurityLogs(target.id);
});
