import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../../utils/auth";
import { lookupProfile } from "../../../services/users";
import { User, Account } from "../../../models";
import { badRequest, notFound } from "../../../utils/errors";

export default defineEventHandler(async (event) => {
	requireAuth(event);
	const accountNumber = Number(getRouterParam(event, "id"));
	if (!Number.isSafeInteger(accountNumber)) throw badRequest("Invalid account number");
	const account = await Account.findOne({ where: { accountNumber } });
	const user = account && (await User.findByPk(account.userId));
	if (!user) throw notFound("User not found");
	return lookupProfile(user);
});
