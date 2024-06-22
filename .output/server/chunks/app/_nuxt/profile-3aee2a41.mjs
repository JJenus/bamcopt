import { _ as __nuxt_component_1 } from './nuxt-link-78f9c8c3.mjs';
import { a as useRoute, _ as __nuxt_component_0 } from '../server.mjs';
import { ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { u as userData } from './userData-981e93ad.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
import 'axios';
import './cookie-8c768185.mjs';
import 'cookie-es';

const _sfc_main = {
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    console.log();
    const currentRoute = ref("overview");
    const user = userData().data;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card mb-5 mb-xl-8" }, _attrs))}><div class="card-body pt-15"><div class="d-flex flex-center flex-column mb-5"><div class="symbol symbol-100px symbol-circle mb-7"><img${ssrRenderAttr("src", unref(user).imgUrl)} alt="image"></div><a href="#" class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1">${ssrInterpolate(unref(user).name)}</a><div class="fs-5 fw-semibold text-muted mb-6"></div><div class="d-flex flex-wriap flex-center d-noine">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/profile",
        onClick: ($event) => currentRoute.value = "overview",
        class: [unref(currentRoute) == "overview" ? "active" : "", "btn btn-active-light-primary border border-gray-300 border-dashed rounded py-3 px-3 mb-3"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="ki-duotone ki-note-2 fs-3 me-1"${_scopeId}><i class="path1"${_scopeId}></i><i class="path2"${_scopeId}></i><i class="path3"${_scopeId}></i><i class="path4"${_scopeId}></i></i> Overview `);
          } else {
            return [
              createVNode("i", { class: "ki-duotone ki-note-2 fs-3 me-1" }, [
                createVNode("i", { class: "path1" }),
                createVNode("i", { class: "path2" }),
                createVNode("i", { class: "path3" }),
                createVNode("i", { class: "path4" })
              ]),
              createTextVNode(" Overview ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/profile/edit",
        onClick: ($event) => currentRoute.value = "edit",
        class: [unref(currentRoute) == "edit" ? "active" : "", "btn btn-active-light-primary border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="ki-outline ki-notepad-edit fs-3 me-1"${_scopeId}></i><span class="w-50px"${_scopeId}>Edit</span>`);
          } else {
            return [
              createVNode("i", { class: "ki-outline ki-notepad-edit fs-3 me-1" }),
              createVNode("span", { class: "w-50px" }, "Edit")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="separator separator-dashed my-3"></div>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-3aee2a41.mjs.map
