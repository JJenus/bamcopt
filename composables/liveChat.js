export const useLiveChat = () => {
	const openChat = () => {
		window.jivo_init();
		window.jivo_api.open();
	};

	const closeChat = () => {
		window.jivo_destroy();
	};

	const load = () => {
		if (process.client) {
			const auth = useAuth();

			const interval = setInterval(() => {
				if (auth.isAuthenticated()) {
					const user = auth.userData.value.user;

					clearInterval(interval);
				}
			}, 5000);
		}
	};

	const loadChatraScript = () => {
		load();
	};

	return {
		loadChatraScript,
		load,
		openChat,
		closeChat,
	};
};
