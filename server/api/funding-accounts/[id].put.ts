import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { updateFundingAccount } from "../../services/funding";
import { pick, recordAdminAction } from "../../services/audit";

export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const id = await uuidParam(event);
	const body = await parseBody(event, S.FundingAccountUpdateBody);
	const updated = await updateFundingAccount(id, body);
	const change = body.balanceChange ? ` and ${body.balanceChange.direction === "credit" ? "added" : "removed"} ${body.balanceChange.amount} ${body.balanceChange.direction === "credit" ? "to" : "from"} its balance` : "";
	const fields = Object.keys(body).filter((key) => key !== "balanceChange");
	await recordAdminAction(event, auth, { action: "funding.update", targetType: "funding-account", targetId: id, summary: `Updated funding account ${id}${fields.length ? ` (${fields.join(", ")})` : ""}${change}`, meta: { fields, ...pick(body as any, ["active", "balanceChange"]) } });
	return updated;
});
