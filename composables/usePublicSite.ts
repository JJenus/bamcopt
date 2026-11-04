import { publicContactLinks } from '~/utils/public-site';

export const usePublicSite = () => {
	const config = useRuntimeConfig().public;
	const auth = useAuth();
	const contact = computed(() => publicContactLinks(String(config.SUPPORT_EMAIL), String(config.MOBILE)));
	const accountPath = computed(() => auth.userType.value === 'admin' ? '/admin' : '/app');
	return { config, contact, auth, accountPath };
};
