export type ReferralProgram = { enabled: boolean; rewardPoints: number; pointsPerUnit: number; currency: string; version: number; minWithdrawalPoints: number; minWithdrawalAmount: number };
export type ReferralRules = Omit<ReferralProgram, 'version'>;
type Person = { id: string; name: string; email?: string };
export type ReferralItem = { id: string; name?: string; referred?: Person; referrer?: Person; status: 'pending' | 'awarded' | 'ineligible'; points: number; reason?: string; createdAt: string; qualifiedAt?: string };
export type ReferralReceipt = { id: string; userId: string; points: number; amount: number; currency: string; transactionId: string; createdAt: string; customer?: Person };
export type ReferralDashboard = { code?: string; points?: number; program: ReferralProgram; referrals: { items: ReferralItem[]; total: number }; redemptions: { items: ReferralReceipt[]; total: number } };
export type ReferralWithdrawal = { points: number; requestKey: string; programVersion: number };

export const referralService = {
	get: (offset = 0) => apiRequest<ReferralDashboard>('/referrals', { query: { limit: 20, offset } }),
	admin: (offset = 0) => apiRequest<ReferralDashboard>('/admin/referrals', { query: { limit: 20, offset } }),
	saveProgram: (body: ReferralRules) => apiRequest<ReferralProgram>('/admin/referrals/program', { method: 'PUT', body }),
	reject: (id: string, reason: string) => apiRequest(`/admin/referrals/${id}/reject`, { method: 'POST', body: { reason } }),
	redeem: (body: ReferralWithdrawal) => apiRequest<ReferralReceipt>('/referrals/redeem', { method: 'POST', body }),
};
