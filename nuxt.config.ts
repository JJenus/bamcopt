// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["nuxt-swiper", "@nuxt/image"],
	compatibilityDate: "2024-09-01",
	devtools: { enabled: false },
	ssr: true,
	routeRules: {
		// "/": { redirect: "/about-us" },
	},
	image: {
		format: ["webp", "avif", "jpeg", "jpg", "png", "gif"],
		screens: {
			xs: 320,
			sm: 576,
			md: 768,
			lg: 992,
			xl: 1200,
			xxl: 1400,
			"2xl": 1536,
		},
	},
	runtimeConfig: {
		// server-only secrets (JWT_SECRET, DB_*, SMTP_*) are read from process.env in /server
		public: {
			// the API lives in this same Nuxt app (/server/api)
			API_BASE: "/api",
			APP: "Bancopt",
			MOBILE: "+49 (178) 793 1942",
			CLOUD_NAME: "dpangnog4", // unsigned upload preset: no secret needed in the browser
			DEFAULT_DP: "/assets/media/svg/avatars/blank.svg",
		},
	},
	// UI never calls the API directly: everything goes through /services
	imports: { dirs: ["services"] },
	nitro: {
		// Sequelize loads its PostgreSQL driver dynamically
		externals: { traceInclude: ["node_modules/pg/lib/index.js", "node_modules/pg-hstore/lib/index.js"] },
	},
	devServer: {
		// https: {
		// 	key: "./server.key",
		// 	cert: "./server.crt",
		// },
	},
	app: {
		head: {
			meta: [
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					name: "twitter:card",
					content:
						"Top international financial services provided to be accessible to all",
				},
				{
					name: "twitter:title",
					content: "Bancopt",
				},
				{
					name: "twitter:description",
					content:
						"Top international financial services provided to be accessible to all",
				},
				{
					name: "twitter:image",
					content: "https://www.bancopt.com/assets/media/logos/logo-ban.png",
				},
				{
					property: "og:title",
					content: "Bancopt",
				},
				{
					property: "og:description",
					content:
						"Top international financial services provided to be accessible to all",
				},
				{
					property: "og:image",
					content: "https://www.bancopt.com/assets/media/logos/logo-ban.png",
				},
				{
					property: "og:url",
					content: "https://www.bancopt.com",
				},
			],
			script: [
				{ src: "/assets/plugins/global/plugins.bundle.js" },
				{ src: "/assets/js/scripts.bundle.js" },
				// {
				// 	src: "/assets/plugins/custom/fslightbox/fslightbox.bundle.js",
				// },
				// {
				// 	src: "https://call.chatra.io/chatra.js",
				// }
			],

			link: [
				{
					rel: "stylesheet",
					href: "/assets/plugins/global/plugins.bundle.css",
				},
				{
					rel: "stylesheet",
					href: "/assets/css/style.bundle.css",
				},
				{
					rel: "icon",
					type: "image/x-icon",
					href: "/assets/media/favicon/favicon.ico",
				},
				{
					rel: "icon",
					sizes: "16x16",
					type: "image/png",
					href: "/assets/media/favicon/favicon-16x16.png",
				},
				{
					rel: "icon",
					sizes: "192x192",
					type: "image/png",
					href: "/assets/media/favicon/android-chrome-192x192.png",
				},
				{
					rel: "icon",
					sizes: "512x512",
					type: "image/png",
					href: "/assets/media/favicon/android-chrome-512x512.png",
				},
				{
					rel: "apple-touch-icon",
					href: "/assets/media/favicon/apple-touch-icon.png",
				},
				{
					rel: "manifest",
					href: "/assets/media/favicon/site.webmanifest",
				},
			],

			// please note that this is an area that is likely to change
			style: [
				// <style type="text/css">:root { color: red }</style>
				// { children: ":root { color: red }" },
			],
		},
	},
});
