

export const navs = ref([
	{ name: "Home", dir: "/app", icon: "ki-solid ki-home-3", paths: [] },
	{ name: "Transfer", dir: "/app/transfer", icon: "ki-solid ki-send", paths: [] },
	{ name: "Transactions", dir: "/app/transactions", icon: "ki-solid ki-arrows-loop", paths: [] },
	// profile, account & limits, security live under the settings hub
	{ name: "Settings", dir: "/app/settings", icon: "ki-solid ki-gear", paths: [] },
]);

export const adminNavs = ref([
	{ name: "Dashboard", dir: "/admin", icon: "ki-duotone ki-element-equal", paths: ["path1", "path2", "path3", "path4"] },
	{ name: "Users", dir: "/admin/users", icon: "ki-duotone ki-profile-user", paths: ["path1", "path2", "path3", "path4"] },
	{ name: "Funding", dir: "/admin/funding", icon: "ki-solid ki-bank", paths: [] },
	{ name: "Settings", dir: "/admin/settings", icon: "ki-outline ki-gear", paths: [] },
]);

/** Home / Dashboard only match exactly; the rest also match their sub pages. */
export const isNavActive = (dir: string, path: string) =>
	dir === "/app" || dir === "/admin" ? path === dir : path === dir || path.startsWith(dir + "/");

export const closeDrawer = () => {
	// console.log("Clicked");
	const body = document.querySelector(".drawer-overlay") as HTMLElement;
	if (body !== null) body.click();
	// console.log(body); 

	// body?.removeAttribute("data-kt-drawer");
	// body?.removeAttribute("data-kt-drawer-app-aside");
	// body?.removeAttribute("data-kt-drawer-activities");
};
