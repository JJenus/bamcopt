import { uuidParam } from "../../../../utils/validate";
import { requireSuperAdmin } from "../../../../utils/superadmin";
import { deviceSessions, getAdminForSuper } from "../../../../services/sessions";

export default defineEventHandler(async (event) => {
	await requireSuperAdmin(event);
	const admin = await getAdminForSuper(await uuidParam(event));
	return { admin: { id: admin.id, name: admin.name, email: admin.email, status: admin.status, createdAt: admin.createdAt }, ...(await deviceSessions(admin.id)) };
});
