import type { LoginEvent, SessionsReport } from "~/services/security.service";

export type AdminSummary = {
	id: string; name: string; email: string; status: string; createdAt: string;
	lastSignIn: { at: string; ip: string; location: string; device: string } | null;
	devices: number; signIns: number; failedAttempts: number; actions7d: number; newDevices7d: number; activeSessions: number; online: boolean;
};
export type AdminDetail = SessionsReport & { admin: { id: string; name: string; email: string; status: string; createdAt: string } };
export type AdminAction = {
	id: string; action: string; targetType: string | null; targetId: string | null; summary: string;
	meta: Record<string, unknown> | null; ip: string; deviceInfo: string; createdAt: string;
};
export type ActionPage = { actions: AdminAction[]; nextBefore: string | null };
export type MaintenanceReport = {
	settings: { securityLogDays: number; auditLogDays: number; sessionDays: number };
	rows: { securityLogs: number; auditLogs: number; sessions: number };
};
export type LoginPage = { events: LoginEvent[]; nextBefore: string | null };

export const superService = {
	admins: () => apiRequest<AdminSummary[]>("/super/admins"),
	adminSessions: (id: string) => apiRequest<AdminDetail>(`/super/admins/${id}/sessions`),
	adminLogins: (id: string, query: { limit?: number; before?: string; action?: "login" | "attempt_failed" | "logout" } = {}) =>
		apiRequest<LoginPage>(`/super/admins/${id}/logins`, { query }),
	adminActions: (id: string, query: { limit?: number; before?: string; area?: string } = {}) =>
		apiRequest<ActionPage>(`/super/admins/${id}/actions`, { query }),
	maintenance: () => apiRequest<MaintenanceReport>("/super/maintenance"),
	prune: () => apiRequest<{ removed: { securityLogs: number; auditLogs: number; sessions: number } }>("/super/maintenance/prune", { method: "POST" }),
	/** Switch an administrator off (their sessions end and they cannot sign in) or back on. */
	setAdminStatus: (id: string, status: "ACTIVE" | "SUSPENDED") =>
		apiRequest<{ status: string; sessionsEnded: number }>(`/super/admins/${id}/status`, { method: "POST", body: { status } }),
};
