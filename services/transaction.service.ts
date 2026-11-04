import type { Transaction } from "~/utils/interfaces/Transaction";

export const transactionService = {
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
	/** Public receipt lookup. */
	findReceipt: (transactionId: string) => apiRequest<Transaction>(`/transactions/find/${transactionId}`, { auth: false }),
};
