import { siteOrigin } from '~/utils/public-site';

/** Same-site links follow the request/browser origin, including the actual dev-server port. */
export const useSiteOrigin = () => siteOrigin(useRequestURL({ xForwardedHost: false }).origin);
