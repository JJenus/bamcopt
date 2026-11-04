import { type INotification, NotificationStatus } from '~/utils/interfaces/Notification';

/** Shared notification contract from main: cheap count polling, latest preview, and incoming toasts. */
export const useNotifications = () => {
	const unread = useState('notif-unread', () => 0);
	const latest = useState<INotification[]>('notif-latest', () => []);
	const incoming = useState<INotification[]>('notif-incoming', () => []);
	const loadingLatest = useState('notif-loading-latest', () => false);
	const refreshing = useState('notif-refreshing', () => false);
	const started = useState('notif-started', () => false);
	const seen = useState<string[]>('notif-seen', () => []);
	const epoch = useState('notif-epoch', () => 0);
	const latestError = useState('notif-latest-error', () => '');
	const actionError = useState('notif-action-error', () => '');
	const marking = useState('notif-marking', () => false);
	const userId = () => userData().data.value.id;
	const snapshot = () => ({ id: userId(), token: useAuth().token.value, epoch: epoch.value });
	const current = (request: ReturnType<typeof snapshot>) => request.id === userId() && request.token === useAuth().token.value && request.epoch === epoch.value;
	const reset = () => {
		epoch.value++; unread.value = 0; latest.value = []; incoming.value = []; seen.value = [];
		started.value = false; refreshing.value = false; loadingLatest.value = false; marking.value = false;
		latestError.value = ''; actionError.value = '';
	};
	const refresh = async () => {
		const request = snapshot();
		if (!request.id || !request.token || refreshing.value) return;
		refreshing.value = true;
		try {
			const { unread: count } = await notificationService.unreadCount();
			if (!current(request)) return;
			const grew = count > unread.value;
			unread.value = count;
			if (!started.value || grew) {
				const page = await notificationService.list(request.id, { status: 'unread', limit: 5 });
				if (!current(request)) return;
				const fresh = page.items.filter(item => !seen.value.includes(item.id));
				seen.value = [...seen.value, ...fresh.map(item => item.id)].slice(-200);
				if (started.value) incoming.value = [...incoming.value, ...fresh];
			}
			started.value = true;
		} catch { /* The next visible poll retries; do not flood the user with transient poll errors. */ }
		finally { if (current(request)) refreshing.value = false; }
	};
	const loadLatest = async () => {
		const request = snapshot();
		if (!request.id || loadingLatest.value) return;
		loadingLatest.value = true; latestError.value = '';
		try {
			const page = await notificationService.list(request.id, { limit: 6 });
			if (current(request)) { latest.value = page.items; unread.value = page.unread; }
		} catch { if (current(request)) latestError.value = 'Could not load notifications. Please try again.'; }
		finally { if (current(request)) loadingLatest.value = false; }
	};
	const markRead = async (item: INotification) => {
		if (item.status === NotificationStatus.READ) return true;
		const request = snapshot();
		actionError.value = '';
		try {
			await notificationService.markRead(item.id);
			if (!current(request)) return false;
			item.status = NotificationStatus.READ;
			latest.value = latest.value.map(n => n.id === item.id ? { ...n, status: NotificationStatus.READ } : n);
			unread.value = Math.max(0, unread.value - 1);
			return true;
		} catch { if (current(request)) actionError.value = 'Unable to mark this notification as read.'; return false; }
	};
	const markAllRead = async () => {
		if (marking.value) return false;
		const request = snapshot();
		marking.value = true; actionError.value = '';
		try {
			const result = await notificationService.markAllRead();
			if (!current(request)) return false;
			latest.value = latest.value.map(n => ({ ...n, status: NotificationStatus.READ }));
			unread.value = result.unread;
			return true;
		} catch { if (current(request)) actionError.value = 'Unable to mark notifications as read. Please try again.'; return false; }
		finally { if (current(request)) marking.value = false; }
	};
	return { unread, latest, incoming, loadingLatest, latestError, actionError, marking, refresh, loadLatest, markRead, markAllRead, reset };
};
