<script setup lang="ts">
	import { formatMessageTime } from "~/utils/date";
	import type { INotification } from "~/utils/interfaces/Notification";

	userData().getNotifications();
	const notifications = userData().newNotifications;

	type ToastPayload = {
		title: string;
		createdAt: string | Date;
		message: string;
	};

	const notification = ref<ToastPayload>({
		title: "Great",
		createdAt: new Date(),
		message: "Something splendid",
	});

	const time = (value: string | Date) => formatMessageTime(value);

	const showToast = () => {
		const container = document.getElementById(
			"kt_docs_toast_stack_container"
		);
		const target = document.querySelector<HTMLElement>(
			'[data-kt-docs-toast="stack"]'
		);
		if (!container || !target) return;

		const newToast = target.cloneNode(true) as HTMLElement;
		const toastHeader = newToast.querySelector(".toast-header");
		const toastTitle = toastHeader?.querySelector("strong");
		const toastTime = toastHeader?.querySelector("small");
		const toastBody = newToast.querySelector(".toast-body");

		if (toastTitle) toastTitle.textContent = notification.value.title;
		if (toastTime) toastTime.textContent = time(notification.value.createdAt);
		if (toastBody) toastBody.textContent = notification.value.message;

		container.append(newToast);

		const bootstrap = (window as any).bootstrap;
		if (!bootstrap?.Toast) return;

		bootstrap.Toast.getOrCreateInstance(newToast).show();
	};

	let poll: ReturnType<typeof setInterval> | undefined;

	onMounted(() => {
		const target = document.querySelector<HTMLElement>(
			'[data-kt-docs-toast="stack"]'
		);
		target?.parentNode?.removeChild(target);

		watch(notifications, (newNotifications: INotification[]) => {
			newNotifications.forEach((newNotification: INotification) => {
				notification.value = {
					title: newNotification.title,
					createdAt: newNotification.createdAt,
					message: newNotification.message,
				};
				showToast();
			});

			notifications.value = [];
		});

		poll = setInterval(() => {
			if (useAuth().isAuthenticated.value) userData().getNotifications();
			else clearInterval(poll);
		}, 10000);
	});

	onUnmounted(() => {
		if (poll) clearInterval(poll);
	});
</script>
