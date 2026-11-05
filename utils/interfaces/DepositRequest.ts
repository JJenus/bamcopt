import type { CustomerFundingAccount } from '../funding-ui';

export type DepositStatus = 'pending' | 'approved' | 'rejected';
export interface DepositRequest {
	id: string; userId: string; fundingAccountId: string; amount: number; currency: string;
	fundingSnapshot: CustomerFundingAccount; reference: string; status: DepositStatus;
	decisionNote: string | null; reviewedAt: string | null; transactionId: string | null; createdAt: string;
	customerName?: string; customerEmail?: string;
}
export type DepositRequestPage = { items: DepositRequest[]; total: number };
