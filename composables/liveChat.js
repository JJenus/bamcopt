export const useLiveChat = () => {
	const openChat = () => {
		try {
			window.jivo_init();
			window.jivo_api.open();
		} catch {
			// Jivo is injected by the marketing site; nothing to open without it.
		}
	};

	const closeChat = () => {
		// Kept for parity with the old Jivo integration.
	};

	const load = () => {
		if (!import.meta.client) return;

		// Auth is available for future chat identity wiring; no polling needed yet.
		void useAuth();
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
