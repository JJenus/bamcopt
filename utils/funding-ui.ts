import type { FundingAccount } from './interfaces/Funding';

export type BalanceDirection = 'credit' | 'debit';
export type BalanceChange = { direction: BalanceDirection; amount: number };
export type CustomerFundingAccount = Pick<FundingAccount, 'id' | 'label' | 'type' | 'bankName' | 'accountName' | 'accountNumber' | 'currency' | 'instructions'>;

export const parseBalanceChange = (direction: string, value: string): BalanceChange | null => {
	if (!['credit', 'debit'].includes(direction) || !/^\d+(\.\d{1,2})?$/.test(value.trim())) return null;
	const minor = Math.round(Number(value) * 100);
	return minor > 0 && Number.isSafeInteger(minor) ? { direction: direction as BalanceDirection, amount: minor / 100 } : null;
};
export const balanceChangeLabel = (direction: BalanceDirection) => direction === 'credit' ? 'Credit (add funds)' : 'Debit (remove funds)';
/** Shared customer API projection and administrator preview: never expose tracked balances. */
export const customerFundingAccount = (account: CustomerFundingAccount): CustomerFundingAccount => ({
	id: account.id, label: account.label, type: account.type, bankName: account.bankName, accountName: account.accountName,
	accountNumber: account.accountNumber, currency: account.currency, instructions: account.instructions,
});
