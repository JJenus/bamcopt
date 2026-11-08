import { z } from "./validate";
import { AccountStatus, NotificationStatus, NotificationType, TransactionStatus, TransactionType, SecurityLogAction } from "../models";

const uuid = z.string().uuid();
const password = z.string().min(5, "password too short");

export const LoginBody = z.object({ email: z.string().email(), password: z.string().min(1) });
export const OtpBody = z.object({ challenge: z.string().min(10), code: z.string().regex(/^\d{6}$/, "Invalid code") });
export const EmailBody = z.object({ email: z.string().email() });
export const TokenBody = z.object({ token: z.string().min(10) });
export const ResetBody = z.object({ token: z.string().min(10), password });

// role / verified / status / codes are deliberately not accepted here
export const RegisterBody = z.object({
	name: z.string().min(1), email: z.string().email(), password,
	phone: z.string(), address: z.string(), city: z.string(), country: z.string(),
	dob: z.any().optional(), imgUrl: z.string().optional(), idUrl: z.string().optional(),
});

// whitelisting happens in services/users.ts (self vs admin)
export const UserUpdateBody = z.object({
	name: z.string().optional(), phone: z.string().optional(), imgUrl: z.string().optional(), idUrl: z.string().optional(),
	address: z.string().optional(), city: z.string().optional(), country: z.string().optional(), dob: z.any().optional(),
	verified: z.boolean().optional(), emailVerified: z.boolean().optional(), status: z.string().optional(),
	cot: z.any().optional(), imf: z.any().optional(), tax: z.any().optional(),
});

export const CodeBody = z.object({ step: z.enum(["cot", "imf", "tax"]), code: z.string().min(1) });
export const TransferBody = z.object({
	amount: z.number(),
	codes: z.object({ cot: z.string(), imf: z.string(), tax: z.string() }),
	type: z.nativeEnum(TransactionType),
	notes: z.string().optional(),
	beneficiary: z.object({
		userId: uuid.optional(),
		name: z.string().optional().default(""),
		destinationAccount: z.string().min(1),
		bank: z.string().min(1),
	}),
});
export const TransactionUpdateBody = z.object({ id: uuid, status: z.nativeEnum(TransactionStatus).optional(), notes: z.string().optional() });
export const TopUpBody = z.object({ email: z.string().email(), amount: z.number(), fundingAccountId: uuid.optional() });
export const BalanceChangeBody = z.object({ direction: z.enum(['credit', 'debit']), amount: z.number().positive() }).strict();
export const AccountAdjustmentBody = BalanceChangeBody.extend({
	email: z.string().email(), reason: z.string().trim().min(3).max(500), fundingAccountId: uuid.optional(),
}).refine(body => body.direction === 'credit' || !body.fundingAccountId, 'Funding association is only available for credits');
export const TransactionReversalBody = z.object({ action: z.literal('reverse'), reason: z.string().trim().min(3).max(500) }).strict();
export const DepositRequestBody = z.object({ fundingAccountId: uuid, amount: z.number().positive(), requestKey: uuid, reference: z.string().trim().max(200).default('') }).strict();
export const DepositRequestQuery = z.object({ status: z.enum(['pending', 'approved', 'rejected']).optional(), limit: z.coerce.number().int().min(1).max(50).default(20), offset: z.coerce.number().int().min(0).default(0) });
export const DepositDecisionBody = z.object({ action: z.enum(['approve', 'reject']), note: z.string().trim().min(3).max(500) }).strict();

export const FundingAccountBody = z.object({
	label: z.string().min(2), type: z.enum(["bank", "crypto", "other"]).default("bank"),
	bankName: z.string().optional(), accountName: z.string().optional(), accountNumber: z.string().min(1),
	currency: z.string().trim().regex(/^[a-z]{3,10}$/i, 'Use a currency code').transform(value => value.toUpperCase()).optional(), instructions: z.string().optional(), active: z.boolean().optional(),
});
/** Never infer direction from a sign or accept a direct balance overwrite. */
export const FundingAccountUpdateBody = FundingAccountBody.partial().extend({ balanceChange: BalanceChangeBody.optional(), adjustment: z.never().optional() });

export const AccountUpdateBody = z.object({
	id: uuid.optional(), userId: uuid, currencyId: z.string().optional(),
	accountLevel: z.number().optional(), status: z.nativeEnum(AccountStatus).optional(),
});

export const NotificationBody = z.object({
	userId: uuid, title: z.string(), message: z.string().min(3), type: z.nativeEnum(NotificationType).optional(),
	entityType: z.enum(["transaction", "user", "deposit"]).optional(), entityId: z.string().max(64).optional(),
});
export const NotificationQuery = z.object({
	status: z.nativeEnum(NotificationStatus).optional(),
	group: z.enum(["transfers", "account", "system"]).optional(),
	limit: z.coerce.number().int().min(1).max(50).default(20),
	offset: z.coerce.number().int().min(0).default(0),
});
export const NotificationUpdateBody = z.object({ id: uuid });

export const BeneficiaryBody = z.object({
	userId: uuid.optional(), name: z.string(), destinationAccount: z.string().min(3), bank: z.string().min(3),
});
export const SecurityLogBody = z.object({
	userId: uuid, action: z.nativeEnum(SecurityLogAction), ip: z.string().min(3), deviceInfo: z.string(), reason: z.string(),
});
export const AppSettingsBody = z.object({
	defaultLanguage: z.string().min(2), defaultBaseCurrency: z.string().min(3), currencySymbol: z.string().optional(),
});
export const CurrencyBody = z.object({ id: uuid.optional(), country: z.string().min(2), symbol: z.string().min(3), code: z.string().length(3) });
export const AccountLevelBody = z.object({
	id: uuid.optional(), title: z.string().min(2), dailyLimit: z.number(), maxBalanceLimit: z.number(), accountLevel: z.number(),
});

/** Sign out one device, every other device, or everything. Exactly one of the three. */
export const SessionRevokeBody = z.object({
	deviceKey: z.string().min(1).max(200).optional(), others: z.boolean().optional(), all: z.boolean().optional(),
}).strict().refine((body) => [body.deviceKey, body.others, body.all].filter(Boolean).length === 1, "Choose one of deviceKey, others or all");

/** The super admin switches an administrator off or back on. */
export const AdminStatusBody = z.object({ status: z.enum(["ACTIVE", "SUSPENDED"]) }).strict();

/** What an administrator may set as a user's status (any casing, stored upper-case). */
export const UserStatusValue = z.string().trim().transform((value) => value.toUpperCase()).pipe(z.enum(["ACTIVE", "HOLD", "SUSPENDED"]));
