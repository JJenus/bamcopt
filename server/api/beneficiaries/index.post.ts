import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { createBeneficiary } from "../../services/catalog";

export default defineEventHandler(async (event) => {
	requireAuth(event);
	return createBeneficiary(await parseBody(event, S.BeneficiaryBody));
});
