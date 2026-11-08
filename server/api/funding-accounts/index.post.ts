import { parseBody } from "../../utils/validate";
import { requireAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { createFundingAccount } from "../../services/funding";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const body = await parseBody(event, S.FundingAccountBody);
	const created: any = await createFundingAccount(body);
	await recordAdminAction(event, auth, { action: "funding.create", targetType: "funding-account", targetId: created?.id, summary: `Added funding account "${body.label}" (${body.type})`, meta: pick(body, ["label", "type", "currency", "active"]) });
	return created;
});
