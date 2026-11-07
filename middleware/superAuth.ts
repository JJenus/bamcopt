export default defineNuxtRouteMiddleware(() => {
	const auth = useAuth();

	if (!auth.userAuth.value || !auth.isAuthenticated.value) return auth.logout();
	// the server re-checks the role on every request; this only keeps other roles out of the layout
	if (auth.userData.value?.user?.userType !== "superadmin") return auth.logout();
});
