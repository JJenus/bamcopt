import { u as useRuntimeConfig, _ as __nuxt_component_0 } from '../server.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { u as useSeoMeta } from './index-2fc80598.mjs';
import { u as useCookie } from './cookie-8c768185.mjs';
import { a as useAuth, u as userData } from './userData-981e93ad.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
import 'ufo';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    useSeoMeta({
      title: `App - ${useRuntimeConfig().public.APP}`
    });
    useCookie("reload", { maxAge: 60 * 60 * 24 });
    (_a = useAuth().userData.value) == null ? void 0 : _a.userId;
    userData().data;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtPage, _attrs, null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=app-3fcc628e.mjs.map
