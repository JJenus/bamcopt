import { _ as __nuxt_component_2 } from './Balance-2c0e2a93.mjs';
import { u as userData } from './userData-981e93ad.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './credit-card-1fd372b2.mjs';
import moment from 'moment';
import 'currency.js';
import '../server.mjs';
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
import 'axios';
import './cookie-8c768185.mjs';
import 'cookie-es';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const user = userData().data;
    const greet = () => {
      let userName = user.value.name.split(" ")[0];
      userName = userName.charAt(0).toUpperCase() + userName.slice(1);
      const now = moment();
      const hour = now.hour();
      let timeOfDay;
      if (hour >= 5 && hour < 12) {
        timeOfDay = "Good morning " + userName;
      } else if (hour >= 12 && hour < 17) {
        timeOfDay = "Good afternoon " + userName;
      } else if (hour >= 17 && hour < 20) {
        timeOfDay = "Good evening " + userName;
      } else {
        timeOfDay = `Hi ${userName}, working late`;
      }
      return timeOfDay + "!";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminBalance = __nuxt_component_2;
      _push(`<!--[--><div class="card card-custom bg-light-success border-0 h-md-100 mb-5 mb-lg-10"><div class="card-body d-flex justify-content-center flex-wrap ps-xl-15 pe-0"><div class="flex-grow-1 mt-2 me-9 me-md-0"><div class="position-relative text-gray-800 fs-1 z-index-2 fw-bold mb-5">${ssrInterpolate(greet())}</div>`);
      _push(ssrRenderComponent(_component_AdminBalance, { class: "d-lg-none mb-8" }, null, _parent));
      _push(`</div><img${ssrRenderAttr("src", _imports_0)} class="h-175px me-15" alt=""></div></div><div class="card card-flush overflow-hidden"></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-3aa80123.mjs.map
