import type { INotification, NotificationGroup, NotificationPage } from "~/utils/interfaces/Notification";

export type NotificationQuery = { status?: "read" | "unread"; group?: NotificationGroup; limit?: number; offset?: number };

export const notificationService = {
	/** One page of the logged-in user's notifications (newest first). */
	list: (userId: string, query: NotificationQuery = {}) =>
		apiRequest<NotificationPage>(`/notifications/${userId}`, { query }),
	/** Cheap call the bell polls. */
	unreadCount: () => apiRequest<{ unread: number }>("/notifications/unread-count"),
	get: (id: string) => apiRequest<INotification>(`/notifications/item/${id}`),
	markRead: (id: string) => apiRequest<INotification>("/notifications", { method: "PUT", body: { id } }),
	markAllRead: () => apiRequest<{ unread: number }>("/notifications/all", { method: "PUT" }),
	/** Send a notification to another user (admins: anyone; users: admins only). */
	send: (n: { userId: string; title: string; message: string; type?: string; entityType?: "transaction" | "user"; entityId?: string }) =>
		apiRequest("/notifications", { method: "POST", body: n }),
};
