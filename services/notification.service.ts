import type { INotification } from "~/utils/interfaces/Notification";

export const notificationService = {
	listForUser: async (userId: string) => {
		const list = await apiRequest<INotification[]>(`/notifications/${userId}`);
		return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	},
	send: (n: { userId: string; title: string; message: string }) => apiRequest("/notifications", { method: "POST", body: n }),
	/** Marks all of the logged-in user's notifications as read. */
	markAllRead: () => apiRequest<INotification[]>("/notifications/all", { method: "PUT" }),
};
