import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { _ as __nuxt_component_0 } from './NFTexLogo-b1aa70f7.mjs';
import { _ as __nuxt_component_1 } from './nuxt-link-78f9c8c3.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { u as useSeoMeta } from './index-2fc80598.mjs';
import { d as useHead, u as useRuntimeConfig } from '../server.mjs';
import { a as useAuth } from './userData-981e93ad.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
import '@unhead/shared';
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import 'axios';
import './cookie-8c768185.mjs';
import 'cookie-es';

const _imports_0 = "" + publicAssetsURL("assets/media/illustrations/sketchy-1/4.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sign-up",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      script: [
        { src: "/assets/js/custom/authentication/sign-up/general.js" }
      ]
    });
    useSeoMeta({
      title: `Sign Up - ${useRuntimeConfig().public.APP}`
    });
    const appConfig = /* @__PURE__ */ useRuntimeConfig();
    useAuth();
    ref();
    const emailExists = ref();
    ref({
      method: "post",
      data: {},
      url: `${appConfig.public.BE_API}/auth/register`
    });
    const form = ref({
      name: null,
      email: null,
      imgUrl: null,
      phone: null,
      address: null,
      city: null,
      country: null,
      dob: null,
      password: null,
      confirmPassword: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NFTexLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex flex-column flex-lg-row flex-column-fluid" }, _attrs))}><div class="pt-8 w-lg-50 bgi-size-cover bgi-position-center"><div class="d-flex flex-column flex-center p-6 w-100">`);
      _push(ssrRenderComponent(_component_NFTexLogo, { classes: "h-60px" }, null, _parent));
      _push(`<img class="d-none d-lg-block mx-auto w-300px w-lg-75 w-xl-400px mb-10"${ssrRenderAttr("src", _imports_0)} alt=""><h1 class="d-none d-lg-block text-white fs-2qx fw-bold text-center mb-7"> Welcome To ${ssrInterpolate(_ctx.$config.public.APP)}! </h1></div></div><div class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10"><div class="d-flex flex-center flex-column flex-lg-row-fluid"><div class="card w-lg-500px p-md-10"><div class="card-body"><form autocomplete="on" class="form w-100" novalidate id="kt_sign_up_form"><div class="text-center mb-11"><h1 class="text-dark fw-bolder mb-3"> Sign Up </h1><div class="text-gray-500 fw-semibold fs-6 d-none"> Your Social Campaigns </div></div><div class="separator separator-content my-14"></div><div class="fv-row mb-8"><input type="text" placeholder="Full name" name="name" class="form-control bg-transparent"${ssrRenderAttr("value", unref(form).name)} required></div><div class="fv-row mb-8"><input type="email" placeholder="Email" name="email" autocomplete="on" class="form-control bg-transparent"${ssrRenderAttr("value", unref(form).email)} required>`);
      if (unref(emailExists)) {
        _push(`<div class="text-danger fs-sm mt-3">${ssrInterpolate(unref(emailExists))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="fv-row mb-8"><input type="text" placeholder="Phone" name="phone" class="form-control bg-transparent" required${ssrRenderAttr("value", unref(form).phone)}></div><div class="fv-row mb-8"><input type="text" placeholder="Address" name="address" class="form-control bg-transparent" required${ssrRenderAttr("value", unref(form).address)}></div><div class="fv-row mb-8"><input type="text" placeholder="City" name="city" class="form-control bg-transparent" required${ssrRenderAttr("value", unref(form).city)}></div><div class="fv-row mb-8"><input type="text" placeholder="Country" name="country" class="form-control bg-transparent" required${ssrRenderAttr("value", unref(form).country)}></div><div class="fv-row mb-8" data-kt-password-meter="true"><div class="mb-1"><div class="position-relative mb-3"><input class="form-control bg-transparent" type="password" placeholder="Password" name="password" autocomplete="off"${ssrRenderAttr("value", unref(form).password)} required><span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility"><i class="ki-outline ki-eye-slash fs-2"></i><i class="ki-outline ki-eye fs-2 d-none"></i></span></div><div class="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight"><div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div><div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div><div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div><div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div></div></div><div class="text-muted"> Use 8 or more characters with a mix of letters, numbers &amp; symbols. </div></div><div class="fv-row mb-8"><input required placeholder="Repeat Password" name="confirm-password" type="password" autocomplete="off" class="form-control bg-transparent"${ssrRenderAttr("value", unref(form).confirmPassword)}></div><div class="fv-row mb-8"><label class="form-check form-check-inline"><input class="form-check-input" type="checkbox" name="toc" value="1" required><span class="form-check-label fw-semibold text-gray-700 fs-base ms-1"> I Accept the <a href="#" class="ms-1 link-primary">Terms</a></span></label></div><div class="d-grid mb-10"><button type="submit" id="kt_sign_up_submit" class="btn btn-primary"><span class="indicator-label"> Sign up</span><span class="indicator-progress"> Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span></button></div><div class="text-gray-500 text-center fw-semibold fs-6"> Already have an Account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "sign-in",
        class: "link-primary fw-semibold"
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
      _push(`</div></form></div></div></div><div class="d-flex flex-center d-none flex-wrap px-5"><div class="d-flex fw-semibold text-primary fs-base"><a href="https://keenthemes.com/" class="px-5" target="_blank">Terms</a><a href="https://devs.keenthemes.com/" class="px-5" target="_blank">Plans</a><a href="https://themes.getbootstrap.com/product/keen-the-ultimate-bootstrap-admin-theme/" class="px-5" target="_blank">Contact Us</a></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sign-up.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sign-up-8b7b8a15.mjs.map
