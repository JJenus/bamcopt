import type { Transaction } from "~/utils/interfaces/Transaction";

export const transactionService = {
	reverse: (id: string, reason: string) => apiRequest<Transaction>(`/transactions/${id}/reverse`, { method: 'POST', body: { action: 'reverse', reason } }),
	listForUser: async (userId: string) => {
		const list = await apiRequest<Transaction[]>(`/transactions/${userId}`);
		return list.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
	},
	/** Checks ONE of the transfer codes on the server. Moves no money. */
	verifyCode: (step: "cot" | "imf" | "tax", code: string) =>
		apiRequest<{ ok: boolean }>("/transactions/verify-code", { method: "POST", body: { step, code } }),
	/** The server takes the sender from the session and re-checks all three codes (`codes`). */
	send: (tx: Record<string, unknown>) => apiRequest<Transaction>("/transactions", { method: "POST", body: tx }),
	/** Admin: change status / notes. */
	update: (tx: Pick<Transaction, "id" | "status" | "notes">) => apiRequest<Transaction>("/transactions", { method: "PUT", body: tx }),
	/** One transaction (sender, receiver or admin) with names + beneficiary. */
	get: (id: string) => apiRequest<Transaction & { senderName: string | null; receiverName: string | null }>(`/transactions/detail/${id}`),
	/** Totals shown on the transactions page. */
	aggregates: () => apiRequest<{ received: number; sent: number; net: number }>("/transactions/aggregates"),
	/** Public receipt lookup. */
	findReceipt: (transactionId: string) => apiRequest<Transaction>(`/transactions/find/${transactionId}`, { auth: false }),
};
