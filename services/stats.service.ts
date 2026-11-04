import type { AdminStats, UserStats } from "~/utils/interfaces/Funding";

export const statsService = {
	mine: () => apiRequest<UserStats>("/transactions/aggregates"),
	admin: () => apiRequest<AdminStats>("/admin/stats"),
};
