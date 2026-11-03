export default defineNuxtRouteMiddleware(() => {
	const auth = useAuth();

	if (!auth.userAuth.value) {
		return navigateTo("/sign-in");
	}

	if (
		!auth.isAuthenticated.value ||
		auth.userData.value?.user?.userType !== "user"
	) {
		return auth.logout();
	}
});
