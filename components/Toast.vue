<script setup>
	import moment from "moment";
	userData().getNotifications();
	const notifications = userData().newNotifications;

	let targetElement;
	let container;
	const notification = ref({
		title: "Great",
		status: "READ",
		createdAt: new Date(),
		message: "Something splendid",
	});
	const time = (nTime) => {
		const now = moment();
		const inputTime = moment(nTime);

		if (now.diff(inputTime, "hours") <= 1) {
			return inputTime.fromNow();
		} else if (now.isSame(inputTime, "day")) {
			return inputTime.format("hh:mm A");
		} else {
			return inputTime.format("DD/MM/YYYY hh:mm A");
		}
	};

	const showToast = () => {
		const newToast = targetElement.cloneNode(true);
		// Update the new toast content
		const toastHeader = newToast.querySelector(".toast-header");
		const toastTitle = toastHeader.querySelector("strong");
		const toastTime = toastHeader.querySelector("small");
		const toastBody = newToast.querySelector(".toast-body");

		toastTitle.textContent = notification.value.title; // Update the title
		toastTime.textContent = time(notification.value.createdAt); // Update the time
		toastBody.textContent = notification.value.message; // Update the body
		container.append(newToast);
		const toast = bootstrap.Toast.getOrCreateInstance(newToast);
		toast.show();
	};

	if (process.client) {
		// Select elements
		container = document.getElementById("kt_docs_toast_stack_container");
		targetElement = document.querySelector('[data-kt-docs-toast="stack"]'); //

		// Remove base element markup
		targetElement.parentNode.removeChild(targetElement);

		watch(notifications, (newNotifications, oldPoint) => {
			console.log("NEW POINTS....", newNotifications);

			newNotifications.forEach((newNotification) => {
				notification.value = newNotification;
				console.log("NEW POINT", newNotification.message);
				showToast();
			});

			notifications.value = [];
		});
	}

	onMounted(() => {
		if (process.client) {
			const nInterval = setInterval(() => {
				// showToast();
				if (useAuth().isAuthenticated()) userData().getNotifications();
				else {
					clearInterval(nInterval);
				}
			}, 10000);
		}
	});
</script>

<template>
	<div>
		<div
			id="kt_docs_toast_stack_container"
			class="toast-container z-index-6k position-fixed top-0 end-0 p-3 z-index-3 pt-10 pt-lg-5 w-75 w-md-300px me-3"
		>
			<div
				class="toast"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
				data-kt-docs-toast="stack"
			>
				<div class="toast-header">
					<i class="ki-duotone ki-message-notif fs-2 text-info me-3">
						<span class="path1"></span>
						<span class="path2"></span>
						<span class="path3"></span>
						<span class="path4"></span>
						<span class="path5"></span>
					</i>
					<strong class="me-auto">Bancopt</strong>
					<small>11 mins ago</small>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="toast"
						aria-label="Close"
					></button>
				</div>
				<div class="toast-body">
					Hello, world! This is a toast message.
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.z-index-6k {
		z-index: 60000;
	}
</style>
