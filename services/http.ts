/**
 * The ONLY place that talks HTTP to our API. Components and pages must go through the
 * services in this folder (enforced by `pnpm lint:api`).
 */
export class ApiError extends Error {
	constructor(message: string, public status: number) {
		super(message);
		this.name = "ApiError";
	}
}

type Options = { method?: "GET" | "POST" | "PUT" | "DELETE"; body?: unknown; auth?: boolean; timeout?: number };

export async function apiRequest<T>(path: string, { method = "GET", body, auth = true, timeout = 20000 }: Options = {}): Promise<T> {
	const token = auth ? useAuth().token.value : undefined;
	try {
		const response = await $fetch(path, {
			baseURL: useRuntimeConfig().public.API_BASE as string,
			method,
			body: body as any,
			timeout,
			headers: token ? { Authorization: `Bearer ${token}` } : undefined,
		});
		return response as T;
	} catch (e: any) {
		const status = e?.status ?? e?.statusCode ?? 0;
		// expired / invalid session: back to the login (never for the login calls themselves)
		if (auth && status === 401 && import.meta.client) void useAuth().logout();
		throw new ApiError(e?.data?.message || e?.message || "Request failed", status);
	}
}
