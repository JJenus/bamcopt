import type { Transaction } from '~/utils/interfaces/Transaction';
import type { UserStats } from '~/utils/interfaces/Funding';

type Workspace = {
	owner: string; loading: boolean; ready: boolean; error: string;
	transactions: Transaction[]; stats: UserStats | null;
	activityError: string; statsError: string;
};

export const createAccountWorkspace = (owner = ''): Workspace => ({ owner, loading: false, ready: false, error: '', transactions: [], stats: null, activityError: '', statsError: '' });

export const useAccountWorkspace = () => {
	const state = useState<Workspace>('account-workspace', () => createAccountWorkspace());
	const { data: user, account } = userData();
	const auth = useAuth();
	const current = (id: string, token: string | null) => auth.token.value === token && user.value.id === id && state.value.owner === id;
	const load = async () => {
		void useAppSettings().load();
		void useNotifications().refresh();
		const id = user.value.id;
		const token = auth.token.value;
		if (!id || !token) return;
		if (state.value.owner !== id) state.value = createAccountWorkspace(id);
		if (state.value.loading) return;
		state.value.loading = true;
		const results = await Promise.allSettled([
			userService.get(id), transactionService.listForUser(id), statsService.mine(),
		]);
		if (!current(id, token)) return;
		const [profile, activity, stats] = results;
		if (profile.status === 'fulfilled' && profile.value.account) {
			user.value = profile.value;
			account.value = profile.value.account;
			state.value.ready = true;
			state.value.error = '';
		} else { state.value.error = 'We could not refresh your account. Any previously shown balance may be out of date.'; }
		if (activity.status === 'fulfilled') {
			state.value.transactions = activity.value;
			userData().transactions.value = activity.value;
			state.value.activityError = '';
		} else { state.value.activityError = 'Unable to refresh activity. Please try again.'; }
		if (stats.status === 'fulfilled') { state.value.stats = stats.value; state.value.statsError = ''; }
		else { state.value.statsError = 'Your summary is unavailable right now.'; }
		state.value.loading = false;
	};
	return { state, user, account, load };
};
