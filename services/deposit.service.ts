import type { DepositRequest, DepositRequestPage, DepositStatus } from '~/utils/interfaces/DepositRequest';
export const depositService = {
	list: (query: { status?: DepositStatus; limit?: number; offset?: number } = {}) => apiRequest<DepositRequestPage>('/deposit-requests', { query }),
	get: (id: string) => apiRequest<DepositRequest>(`/deposit-requests/${id}`),
	submit: (body: { amount: number; fundingAccountId: string; requestKey: string; reference: string }) => apiRequest<DepositRequest>('/deposit-requests', { method: 'POST', body }),
	decide: (id: string, action: 'approve' | 'reject', note: string) => apiRequest<DepositRequest>(`/deposit-requests/${id}/decision`, { method: 'POST', body: { action, note } }),
};
