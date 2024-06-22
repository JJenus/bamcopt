import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { _ as __nuxt_component_1 } from './nuxt-link-78f9c8c3.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { d as useHead, a as useRoute } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import 'vue-bundle-renderer/runtime';
import 'h3';
import 'devalue';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';
import 'http-graceful-shutdown';
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';

const _imports_0 = "" + publicAssetsURL("assets/media/auth/password-changed.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new-password",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      script: [
        {
          src: "/assets/js/custom/authentication/reset-password/new-password.js"
        }
      ]
    });
    ref();
    const id = useRoute().query["token"];
    const form = ref({
      id,
      password: "",
      cPassword: ""
    });
    console.log(id);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ZipayLogo = resolveComponent("ZipayLogo");
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex card flex-column flex-root border" }, _attrs))}><div class="d-flex card-body flex-column flex-lg-row flex-column-fluid"><div class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center"><div class="d-flex flex-column flex-center p-6 p-lg-10 w-100">`);
      _push(ssrRenderComponent(_component_ZipayLogo, {
        classes: "h-40px h-lg-60px",
        "app-class": "logo-color d-block"
      }, null, _parent));
      _push(`<img class="d-none d-lg-block mx-auto w-300px w-lg-75 w-xl-500px mb-10 mb-lg-20"${ssrRenderAttr("src", _imports_0)} alt=""><h1 class="d-none d-lg-block text-white fs-2qx fw-bold text-center mb-7"> Forgot your password? No worries! </h1></div></div><div class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10"><div class="d-flex flex-center flex-column flex-lg-row-fluid"><div class="card w-lg-500px p-md-10"><div class="card-body"><form class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework" novalidate id="kt_new_password_form"><div class="text-center mb-10" bis_skin_checked="1"><h1 class="text-dark fw-bolder mb-3"> Setup New Password </h1><div class="text-gray-500 fw-semibold fs-6" bis_skin_checked="1"> Have you already reset the password ? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/sign-in",
        class: "link-primary fw-bold",
        bis_skin_checked: "1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign in `);
          } else {
            return [
              createTextVNode(" Sign in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="fv-row mb-8 fv-plugins-icon-container" data-kt-password-meter="true" bis_skin_checked="1"><div class="mb-1" bis_skin_checked="1"><div class="position-relative mb-3" bis_skin_checked="1"><input class="form-control bg-transparent" type="password" placeholder="Password" name="password" autocomplete="off"${ssrRenderAttr("value", unref(form).password)}><span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility"><i class="ki-outline ki-eye-slash fs-2"></i><i class="ki-outline ki-eye fs-2 d-none"></i></span></div><div class="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight" bis_skin_checked="1"><div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" bis_skin_checked="1"></div><div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" bis_skin_checked="1"></div><div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" bis_skin_checked="1"></div><div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px" bis_skin_checked="1"></div></div></div><div class="text-muted" bis_skin_checked="1"> Use 8 or more characters with a mix of letters, numbers &amp; symbols. </div><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" bis_skin_checked="1"></div></div><div class="fv-row mb-8 fv-plugins-icon-container" bis_skin_checked="1"><input type="password" placeholder="Repeat Password" name="confirm-password" autocomplete="off" class="form-control bg-transparent"${ssrRenderAttr("value", unref(form).cPassword)}><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" bis_skin_checked="1"></div></div><div class="fv-row d-none mb-8 fv-plugins-icon-container" bis_skin_checked="1"><label class="form-check form-check-inline"><input class="form-check-input" type="checkbox" name="toc" value="1" checked><span class="form-check-label fw-semibold text-gray-700 fs-6 ms-1"> I Agree &amp; <a href="#" class="ms-1 link-primary">Terms and conditions</a>. </span></label><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" bis_skin_checked="1"></div></div><div class="d-grid mb-10" bis_skin_checked="1"><button type="submit" id="kt_new_password_submit" class="btn btn-primary"><span class="indicator-label"> Submit</span><span class="indicator-progress"> Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span></button></div></form></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/new-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-password-40e59338.mjs.map
