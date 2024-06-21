

export const navs = ref([
	{
		name: "Home",
		dir: "/app",
		icon: "ki-solid ki-home-3",
		paths: [],
	},
	{
		name: "Account Info",
		dir: "/app/account-info",
		icon: "ki-duotone ki-grid-frame",
		paths: ["path1", "path2", "path3"],
	},
	{
		name: "Transfer",
		dir: "/app/transfer",
		icon: "ki-solid ki-send",
		paths: [],
	},
	{
		name: "Scan",
		dir: "/app/scan",
		icon: "ki-duotone ki-scan-barcode",
		paths: [
			"path1",
			"path2",
			"path3",
			"path4",
			"path5",
			"path6",
			"path7",
			"path8",
		],
	},
	{
		name: "Transactions",
		dir: "/app/transactions",
		icon: "ki-solid ki-chart-line",
		paths: [],
	},
	{
		name: "Settings",
		dir: "/app/settings",
		icon: "ki-solid ki-gear", //app/ki-outline
		paths: [],
	},
]);

export const adminNavs = ref([
	{
		name: "Dashboard",
		dir: "/admin",
		icon: "ki-duotone ki-element-equal",
		paths: ["path1", "path2", "path3", "path4", ],
	},
	{
		name: "Users",
		dir: "/admin/users",
		icon: "ki-duotone ki-profile-user",
		paths: ["path1", "path2", "path3", "path4"],
	},
	
	// {
	// 	name: "Transfer",
	// 	dir: "/admin/transfer",
	// 	icon: "ki-solid ki-send",
	// 	paths: [],
	// },
	{
		name: "Settings",
		dir: "/admin/settings",
		icon: "ki-outline ki-gear", //app/ki-outline
		paths: [],
	},
]);

export const closeDrawer = () => {
	// console.log("Clicked");
	const body = document.querySelector(".drawer-overlay") as HTMLElement;
	if (body !== null) body.click();
	// console.log(body); 

	// body?.removeAttribute("data-kt-drawer");
	// body?.removeAttribute("data-kt-drawer-app-aside");
	// body?.removeAttribute("data-kt-drawer-activities");
};
