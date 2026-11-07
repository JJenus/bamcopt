import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

export enum AccountStatus { ACTIVE = "active", CLOSED = "closed", FROZEN = "frozen" }
export enum TransactionType { DEBIT = "debit", CREDIT = "credit", WITHDRAWAL = "withdrawal", SEND = "send" }
export enum TransactionStatus {
	COMPLETED = "completed", FAILED = "failed", PENDING = "pending", AWAITING = "awaiting", PROCESSING = "processing",
}
export enum NotificationStatus { READ = "read", UNREAD = "unread" }
export enum NotificationType {
	DEBIT = "debit", CREDIT = "credit", ACCOUNT_UPDATE = "account update", FAILED = "failed", INFO = "info",
}
export enum SecurityLogAction { LOGIN = "login", LOGOUT = "logout", ATTEMPT_FAILED = "attempt_failed" }

const id = { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true };
/** DECIMAL comes back from MySQL as a string: always expose a number. */
const money = (field: string) => ({
	type: DataTypes.DECIMAL(20, 2),
	allowNull: false,
	defaultValue: 0,
	get(this: Model) {
		return Number(this.getDataValue(field as never) ?? 0);
	},
});

export class User extends Model {
	declare id: string; declare name: string; declare email: string; declare password: string;
	declare phone: string; declare imgUrl: string; declare idUrl: string; declare address: string;
	declare city: string; declare country: string; declare dob: Date; declare verified: boolean;
	declare emailVerified: boolean; declare status: string; declare userType: string;
	declare cot: string; declare imf: string; declare tax: string;
	declare createdAt: Date; declare updatedAt: Date;
	/** Everything except the password hash. Only admin endpoints may use this. */
	toAdminJSON() {
		const { password, ...rest } = this.get({ plain: true }) as any;
		return rest;
	}
	/** Default JSON: no password hash and no transfer codes (cot / imf / tax). */
	override toJSON() {
		const { cot, imf, tax, ...rest } = this.toAdminJSON();
		return rest;
	}
}
User.init(
	{
		id,
		name: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false },
		password: { type: DataTypes.STRING, allowNull: false },
		phone: DataTypes.STRING, imgUrl: DataTypes.STRING, idUrl: DataTypes.STRING,
		address: DataTypes.STRING, city: DataTypes.STRING, country: DataTypes.STRING, dob: DataTypes.DATE,
		verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		status: { type: DataTypes.STRING, allowNull: false, defaultValue: "ACTIVE" },
		emailVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		userType: { type: DataTypes.STRING, defaultValue: "user" },
		cot: DataTypes.STRING, imf: DataTypes.STRING, tax: DataTypes.STRING,
	},
	{ sequelize, paranoid: true, modelName: "User" }
);

export class Account extends Model {
	declare id: string; declare userId: string; declare currencyId: string; declare amount: number;
	declare accountNumber: number; declare accountLevel: number; declare status: AccountStatus;
}
Account.init(
	{
		id,
		userId: DataTypes.UUID,
		currencyId: DataTypes.STRING,
		amount: money("amount"),
		accountNumber: {
			type: DataTypes.BIGINT,
			// BIGINT is a string in JS, account numbers are < 2^53 so a number is safe
			get(this: Model) { return Number(this.getDataValue("accountNumber" as never)); },
		},
		accountLevel: { type: DataTypes.INTEGER, defaultValue: 1 },
		status: { type: DataTypes.ENUM(...Object.values(AccountStatus)), defaultValue: AccountStatus.ACTIVE },
	},
	{ sequelize, paranoid: true, modelName: "Account" }
);

export class Transaction extends Model {
	declare id: string; declare senderId: string; declare receiverId: string | null;
	declare beneficiaryId: string | null; declare transactionId: string; declare amount: number;
	declare status: TransactionStatus; declare type: TransactionType; declare notes: string | null;
}
Transaction.init(
	{
		id,
		senderId: DataTypes.STRING,
		receiverId: DataTypes.STRING,
		transactionId: { type: DataTypes.STRING, defaultValue: "hidden" },
		beneficiaryId: DataTypes.STRING,
		amount: money("amount"),
		status: DataTypes.ENUM(...Object.values(TransactionStatus)),
		type: DataTypes.ENUM(...Object.values(TransactionType)),
		notes: DataTypes.STRING,
	},
	{ sequelize, modelName: "Transaction" }
);

export class Beneficiary extends Model {
	declare id: string; declare userId: string | null; declare name: string;
	declare destinationAccount: string; declare bank: string;
}
Beneficiary.init(
	{
		id,
		userId: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
		name: DataTypes.STRING, destinationAccount: DataTypes.STRING, bank: DataTypes.STRING,
	},
	{ sequelize, modelName: "Beneficiary" }
);

