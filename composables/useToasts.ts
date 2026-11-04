export type ToastTone = 'success' | 'danger' | 'warning' | 'info';
export type ToastMessage = { id: number; message: string; tone: ToastTone; createdAt: number; title?: string; to?: string };

export const useToasts = () => {
	const messages = useState<ToastMessage[]>('ui-toasts', () => []);
	const sequence = useState<number>('ui-toast-sequence', () => 0);
	const dismiss = (id: number) => { messages.value = messages.value.filter(item => item.id !== id); };
	const push = (message: string, tone: ToastTone = 'info', options: { title?: string; to?: string } = {}) => {
		if (import.meta.server) return;
		messages.value = [...messages.value.slice(-3), { id: ++sequence.value, message, tone, createdAt: Date.now(), ...options }];
	};
	return { messages, push, dismiss };
};
