import type { LoginEvent, SessionsReport } from "~/services/security.service";

export type AdminSummary = {
	id: string; name: string; email: string; status: string; createdAt: string;
	lastSignIn: { at: string; ip: string; location: string; device: string } | null;
	devices: number; signIns: number; failedAttempts: number;
};
export type AdminDetail = SessionsReport & { admin: { id: string; name: string; email: string; status: string; createdAt: string } };
export type LoginPage = { events: LoginEvent[]; nextBefore: string | null };

export const superService = {
	admins: () => apiRequest<AdminSummary[]>("/super/admins"),
	adminSessions: (id: string) => apiRequest<AdminDetail>(`/super/admins/${id}/sessions`),
	adminLogins: (id: string, query: { limit?: number; before?: string; action?: "login" | "attempt_failed" } = {}) =>
		apiRequest<LoginPage>(`/super/admins/${id}/logins`, { query }),
};
