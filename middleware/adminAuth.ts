export default defineNuxtRouteMiddleware(() => {
	const auth = useAuth();

	if (!auth.userAuth.value) {
		return auth.logout();
	}

	if (
		!auth.isAuthenticated.value ||
		auth.userData.value?.user?.userType !== "admin"
	) {
		return auth.logout();
	}
});
