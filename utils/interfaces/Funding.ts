export interface FundingAccount {
	id: string;
	label: string;
	type: "bank" | "crypto" | "other";
	bankName?: string | null;
	accountName?: string | null;
	accountNumber: string;
	currency?: string | null;
	instructions?: string | null;
	/** Admin only. */
	balance?: number;
	active?: boolean;
}

export interface AdminStats {
	users: { total: number; active: number };
	balances: { users: number; funding: number; fundingAccounts: number };
	transactions: { total: number; pending: number; failed: number; volume: number; weekVolume: number };
	recentTransactions: (import("./Transaction").Transaction & { senderName: string })[];
	recentUsers: { id: string; name: string; email: string; createdAt: string }[];
}

export interface UserStats {
	received: number; sent: number; net: number;
	monthReceived: number; monthSent: number;
	count: number; pending: number;
}
