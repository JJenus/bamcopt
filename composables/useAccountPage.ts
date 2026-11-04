export const useAccountPage = (title: string) => {
	const config = useRuntimeConfig().public;
	useSeoMeta({ title: () => `${title} | ${config.APP}`, robots: 'noindex, nofollow' });
};
