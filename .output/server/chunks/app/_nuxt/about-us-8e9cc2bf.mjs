import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { _ as __nuxt_component_1 } from './nuxt-link-78f9c8c3.mjs';
import { u as useRuntimeConfig } from '../server.mjs';
import { u as useSeoMeta } from './index-2fc80598.mjs';
import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0$1 } from './4-428ee221.mjs';
import { _ as _imports_0$2, a as _imports_2, b as _imports_1$1 } from './twitter-9237f9cf.mjs';
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

const _imports_0 = "" + publicAssetsURL("assets/media/svg/illustrations/easy/2-dark.svg");
const _imports_1 = "" + publicAssetsURL("assets/media/svg/illustrations/easy/2.svg");
const currentPage = "About";
const _sfc_main = {
  __name: "about-us",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig().public;
    useSeoMeta({
      title: `${currentPage} - ${config.APP}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex flex-column flex-column-fluid" }, _attrs))}><div id="kt_app_content" class="app-content flex-column-fluid"><div id="kt_app_content_container" class="app-container container-fluid"><div class="mb-6"><div class="card border-0 h-100 bgi-no-repeat bgi-size-cover bgi-position-x-end bg-primary" data-bs-theme="light" style="${ssrRenderStyle({ "background-image": "url('https://www.citigroup.com/rcs/v1/siteIds/citigpa/asset/64bec2480517e6725120d613.jpg')" })}" bis_skin_checked="1"><div class="card-body" bis_skin_checked="1"><div class="row align-items-center h-100" bis_skin_checked="1"><div class="col-7 ps-xl-13" bis_skin_checked="1"><div class="text-white mb-6 pt-6" bis_skin_checked="1"><span class="fs-4 fw-semibold me-2 d-block lh-1 pb-2 opacity-75">Get the best offer</span><span class="fs-3qx d-none text-info d-lg-inline fw-bold display-3">${ssrInterpolate(unref(config).APP)}</span><span class="fs-3qx d-lg-none text-dark fw-bold display-3">${ssrInterpolate(unref(config).APP)}</span></div><span class="fw-semibold text-white fs-6 mb-8 d-block opacity-75"> Providing financial services to enable growth and economic progress. </span><div class="d-flex align-items-center flex-wrap d-grid gap-2 mb-10 mb-xl-20" bis_skin_checked="1"><div class="d-flex align-items-center me-5 me-xl-13" bis_skin_checked="1"><div class="symbol symbol-30px symbol-circle me-3" bis_skin_checked="1"><span class="symbol-label" style="${ssrRenderStyle({ "background": "#35c7ff" })}"><i class="ki-outline ki-abstract-41 fs-5 text-white"></i></span></div><div class="text-white" bis_skin_checked="1"><span class="fw-semibold d-block fs-8 opacity-75">Services</span><span class="fw-bold fs-7">Unlimited</span></div></div><div class="d-flex align-items-center" bis_skin_checked="1"><div class="symbol symbol-30px symbol-circle me-3" bis_skin_checked="1"><span class="symbol-label" style="${ssrRenderStyle({ "background": "#35c7ff" })}"><i class="ki-outline ki-abstract-26 fs-5 text-white"></i></span></div><div class="text-white" bis_skin_checked="1"><span class="fw-semibold opacity-75 d-block fs-8">Transactions</span><span class="fw-bold fs-7">Unlimited</span></div></div></div><div class="d-flex flex-column flex-sm-row d-grid gap-2" bis_skin_checked="1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/sign-up",
        class: "btn btn-success flex-shrink-0 me-lg-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Create Account`);
          } else {
            return [
              createTextVNode("Create Account")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/sign-in",
        class: "btn btn-primary flex-shrink-0",
        style: { "background": "rgba(\n													255,\n													255,\n													255,\n													0.2\n												)" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign In`);
          } else {
            return [
              createTextVNode("Sign In")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="col-5 pt-10" bis_skin_checked="1"></div></div></div></div></div><div class="d-flex flex-column flex-xl-row"><div class="card bg-body mb-8 mb-xl-0 pb-lg-18"><div class="card-body pb-lg-20"><div class="mb-13"><div class="mb-9"><h3 class="fs-2qx fw-bold text-dark"> About Premium Trust Group </h3><span class="fs-5 fw-semibold text-gray-400"></span></div><div class="overlay mb-11"><div class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-325px" style="${ssrRenderStyle({ "background-image": "url('https://africanmusings.com/wp-content/uploads/2022/12/12-Digital-Banking-Challenges-and-Opportunities-For-the-Banking-Industry-1.png')" })}"></div><div class="overlay-layer card-rounded bg-dark bg-opacity-25">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "contact-us",
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact Us`);
          } else {
            return [
              createTextVNode("Contact Us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "sign-up",
        class: "btn btn-light-primary ms-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Join Us`);
          } else {
            return [
              createTextVNode("Join Us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="fs-5 fw-semibold text-gray-600 mt-4"><p class="mb-8"> We offer a wide range of bank accounts for your banking needs. Need to deposit a check? Send money to a friend? Pay your bills on time? Explore additional account solutions? Our secure digital banking tools make managing your money fast and easy. Bank online, it&#39;s all at your fingertips \u2013 right here, right now. `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "sign-up",
        class: "link-primary pe-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign up`);
          } else {
            return [
              createTextVNode("Sign up")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` (yes, create account in seconds) </p></div></div><div class="m-0"><div class="mb-9"><h1 class="fw-bold text-dark mb-3"> Our services </h1><span class="fs-5 fw-semibold text-muted"> Make financial transactions much easier </span></div><div class="row row-cols-lg-2 g-5"><div class="col"><div class="card h-md-100" dir="ltr" bis_skin_checked="1"><div class="card-body d-flex flex-column flex-center" bis_skin_checked="1"><div class="mb-2" bis_skin_checked="1"><h1 class="fw-semibold text-gray-800 text-center lh-lg"><span class="fw-bolder"> Online Banking </span></h1><div class="py-10 text-center" bis_skin_checked="1"><img src="https://media.istockphoto.com/id/1351373355/vector/online-banking-showing-on-mobile-phone.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=xTd-bloxdTzpZEvX_cc8xQRCvR9ExbzofSizT6GSpng=" class="theme-light-show w-200px" alt=""><img${ssrRenderAttr("src", _imports_0)} class="theme-dark-show w-200px" alt=""></div></div><div class="text-center mb-1" bis_skin_checked="1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "sign-in",
        class: "btn btn-sm btn-primary me-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Try Now `);
          } else {
            return [
              createTextVNode(" Try Now ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="btn btn-sm btn-light" role="button"> Learn More </a></div></div></div></div><div class="col"><div class="card h-md-100" dir="ltr" bis_skin_checked="1"><div class="card-body d-flex flex-column flex-center" bis_skin_checked="1"><div class="mb-2" bis_skin_checked="1"><h1 class="fw-semibold text-gray-800 text-center lh-lg"><span class="fw-bolder"> Current Account </span></h1><div class="py-10 text-center" bis_skin_checked="1"><img${ssrRenderAttr("src", _imports_1)} class="theme-light-show w-200px" alt=""><img${ssrRenderAttr("src", _imports_0)} class="theme-dark-show w-200px" alt=""></div></div><div class="text-center mb-1" bis_skin_checked="1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "sign-in",
        class: "btn btn-sm btn-primary me-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Try Now `);
          } else {
            return [
              createTextVNode(" Try Now ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="btn btn-sm btn-light" role="button"> Learn More </a></div></div></div></div><div class="col"><div class="card h-md-100" dir="ltr" bis_skin_checked="1"><div class="card-body d-flex flex-column flex-center" bis_skin_checked="1"><div class="mb-2" bis_skin_checked="1"><h1 class="fw-semibold text-gray-800 text-center lh-lg"><span class="fw-bolder"> Money Transfer </span></h1><div class="py-10 text-center" bis_skin_checked="1"><img src="https://assets.materialup.com/uploads/6af2ebb0-dfb9-4dd1-bcdc-0ce058646682/preview.jpg" class="theme-light-show w-200px" alt=""><img${ssrRenderAttr("src", _imports_0)} class="theme-dark-show w-200px" alt=""></div></div><div class="text-center mb-1" bis_skin_checked="1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "sign-in",
        class: "btn btn-sm btn-primary me-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Try Now `);
          } else {
            return [
              createTextVNode(" Try Now ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="btn btn-sm btn-light" role="button"> Learn More </a></div></div></div></div></div></div><div class="row align-items-center mb-10 mt-6"><div class="col-lg-7"><div class="mb-5 position-relative z-index-3"><div class="mb-6"><h1 class="fw-bold text-gray-900 fw-bold lh-base"> Business Growth </h1></div><span class="text-gray-700 d-block fw-semibold fs-4 pb-4 lh-lg"> A business strategy is the means by which it sets out to achieve its desired ends. You have ideas, goals, and dreams. We have a culturally diverse, forward thinking team looking for talent like you and make your dream come true. </span></div><div class="d-flex position-relative z-index-3"><div class="me-lg-19 me-7"><div class="text-dark fw-semibold fs-1"><span class="m-0" data-kt-countup="true" data-kt-countup-value="100">0</span> % </div><span class="text-gray-700 d-block fw-semibold fs-4">Satisfication</span></div><div class="me-lg-19 me-7"><div class="text-dark fw-semibold fs-1"><span class="m-0" data-kt-countup="true" data-kt-countup-value="124">0</span> K </div><span class="text-gray-700 d-block fw-semibold fs-4">Customers</span></div><div class="me-lg-19 me-7"><div class="text-dark fw-semibold fs-1"><span class="m-0" data-kt-countup="true" data-kt-countup-value="24" data-kt-countup-prefix="$">0</span> K </div><span class="text-gray-700 d-block fw-semibold fs-4">Transactions</span></div></div></div><div class="col-lg-5"><img${ssrRenderAttr("src", _imports_0$1)} class="w-175px mb-10" alt=""><div class="ps-13"></div></div></div><div class="card border-0 bg-light text-center"><div class="card-body py-8"><a href="#" class="mx-4"><img${ssrRenderAttr("src", _imports_0$2)} class="h-30px my-2" alt=""></a><a href="#" class="mx-4"><img${ssrRenderAttr("src", _imports_2)} class="h-30px my-2" alt=""></a><a href="#" class="mx-4"><img${ssrRenderAttr("src", _imports_1$1)} class="h-30px my-2" alt=""></a></div></div></div></div><div class="flex-column flex-lg-row-auto w-100 w-xl-350px ms-xl-5"><div class="card card-flush mb-6" bis_skin_checked="1"><div class="card-body" bis_skin_checked="1"><div class="position-relative" bis_skin_checked="1"><div class="row g-3 g-lg-6" bis_skin_checked="1"><div class="col-6" bis_skin_checked="1"><div class="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" bis_skin_checked="1"><div class="symbol symbol-30px me-5 mb-8" bis_skin_checked="1"><span class="symbol-label"><i class="ki-outline ki-flask fs-1 text-primary"></i></span></div><div class="m-0" bis_skin_checked="1"><span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">100%</span><span class="text-gray-500 fw-semibold fs-6">Balanced Investments</span></div></div></div><div class="col-6" bis_skin_checked="1"><div class="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" bis_skin_checked="1"><div class="symbol symbol-30px me-5 mb-8" bis_skin_checked="1"><span class="symbol-label"><i class="ki-outline ki-bank fs-1 text-primary"></i></span></div><div class="m-0" bis_skin_checked="1"><span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">100%</span><span class="text-gray-500 fw-semibold fs-6">Accessible</span></div></div></div><div class="col-6" bis_skin_checked="1"><div class="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" bis_skin_checked="1"><div class="symbol symbol-30px me-5 mb-8" bis_skin_checked="1"><span class="symbol-label"><i class="ki-outline ki-award fs-1 text-primary"></i></span></div><div class="m-0" bis_skin_checked="1"><span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">4.8</span><span class="text-gray-500 fw-semibold fs-6">Avg. Score</span></div></div></div><div class="col-6" bis_skin_checked="1"><div class="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" bis_skin_checked="1"><div class="symbol symbol-30px me-5 mb-8" bis_skin_checked="1"><span class="symbol-label"><i class="ki-outline ki-timer fs-1 text-primary"></i></span></div><div class="m-0" bis_skin_checked="1"><span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">24/7</span><span class="text-gray-500 fw-semibold fs-6">Availability</span></div></div></div></div></div></div></div><div class="card card-flush bg-body"><div class="card-header"><h4 class="card-title fw-bold text-text-gray-800 fs-2"> Stay Connected </h4></div><div class="card-body pt-2"><div class="mb-6"><a href="#" class="mb-6"><img${ssrRenderAttr("src", _imports_0$2)} class="h-20px me-2" alt=""><span class="text-gray-700 text-hover-primary fs-5 mb-6">Facebook</span></a></div><div class="mb-6"><a href="#" class="mb-6"><img${ssrRenderAttr("src", _imports_1$1)} class="h-20px me-2" alt=""><span class="text-gray-700 text-hover-primary fs-5 mb-6">Twitter</span></a></div><div class=""><a href="#" class="mb-6"><img${ssrRenderAttr("src", _imports_2)} class="h-20px me-2" alt=""><span class="text-gray-700 text-hover-primary fs-5 mb-6">Instagram</span></a></div></div></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-us-8e9cc2bf.mjs.map
