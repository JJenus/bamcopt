import { type INotification, NotificationType } from "~/utils/interfaces/Notification";

type Meta = { icon: string; color: string; label: string };

/** Icon / colour / label per notification type (shared by the bell, list, detail and toast). */
export const notificationMeta = (type: NotificationType | string): Meta => {
	switch (type) {
		case NotificationType.CREDIT:
			return { icon: "ki-arrow-down-left", color: "success", label: "Money received" };
		case NotificationType.DEBIT:
			return { icon: "ki-arrow-up-right", color: "primary", label: "Transfer" };
		case NotificationType.FAILED:
			return { icon: "ki-cross-circle", color: "danger", label: "Failed" };
		case NotificationType.ACCOUNT_UPDATE:
			return { icon: "ki-profile-circle", color: "warning", label: "Account" };
		default:
			return { icon: "ki-information-5", color: "info", label: "Info" };
	}
};

/** Where "view" should take the user, or null when the notification has nothing to open. */
export const notificationTarget = (n: INotification, base: string): { to: string; label: string } | null => {
	if (!n.entityId) return null;
	if (n.entityType === "transaction" && base === "/app") return { to: `/app/transaction/${n.entityId}`, label: "View transaction" };
	if (n.entityType === "user" && base === "/admin") return { to: `/admin/users/${encodeURIComponent(n.entityId)}`, label: "Open user" };
	if (n.entityType === "transaction" && base === "/admin") return { to: `/admin/transaction/${encodeURIComponent(n.entityId)}`, label: "View transaction" };
	return null;
};
