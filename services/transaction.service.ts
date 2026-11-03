import type { Transaction } from "~/utils/interfaces/Transaction";

export const transactionService = {
	listForUser: async (userId: string) => {
		const list = await apiRequest<Transaction[]>(`/transactions/${userId}`);
		return list.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
	},
	/** The server takes the sender from the session, not from this payload. */
	send: (tx: Record<string, unknown>) => apiRequest<Transaction>("/transactions", { method: "POST", body: tx }),
	/** Admin: change status / notes. */
	update: (tx: Pick<Transaction, "id" | "status" | "notes">) => apiRequest<Transaction>("/transactions", { method: "PUT", body: tx }),
	/** Public receipt lookup. */
	findReceipt: (transactionId: string) => apiRequest<Transaction>(`/transactions/find/${transactionId}`, { auth: false }),
};
