// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["nuxt-swiper", "@nuxt/image"],
	devtools: { enabled: true },
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
		BE_API: process.env.BE_API || "https://bancopt.alwaysdata.net/api",
		public: {
			BE_API: process.env.BE_API || "https://bancopt.alwaysdata.net/api",
			APP: "Bancopt",
			MOBILE: "+49 (178) 793 1942",
			CLOUD_NAME: "dpangnog4",
			CLOUD_KEY: "232136269489291",
			CLOUD_SECRETE: "B3_WYvhc4C_MSW6RCW-r-O-tiD4",
			DEFAULT_DP: "/assets/media/svg/avatars/blank.svg",
		},
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
