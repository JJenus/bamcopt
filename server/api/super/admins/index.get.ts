import { requireSuperAdmin } from "../../../utils/superadmin";
import { adminOverview } from "../../../services/sessions";

export default defineEventHandler(async (event) => {
	await requireSuperAdmin(event);
	return adminOverview();
});
