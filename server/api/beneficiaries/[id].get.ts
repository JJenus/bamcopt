import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import { listBeneficiaries } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	const id = await uuidParam(event);
	requireSelfOrAdmin(event, id);
	return listBeneficiaries(id);
});
