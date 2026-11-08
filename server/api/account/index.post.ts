import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { topUp } from "../../services/ledger";
import { pick, recordAdminAction } from "../../services/audit";
const money = (n: unknown) => Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });

export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const { email, amount, fundingAccountId } = await parseBody(event, S.TopUpBody);
	const result = await topUp(email, amount, fundingAccountId);
	await recordAdminAction(event, auth, { action: "account.topup", targetType: "account", summary: `Topped up ${money(amount)} to ${email}`, meta: { email, amount, fundingAccountId } });
	return result;
});
