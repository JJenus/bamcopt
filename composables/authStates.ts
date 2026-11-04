import type { AuthToken } from "~/utils/interfaces/AuthToken";
import type { IUser } from "~/utils/interfaces/IUser";

const AUTH_COOKIE = "auth";
const AUTH_MAX_AGE = 60 * 60 * 24; // one day

/**
 * Auth state is derived from the `auth` cookie (the SSR source of truth) and mirrored
 * into Nuxt state so every component/service shares the same instance.
 */
export const useAuth = () => {
	const appUser = userData();
	const authData = useState<AuthToken | null>("user", () => null);
	const userAuth = useCookie<AuthToken | null>(AUTH_COOKIE, {
		maxAge: AUTH_MAX_AGE,
		sameSite: "lax",
	});
	const openAuth = useState<string>("authAction", () => "login");

	const hydrate = (auth: AuthToken | null | undefined) => {
		authData.value = auth ?? null;

		const user = auth?.user as IUser | undefined;
		if (!user) return;

		appUser.data.value = user;
		// an account-less user (e.g. a seeded admin) keeps the empty default instead of null
		if (user.account) appUser.account.value = user.account;
	};

	// Restore the session from the cookie on first use (client and SSR).
	if (!authData.value && userAuth.value) hydrate(userAuth.value);

	const token = computed(
		() => authData.value?.token ?? userAuth.value?.token ?? null
	);
	const isAuthenticated = computed(() => Boolean(token.value));
	const userType = computed(
		() => (authData.value?.user as IUser | undefined)?.userType ?? null
	);

	const openAuthModal = (action: string) => {
		openAuth.value = action;
	};

	const redirect = async (path: string): Promise<void> => {
		if (import.meta.server) {
			await navigateTo(path);
			return;
		}
		window.location.href = path;
	};

	const login = (auth: AuthToken) => {
		userAuth.value = auth;
		hydrate(auth);

		return redirect(userType.value === "admin" ? "/admin" : "/app");
	};

	const logout = () => {
		userAuth.value = null;
		hydrate(null);

		return redirect("/");
	};

	return {
		isAuthenticated,
		token,
		userType,
		userData: authData,
		logout,
		login,
		openAuthModal,
		userAuth,
	};
};
