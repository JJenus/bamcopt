import { publicContactLinks } from '~/utils/public-site';

export const usePublicSite = () => {
	const config = useRuntimeConfig().public;
	const auth = useAuth();
	const contact = computed(() => publicContactLinks(String(config.SUPPORT_EMAIL), String(config.MOBILE)));
	const accountPath = computed(() => auth.userType.value === 'admin' ? '/admin' : auth.userType.value === 'superadmin' ? '/super' : '/app');
	return { config, contact, auth, accountPath };
};
