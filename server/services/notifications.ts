import { Notification, NotificationStatus, NotificationType } from "../models";
import { notFound } from "../utils/errors";

type NewNotification = { userId: string; title: string; message: string; type?: NotificationType };

export const createNotification = (n: NewNotification) =>
	Notification.create({ ...n, status: NotificationStatus.UNREAD, type: n.type ?? NotificationType.INFO });

/** Notifications are a courtesy: they must never break the operation that triggered them. */
export const notifySafe = async (n: NewNotification) => {
	try {
		await createNotification(n);
	} catch (error) {
		console.error("[notification] failed:", (error as Error).message);
	}
};

export const listNotifications = (userId: string) =>
	Notification.findAll({ where: { userId }, order: [["createdAt", "DESC"]] });

export const markRead = async (id: string, userId: string, isAdmin: boolean) => {
	const n = await Notification.findByPk(id);
	if (!n || (!isAdmin && n.userId !== userId)) throw notFound("Notification not found");
	await n.update({ status: NotificationStatus.READ });
	return n;
};

export const markAllRead = async (userId: string) => {
	await Notification.update({ status: NotificationStatus.READ }, { where: { userId, status: NotificationStatus.UNREAD } });
	return listNotifications(userId);
};
