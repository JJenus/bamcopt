import { AuthToken } from "utils/interfaces/AuthToken";

export default defineNuxtRouteMiddleware((to, from) => {
	// if (to.params.id === "1") {
	// 	return abortNavigation();
	// }
	// In a real app you would probably not redirect every route to `/`
	// however it is important to check `to.path` before redirecting or you
	// might get an infinite redirect loop
	const cookie = useCookie<AuthToken | any>("auth");
	if (cookie.value == null || cookie.value == undefined) {
		return navigateTo("sign-in");
	}

	if (
		!useAuth().isAuthenticated() ||
		useAuth().userData.value?.user.userType !== "user"
	) {
		return useAuth().logout();
	}
});
