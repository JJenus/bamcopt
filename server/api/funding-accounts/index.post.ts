import { parseBody } from "../../utils/validate";
import { requireAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { createFundingAccount } from "../../services/funding";

export default defineEventHandler(async (event) => {
	requireAdmin(event);
	return createFundingAccount(await parseBody(event, S.FundingAccountBody));
});
