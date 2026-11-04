import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { updateFundingAccount } from "../../services/funding";

export default defineEventHandler(async (event) => {
	requireAdmin(event);
	return updateFundingAccount(await uuidParam(event), await parseBody(event, S.FundingAccountUpdateBody));
});
