import { canonicalUrl } from '~/utils/public-site';

export const usePublicSeo = (title: string, description: string, noindex = false) => {
	const config = useRuntimeConfig().public;
	const route = useRoute();
	const origin = useSiteOrigin();
	const fullTitle = computed(() => `${title} | ${config.APP}`);
	const canonical = computed(() => canonicalUrl(origin, route.path));
	const image = computed(() => new URL(String(config.LOGO_URL), origin).href);
	useSeoMeta({
		title: fullTitle, description, ogTitle: fullTitle, ogDescription: description,
		ogSiteName: () => String(config.APP), ogType: 'website', ogUrl: canonical, ogImage: image,
		twitterCard: 'summary', twitterTitle: fullTitle, twitterDescription: description, twitterImage: image,
		robots: noindex ? 'noindex, nofollow' : 'index, follow',
	});
	useHead({ htmlAttrs: { lang: 'en' }, link: [{ rel: 'canonical', href: canonical }] });
};
