export const useLiveChat = () => {
	const openChat = () => {
		try {
		} catch (error) {
			window.jivo_init();
			window.jivo_api.open();
		}
	};

	const closeChat = () => {
		// const closeInt = setInterval(() => {
		// 	try {
		// 	  if(window.jivo_api){
		// 	    window.jivo_destroy();
		// 		  clearInterval(closeInt);
		// 	  }
		// 		console.log("Close");
		// 	} catch (error) {}
		// }, 500);
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
