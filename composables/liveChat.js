export const useLiveChat = () => {
	const openChat = () => {
		try {
		} catch (error) {
			window.jivo_init();
			window.jivo_api.open();
		}
	};

	const closeChat = () => {
		const closeInt = setInterval(() => {
			try {
				console.log("Close")
				window.jivo_destroy();
				clearInterval(closeInt);
			} catch (error) {}
		}, 500);
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
