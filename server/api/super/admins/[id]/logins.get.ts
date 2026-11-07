import { getQuery } from "h3";
import { uuidParam } from "../../../../utils/validate";
import { requireSuperAdmin } from "../../../../utils/superadmin";
import { getAdminForSuper, loginEvents } from "../../../../services/sessions";

export default defineEventHandler(async (event) => {
	await requireSuperAdmin(event);
	const admin = await getAdminForSuper(await uuidParam(event));
	const q = getQuery(event);
	const action = q.action === "login" || q.action === "attempt_failed" ? q.action : undefined;
	return loginEvents(admin.id, { limit: Number(q.limit), before: typeof q.before === "string" ? q.before : undefined, action });
});
