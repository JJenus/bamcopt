import { Op } from "sequelize";
import { Notification, NotificationStatus, NotificationType } from "../models";
import { notFound } from "../utils/errors";

export type NotificationGroup = "transfers" | "account" | "system";
const GROUP_TYPES: Record<NotificationGroup, NotificationType[]> = {
	transfers: [NotificationType.DEBIT, NotificationType.CREDIT, NotificationType.FAILED],
	account: [NotificationType.ACCOUNT_UPDATE],
	system: [NotificationType.INFO],
};

type NewNotification = {
	userId: string;
	title: string;
	message: string;
	type?: NotificationType;
	/** what it is about, so the UI can link to it */
	entityType?: "transaction" | "user";
	entityId?: string;
};

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

export const countUnread = (userId: string) => Notification.count({ where: { userId, status: NotificationStatus.UNREAD } });

/** One page (newest first) + totals for the filter and the overall unread count. */
export const listNotifications = async (
	userId: string,
	opts: { status?: NotificationStatus; group?: NotificationGroup; limit: number; offset: number }
) => {
	const where: Record<string, unknown> = { userId };
	if (opts.status) where.status = opts.status;
	if (opts.group) where.type = { [Op.in]: GROUP_TYPES[opts.group] };
	const { rows, count } = await Notification.findAndCountAll({
		where,
		order: [["createdAt", "DESC"], ["id", "DESC"]],
		limit: opts.limit,
		offset: opts.offset,
	});
	return { items: rows, total: count, unread: await countUnread(userId) };
};

/** Owner (or an admin) only; others get "not found" so ids cannot be probed. */
export const getNotification = async (id: string, userId: string, admin: boolean) => {
	const n = await Notification.findByPk(id);
	if (!n || (!admin && n.userId !== userId)) throw notFound("Notification not found");
	return n;
};

export const markRead = async (id: string, userId: string, admin: boolean) => {
	const n = await getNotification(id, userId, admin);
	if (n.status !== NotificationStatus.READ) await n.update({ status: NotificationStatus.READ });
	return n;
};

export const markAllRead = async (userId: string) => {
	await Notification.update({ status: NotificationStatus.READ }, { where: { userId, status: NotificationStatus.UNREAD } });
	return { unread: 0 };
};
