export function useSSE() {
	const userId = userData().data.value.id;
	const {
		public: { BE_API },
	} = useRuntimeConfig();

	const serverMessage = ref<string | null>(null);
	let eventSource: EventSource | null = null;

	const connect = () => {
		eventSource = new EventSource(`${BE_API}/events/${userId}`);

		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);

		};

		eventSource.onerror = () => {
			console.error("SSE error");
			eventSource?.close();
		};
	};
}
