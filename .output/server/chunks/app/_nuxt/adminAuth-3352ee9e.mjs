import { g as defineNuxtRouteMiddleware } from '../server.mjs';
import { u as useCookie } from './cookie-8c768185.mjs';
import { a as useAuth } from './userData-981e93ad.mjs';
import 'vue';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
import 'ufo';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue/server-renderer';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';
import 'http-graceful-shutdown';
import 'cookie-es';
import 'axios';

const adminAuth = /* @__PURE__ */ defineNuxtRouteMiddleware((to, from) => {
  var _a;
  const cookie = useCookie("auth");
  if (cookie.value == null || cookie.value == void 0) {
    return useAuth().logout();
  }
  const auth = useAuth();
  if (!auth.isAuthenticated() || ((_a = auth.userData.value) == null ? void 0 : _a.user.userType) !== "admin") {
    return auth.logout();
  }
});

export { adminAuth as default };
//# sourceMappingURL=adminAuth-3352ee9e.mjs.map
