// Compatibility for existing callers, including admin screens. Forms should prefer inline errors.
export const errorAlert = (message: string | null) => useToasts().push(message || 'Something went wrong. Please try again.', 'danger');
export const successAlert = (message: string) => useToasts().push(message, 'success');
export const warningAlert = (message: string) => useToasts().push(message, 'warning');
export const infoAlert = (message: string) => useToasts().push(message, 'info');