export class Notification extends Model {
	declare id: string; declare userId: string; declare title: string; declare message: string;
	declare status: NotificationStatus; declare type: NotificationType;
	declare entityType: string | null; declare entityId: string | null;
}
Notification.init(
	{
		id,
		userId: DataTypes.STRING, title: DataTypes.STRING, message: DataTypes.STRING,
		status: { type: DataTypes.ENUM(...Object.values(NotificationStatus)), defaultValue: NotificationStatus.UNREAD },
		type: { type: DataTypes.ENUM(...Object.values(NotificationType)), defaultValue: NotificationType.INFO },
		// what the notification is about (for the "view" link): 'transaction' | 'user'
		entityType: { type: DataTypes.STRING, allowNull: true },
		entityId: { type: DataTypes.STRING, allowNull: true },
	},
	{ sequelize, modelName: "Notification" }
);

export class SecurityLog extends Model {}
SecurityLog.init(
	{
		id,
		userId: DataTypes.STRING,
		action: DataTypes.ENUM(...Object.values(SecurityLogAction)),
		ip: DataTypes.STRING, deviceInfo: DataTypes.STRING, reason: DataTypes.STRING,
		// "City, Country" resolved from the IP in the background; empty when unknown
		location: { type: DataTypes.STRING, allowNull: true },
	},
	{ sequelize, modelName: "SecurityLog", indexes: [{ name: "security_logs_user_action_created_idx", fields: ["user_id", "action", "created_at"] }] }
);

export class AppSetting extends Model {
	declare id: string; declare defaultLanguage: string; declare defaultBaseCurrency: string; declare currencySymbol: string;
}
AppSetting.init(
	{ id, defaultLanguage: DataTypes.STRING, defaultBaseCurrency: DataTypes.STRING, currencySymbol: DataTypes.STRING },
	{ sequelize, modelName: "AppSetting" }
);

export class Currency extends Model {}
Currency.init(
	{ id, country: DataTypes.STRING, code: DataTypes.STRING, symbol: DataTypes.STRING },
	{ sequelize, modelName: "Currency" }
);

const level = (field: string) => ({
	type: DataTypes.BIGINT, // BIGINT is a string in JS: expose a number
	get(this: Model) { return Number(this.getDataValue(field as never) ?? 0); },
});
export class AccountLevel extends Model {}
AccountLevel.init(
	{
		id, title: DataTypes.STRING,
		dailyLimit: level("dailyLimit"), maxBalanceLimit: level("maxBalanceLimit"),
		accountLevel: DataTypes.INTEGER,
	},
	{ sequelize, paranoid: true, modelName: "AccountLevel" }
);

export class FundingAccount extends Model {
	declare id: string; declare label: string; declare type: string; declare bankName: string | null;
	declare accountName: string | null; declare accountNumber: string; declare currency: string | null;
	declare instructions: string | null; declare balance: number; declare active: boolean;
}
FundingAccount.init(
	{
		id,
		label: { type: DataTypes.STRING, allowNull: false },
		type: { type: DataTypes.STRING, allowNull: false, defaultValue: "bank" },
		bankName: DataTypes.STRING, accountName: DataTypes.STRING,
		accountNumber: { type: DataTypes.STRING, allowNull: false },
		currency: DataTypes.STRING, instructions: DataTypes.TEXT,
		balance: money("balance"),
		active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
	},
	{ sequelize, modelName: "FundingAccount" }
);

export class DepositRequest extends Model {
	declare id: string; declare userId: string; declare fundingAccountId: string; declare requestKey: string;
	declare amount: number; declare currency: string; declare fundingSnapshot: Record<string, unknown>;
	declare reference: string; declare status: 'pending' | 'approved' | 'rejected';
	declare decisionNote: string | null; declare reviewedBy: string | null; declare reviewedAt: Date | null;
	declare transactionId: string | null;
}
DepositRequest.init({
	id,
	userId: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'id' } },
	fundingAccountId: { type: DataTypes.UUID, allowNull: false, references: { model: 'funding_accounts', key: 'id' } },
	requestKey: { type: DataTypes.UUID, allowNull: false },
	amount: money('amount'), currency: { type: DataTypes.STRING(10), allowNull: false },
	fundingSnapshot: { type: DataTypes.JSON, allowNull: false },
	reference: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
	status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'pending', validate: { isIn: [['pending', 'approved', 'rejected']] } },
	decisionNote: DataTypes.TEXT, reviewedBy: { type: DataTypes.UUID, references: { model: 'users', key: 'id' } }, reviewedAt: DataTypes.DATE,
	transactionId: { type: DataTypes.UUID, unique: true, references: { model: 'transactions', key: 'id' } },
}, { sequelize, modelName: 'DepositRequest', indexes: [
	{ unique: true, fields: ['user_id', 'request_key'] },
	{ fields: ['user_id', 'created_at'] }, { fields: ['status', 'created_at'] },
] });

export { sequelize };
