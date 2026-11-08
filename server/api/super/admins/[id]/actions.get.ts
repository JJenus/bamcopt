import { getQuery } from "h3";
import { uuidParam } from "../../../../utils/validate";
import { requireSuperAdmin } from "../../../../utils/superadmin";
import { getAdminForSuper } from "../../../../services/sessions";
import { listAdminActions } from "../../../../services/audit";

/** What one administrator did, newest first. ?area=account|user|deposit|transaction|funding|notification|settings */
export default defineEventHandler(async (event) => {
	await requireSuperAdmin(event);
	const admin = await getAdminForSuper(await uuidParam(event));
	const q = getQuery(event);
	return listAdminActions(admin.id, { limit: Number(q.limit), before: typeof q.before === "string" ? q.before : undefined, area: typeof q.area === "string" ? q.area : undefined });
});
