export enum NotificationStatus {
	READ = "read",
	UNREAD = "unread",
}

export enum NotificationType {
	DEBIT = "debit",
	CREDIT = "credit",
	ACCOUNT_UPDATE = "account update",
	FAILED = "failed",
	INFO = "info",
}

/** Filter used by the notifications page. */
export type NotificationGroup = "transfers" | "account" | "system";

export interface INotification {
	id: string;
	userId: string;
	title: string;
	status: NotificationStatus;
	message: string;
	type: NotificationType;
	createdAt: string;
	/** what it is about; used for the "view" link */
	entityType?: "transaction" | "user" | null;
	entityId?: string | null;
}

export interface NotificationPage {
	items: INotification[];
	total: number;
	unread: number;
}
