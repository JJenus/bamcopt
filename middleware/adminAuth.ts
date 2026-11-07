export default defineNuxtRouteMiddleware(() => {
	const auth = useAuth();

	if (!auth.userAuth.value) {
		return auth.logout();
	}

	if (auth.userData.value?.user?.userType === "superadmin") return navigateTo("/super");

	if (
		!auth.isAuthenticated.value ||
		auth.userData.value?.user?.userType !== "admin"
	) {
		return auth.logout();
	}
});
