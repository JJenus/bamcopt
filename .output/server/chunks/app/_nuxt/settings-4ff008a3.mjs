import { _ as __nuxt_component_1 } from './nuxt-link-78f9c8c3.mjs';
import { _ as __nuxt_component_0 } from '../server.mjs';
import { defineComponent, ref, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    const showPreference = ref("pref");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<!--[--><div class="card card-flush pb-0 bgi-position-y-center bgi-no-repeat mb-10"><div class="card-header pt-10 mb-0 pb-0"><div class="d-flex align-items-center"><div class="symbol symbol-circle me-5"><div class="symbol-label bg-transparent text-primary border border-secondary border-dashed"><i class="ki-outline ki-gear fs-2x text-primary"></i></div></div><div class="d-flex flex-column"><h2 class="mb-1">Settings</h2>`);
      if (unref(showPreference)) {
        _push(`<div class="text-muted fw-bold d-noine"><span class="text-info">Default</span><span class="mx-3">|</span><span href="#">Tiers</span></div>`);
      } else {
        _push(`<div class="text-muted fw-bold"><span class="text-primary">Session Logs</span><span class="mx-3">|</span><span class="text-danger">Deactivate</span></div>`);
      }
      _push(`</div></div></div><div class="card-body pb-0 mt-0 pt-3"><div class="d-flex overflow-auto h-55px"><ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap"><li class="nav-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/settings",
        onClick: ($event) => showPreference.value = "pref",
        class: [unref(showPreference) === "pref" ? "active" : "", "nav-link text-active-primary me-6"],
        role: "button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Default `);
          } else {
            return [
              createTextVNode(" Default ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/settings/tiers",
        onClick: ($event) => showPreference.value = "tiers",
        class: [unref(showPreference) === "tiers" ? "active" : "", "nav-link text-active-primary me-6"],
        role: "button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Account Info `);
          } else {
            return [
              createTextVNode(" Account Info ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div></div>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settings-4ff008a3.mjs.map
