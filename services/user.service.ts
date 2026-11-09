import type { IUser } from "~/utils/interfaces/IUser";

export const userService = {
	list: () => apiRequest<IUser[]>("/users"),
	get: (id: string) => apiRequest<IUser>(`/users/${id}`),
	update: (id: string, data: Record<string, unknown>) => apiRequest<IUser>(`/users/${id}`, { method: "PUT", body: data }),
	/** Recipient lookup for transfers. */
	/** Admin: forget that this user passed the transfer codes. Resolves with whether anything was remembered. */
	resetCodes: (id: string) => apiRequest<{ reset: boolean }>(`/users/${id}/reset-codes`, { method: "POST" }),
	findByEmail: (email: string) => apiRequest<Pick<IUser, "id" | "name" | "email" | "imgUrl">>("/users/find", { method: "POST", body: { email } }),
};
