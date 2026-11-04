import { type INotification, NotificationStatus } from "~/utils/interfaces/Notification";

/**
 * Bell state: unread count (cheap poll), the latest few notifications for the dropdown,
 * and freshly arrived ones for the toast. The full list lives on the notifications page.
 */
export const useNotifications = () => {
	const unread = useState<number>("notif-unread", () => 0);
	const latest = useState<INotification[]>("notif-latest", () => []);
	const incoming = useState<INotification[]>("notif-incoming", () => []);
	const loadingLatest = useState<boolean>("notif-loading-latest", () => false);
	const started = useState<boolean>("notif-started", () => false);
	const seen = useState<string[]>("notif-seen", () => []);

	const userId = () => userData().data.value.id;

	/** Poll step: update the badge; when it grew, fetch the new ones for the toast. */
	const refresh = async () => {
		if (!userId()) return;
		try {
			const { unread: count } = await notificationService.unreadCount();
			const grew = count > unread.value;
			unread.value = count;
			if (!started.value || grew) {
				const page = await notificationService.list(userId(), { status: "unread", limit: 5 });
				const fresh = page.items.filter((n) => !seen.value.includes(n.id));
				seen.value = [...seen.value, ...fresh.map((n) => n.id)].slice(-200);
				if (started.value) incoming.value = [...incoming.value, ...fresh]; // first load: badge only, no toast flood
			}
			started.value = true;
		} catch {
			/* the next poll retries; an expired session is handled by the http layer */
		}
	};

	const loadLatest = async () => {
		if (!userId()) return;
		loadingLatest.value = true;
		try {
			const page = await notificationService.list(userId(), { limit: 6 });
			latest.value = page.items;
			unread.value = page.unread;
		} catch {
		} finally {
			loadingLatest.value = false;
		}
	};

	const markRead = async (n: INotification) => {
		if (n.status === NotificationStatus.READ) return;
		n.status = NotificationStatus.READ; // optimistic
		unread.value = Math.max(0, unread.value - 1);
		try {
			await notificationService.markRead(n.id);
		} catch {
			await refresh();
		}
	};

	const markAllRead = async () => {
		try {
			await notificationService.markAllRead();
			latest.value = latest.value.map((n) => ({ ...n, status: NotificationStatus.READ }));
			unread.value = 0;
		} catch {}
	};

	return { unread, latest, incoming, loadingLatest, refresh, loadLatest, markRead, markAllRead };
};
