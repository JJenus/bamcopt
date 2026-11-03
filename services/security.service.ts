export type SecurityLogEntry = { id: string; action: "login" | "logout" | "attempt_failed"; ip: string; deviceInfo: string; reason?: string; createdAt: string };

export const securityService = {
	history: (userId: string) => apiRequest<SecurityLogEntry[]>(`/security-logs/${userId}`),
};
