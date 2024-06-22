import { _ as __nuxt_component_0 } from './NFTexLogo-b1aa70f7.mjs';
import { _ as __nuxt_component_1 } from './nuxt-link-78f9c8c3.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref, withCtx, createTextVNode } from 'vue';
import { u as useRuntimeConfig, d as useHead, e as useState } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useSeoMeta } from './index-2fc80598.mjs';
import { a as useAuth } from './userData-981e93ad.mjs';
import { _ as _imports_0 } from './credit-card-1fd372b2.mjs';
import '../../handlers/renderer.mjs';
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
import './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'axios';
import './cookie-8c768185.mjs';
import 'cookie-es';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    useState("forgot");
    const form = ref({
      email: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "d-flex flex-column flex-lg-row-fluid w-lg-50 p-10",
        bis_skin_checked: "1"
      }, _attrs))}><div class="d-flex flex-center flex-column flex-lg-row-fluid" bis_skin_checked="1"><div class="w-lg-500px p-10" bis_skin_checked="1"><form class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework" novalidate id="kt_password_reset_form" action="#"><div class="text-center mb-10" bis_skin_checked="1"><h1 class="text-dark fw-bolder mb-3"> Forgot Password ? </h1><div class="text-gray-500 fw-semibold fs-6" bis_skin_checked="1"> Enter your email to reset your password. <br></div></div><div class="fv-row mb-8 fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid" bis_skin_checked="1"><input type="text" placeholder="Email" name="email" class="form-control bg-transparent"${ssrRenderAttr("value", unref(form).email)}><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" bis_skin_checked="1"><div data-field="email" data-validator="notEmpty" bis_skin_checked="1"> Email address is required. <br><small class="fs-7 text-info">You&#39;ll receive a password reset email if your account exists.</small></div></div></div><div class="d-flex flex-wrap justify-content-center pb-lg-0" bis_skin_checked="1"><button type="submit" id="kt_password_reset_submit" class="btn btn-primary me-4"><span class="indicator-label"> Submit</span><span class="indicator-progress"> Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span></button><a role="button" class="btn btn-light" bis_skin_checked="1">Cancel</a></div></form></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ForgotPassword.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sign-in",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: `Sign in - ${useRuntimeConfig().public.APP}`
    });
    useHead({
      script: [
        { src: "/assets/js/custom/authentication/sign-in/general.js" }
      ]
    });
    const appConfig = /* @__PURE__ */ useRuntimeConfig();
    useAuth();
    const forgot = useState("forgot", () => false);
    ref();
    const isInvalidCredentials = ref();
    ref({
      method: "post",
      data: {},
      url: `${appConfig.public.BE_API}/auth/login`,
      timeout: 15e3
    });
    const form = ref({
      email: null,
      password: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NFTexLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_ForgotPassword = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex card flex-column flex-root border" }, _attrs))}><div class="d-flex card-body flex-column flex-lg-row flex-column-fluid"><div class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center"><div class="d-flex flex-column flex-center p-6 p-lg-10 w-100">`);
      _push(ssrRenderComponent(_component_NFTexLogo, { classes: "h-60px" }, null, _parent));
      _push(`<img class="d-none d-lg-block mx-auto w-300px w-lg-75 w-xl-250px mb-10 mb-lg-20 mt-15"${ssrRenderAttr("src", _imports_0)} alt=""><h1 class="d-none d-lg-block text-white fs-2qx fw-bold text-center mb-7"> Welcome Back </h1></div></div>`);
      if (!unref(forgot)) {
        _push(`<div class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10"><div class="d-flex flex-center flex-column flex-lg-row-fluid"><div class="card w-lg-500px p-md-10"><div class="card-body"><form class="form w-100" novalidate id="kt_sign_in_form"><div class="text-center mb-11"><h1 class="text-dark fw-bolder mb-3"> Sign In </h1></div><div class="separator separator-content my-14"></div><div class="fv-row mb-8"><input type="text" placeholder="Email" name="email" autocomplete="on" class="form-control bg-transparent" required${ssrRenderAttr("value", unref(form).email)}></div><div class="fv-row mb-3"><input type="password" placeholder="Password" name="password" autocomplete="on" class="form-control bg-transparent"${ssrRenderAttr("value", unref(form).password)} required></div>`);
        if (unref(isInvalidCredentials)) {
          _push(`<div class="text-danger fs-sm mt-3 mb-3">${ssrInterpolate(unref(isInvalidCredentials))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8"><div></div><a role="button" class="link-primary"> Forgot Password ? </a></div><div class="d-grid mb-10"><button type="submit" id="kt_sign_in_submit" class="btn btn-primary"><span class="indicator-label"> Sign In</span><span class="indicator-progress"> Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span></button></div><div class="text-gray-500 text-center fw-semibold fs-6"> Not a Member yet? `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/sign-up",
          class: "link-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sign up `);
            } else {
              return [
                createTextVNode(" Sign up ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></form></div></div></div></div>`);
      } else {
        _push(ssrRenderComponent(_component_ForgotPassword, null, null, _parent));
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sign-in.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sign-in-4f2d80ea.mjs.map
