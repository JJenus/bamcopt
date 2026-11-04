import type { AdminStats, UserStats } from "~/utils/interfaces/Funding";

const emptyUser = (): UserStats => ({ received: 0, sent: 0, net: 0, monthReceived: 0, monthSent: 0, count: 0, pending: 0 });

export const useUserStats = () => {
	const stats = useState<UserStats>("user-stats", emptyUser);
	const load = async () => {
		try {
			stats.value = await statsService.mine();
		} catch {
			// keep the last numbers
		}
	};
	return { stats, load };
};

export const useAdminStats = () => {
	const stats = useState<AdminStats | null>("admin-stats", () => null);
	const load = async () => {
		try {
			stats.value = await statsService.admin();
		} catch {
			// keep the last numbers
		}
	};
	return { stats, load };
};
