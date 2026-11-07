import { Op } from "sequelize";
import { Account, FundingAccount, Transaction, TransactionStatus, User } from "../models";

const DAY = 24 * 60 * 60 * 1000;
const PENDING = [TransactionStatus.PENDING, TransactionStatus.AWAITING, TransactionStatus.PROCESSING];
const num = (n: unknown) => Number(n ?? 0);

/** Dashboard numbers for admins. All sums are DB-level; amounts are in major units. */
export const getAdminStats = async () => {
	const people = await User.findAll({ where: { userType: { [Op.notIn]: ["admin", "superadmin"] } }, attributes: ["id", "status", "name", "email", "createdAt"], order: [["createdAt", "DESC"]] });
	const ids = people.map((u) => u.id);
	const names = new Map(people.map((u) => [u.id, u.name]));

	const [userBalances, funding, fundingCount, txCount, pending, failed, volume, weekVolume, recent] = await Promise.all([
		ids.length ? Account.sum("amount", { where: { userId: ids } }) : 0,
		FundingAccount.sum("balance", { where: { active: true } }),
		FundingAccount.count({ where: { active: true } }),
		Transaction.count(),
		Transaction.count({ where: { status: { [Op.in]: PENDING } } }),
		Transaction.count({ where: { status: TransactionStatus.FAILED } }),
		Transaction.sum("amount", { where: { status: TransactionStatus.COMPLETED } }),
		Transaction.sum("amount", { where: { status: TransactionStatus.COMPLETED, createdAt: { [Op.gte]: new Date(Date.now() - 7 * DAY) } } }),
		Transaction.findAll({ order: [["createdAt", "DESC"]], limit: 8 }),
	]);

	return {
		users: { total: people.length, active: people.filter((u) => u.status.toUpperCase() === "ACTIVE").length },
		balances: { users: num(userBalances), funding: num(funding), fundingAccounts: fundingCount },
		transactions: { total: txCount, pending, failed, volume: num(volume), weekVolume: num(weekVolume) },
		recentTransactions: recent.map((t) => ({ ...t.toJSON(), senderName: names.get(t.senderId) ?? "—" })),
		recentUsers: people.slice(0, 5).map((u) => ({ id: u.id, name: u.name, email: u.email, createdAt: u.createdAt })),
	};
};
