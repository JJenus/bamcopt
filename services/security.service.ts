export type SecurityLogEntry = { id: string; action: "login" | "logout" | "attempt_failed"; ip: string; deviceInfo: string; reason?: string; createdAt: string };

export type DeviceType = "desktop" | "mobile" | "tablet" | "api" | "unknown";
export type DeviceSession = {
	key: string; label: string; browser: string; os: string; deviceType: DeviceType;
	signIns: number; firstSeen: string; lastSeen: string; lastIp: string; lastLocation: string;
	ips: string[]; locations: string[]; userAgent: string; current: boolean;
};
export type LoginEvent = {
	id: string; action: "login" | "logout" | "attempt_failed"; createdAt: string; ip: string; location: string; reason: string; userAgent: string;
	device: { key: string; label: string; browser: string; os: string; deviceType: DeviceType };
};
export type SessionsReport = { devices: DeviceSession[]; failedAttempts: { days: number; count: number; recent: LoginEvent[] }; truncated: boolean };

export const securityService = {
	history: (userId: string) => apiRequest<SecurityLogEntry[]>(`/security-logs/${userId}`),
	/** Devices someone has signed in from (one row per browser/device) and recent failed attempts. */
	sessions: (userId: string) => apiRequest<SessionsReport>(`/sessions/${userId}`),
};
