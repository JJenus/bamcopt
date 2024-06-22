import { _ as __nuxt_component_0 } from './NFTexLogo-b1aa70f7.mjs';
import { _ as __nuxt_component_1 } from './nuxt-link-78f9c8c3.mjs';
import { u as useRuntimeConfig } from '../server.mjs';
import { u as useSeoMeta } from './index-2fc80598.mjs';
import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './4-428ee221.mjs';
import { _ as _imports_0$1, a as _imports_2, b as _imports_1 } from './twitter-9237f9cf.mjs';
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

const currentPage = "About Us";
const _sfc_main = {
  __name: "about-us",
  __ssrInlineRender: true,
  setup(__props) {
    const CONFIG = useRuntimeConfig().public;
    useSeoMeta({
      title: `${CONFIG.APP} - ${currentPage}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NFTexLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex flex-column flex-xl-row" }, _attrs))}><div class="card border-0 bg-transparent mb-8 mb-xl-0 pb-lg-18"><div class="card-body pb-lg-20"><div class="mb-13"><div class="mb-9"><h3 class="fs-2qx fw-bold text-dark">${ssrInterpolate(unref(CONFIG).APP)}</h3><span class="fs-5 fw-semibold text-gray-400"></span></div><div class="overlay mb-11"><div class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-325px" style="${ssrRenderStyle({ "background-image": "url('/assets/media/auth/bg15.jpg')" })}"></div><div class="overlay-layer card-rounded d-flex flex-column bg-dark bg-opacity-25">`);
      _push(ssrRenderComponent(_component_NFTexLogo, { classes: "h-50px h-lg-100px mb-5" }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact-us",
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact Us `);
          } else {
            return [
              createTextVNode(" Contact Us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="fs-5 fw-semibold text-gray-600 mt-4"><p class="mb-8"> At ${ssrInterpolate(unref(CONFIG).APP)}, we&#39;re committed to revolutionizing the way you bank. Our team of experts has crafted innovative fintech solutions tailored to your needs. With a focus on security, simplicity, and convenience, we&#39;re dedicated to providing you with the best banking experience possible. Discover the ${ssrInterpolate(unref(CONFIG).APP)} Difference Today! </p></div></div><div class="m-0"><div class="mb-9"><h1 class="fw-bold text-dark mb-3">Our services</h1><span class="fs-5 fw-semibold text-muted"> Make financial transactions much easier </span></div><div class="row row-cols-lg-2 g-5"><div class="col"><div class="card h-md-100" dir="ltr" bis_skin_checked="1"><div class="card-body d-flex flex-column flex-center" bis_skin_checked="1"><div class="mb-2" bis_skin_checked="1"><h1 class="fw-semibold text-gray-800 text-center lh-lg"><span class="fw-bolder"> Transfer </span></h1><div class="py-10 text-center" bis_skin_checked="1"><i class="ki-duotone ki-arrow-right-left fs-5x text-success"><span class="path1"></span><span class="path2"></span></i></div></div><div class="text-center mb-1" bis_skin_checked="1"><button data-bs-toggle="modal" data-bs-target="#kt_modal_login" class="btn btn-sm btn-primary me-2"> Try Now </button></div></div></div></div><div class="col"><div class="card h-md-100" dir="ltr" bis_skin_checked="1"><div class="card-body d-flex flex-column flex-center" bis_skin_checked="1"><div class="mb-2" bis_skin_checked="1"><h1 class="fw-semibold text-gray-800 text-center lh-lg"><span class="fw-bolder"> Accept payments </span></h1><div class="py-10 text-center" bis_skin_checked="1"><i class="ki-duotone ki-color-swatch fs-5x text-warning"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span></i></div></div><div class="text-center mb-1" bis_skin_checked="1"><button data-bs-toggle="modal" data-bs-target="#kt_modal_login" class="btn btn-sm btn-primary me-2"> Try Now </button></div></div></div></div><div class="col"><div class="card h-md-100" dir="ltr" bis_skin_checked="1"><div class="card-body d-flex flex-column flex-center" bis_skin_checked="1"><div class="mb-2" bis_skin_checked="1"><h1 class="fw-semibold text-gray-800 text-center lh-lg"><span class="fw-bolder"> Request payment </span></h1><div class="py-10 text-center" bis_skin_checked="1"><i class="fa-solid fa-hand-holding-dollar fs-5x text-danger"></i></div></div><div class="text-center mb-1" bis_skin_checked="1"><button data-bs-toggle="modal" data-bs-target="#kt_modal_login" class="btn btn-sm btn-primary me-2"> Try Now </button></div></div></div></div><div class="col"><div class="card h-md-100" dir="ltr" bis_skin_checked="1"><div class="card-body d-flex flex-column flex-center" bis_skin_checked="1"><div class="mb-2" bis_skin_checked="1"><h1 class="fw-semibold text-gray-800 text-center lh-lg"><span class="fw-bolder"> Manage Your finances </span></h1><div class="py-10 text-center" bis_skin_checked="1"><i class="ki-duotone ki-data fs-5x text-info"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></i></div></div></div></div></div></div></div><div class="row align-items-center mb-10 mt-6"><div class="col-lg-7"><div class="mb-5 position-relative z-index-3"><div class="mb-6"><h1 class="fw-bold text-gray-900 fw-bold lh-base"> Business Growth </h1></div><span class="text-gray-700 d-block fw-semibold fs-4 pb-4 lh-lg"> A business strategy is the means by which it sets out to achieve its desired ends. You have ideas, goals, and dreams. We have a culturally diverse, forward thinking team looking for talent like you and make your dream come true. </span></div><div class="d-flex position-relative z-index-3"><div class="me-lg-19 me-7"><div class="text-dark fw-semibold fs-1"><span class="m-0" data-kt-countup="true" data-kt-countup-value="100">0</span> % </div><span class="text-gray-700 d-block fw-semibold fs-4">Satisfication</span></div><div class="me-lg-19 me-7"><div class="text-dark fw-semibold fs-1"><span class="m-0" data-kt-countup="true" data-kt-countup-value="124">0</span> K </div><span class="text-gray-700 d-block fw-semibold fs-4">Customers</span></div><div class="me-lg-19 me-7"><div class="text-dark fw-semibold fs-1"><span class="m-0" data-kt-countup="true" data-kt-countup-value="24" data-kt-countup-prefix="$">0</span> K </div><span class="text-gray-700 d-block fw-semibold fs-4">Transactions</span></div></div></div><div class="col-lg-5"><img${ssrRenderAttr("src", _imports_0)} class="w-175px mb-10" alt=""><div class="ps-13"></div></div></div><div class="card border-0 bg-light text-center"><div class="card-body py-8"><a href="#" class="mx-4"><img${ssrRenderAttr("src", _imports_0$1)} class="h-30px my-2" alt=""></a><a href="#" class="mx-4"><img${ssrRenderAttr("src", _imports_2)} class="h-30px my-2" alt=""></a><a href="#" class="mx-4"><img${ssrRenderAttr("src", _imports_1)} class="h-30px my-2" alt=""></a></div></div></div></div><div class="flex-column flex-lg-row-auto w-100 w-xl-350px ms-xl-5"><div class="card card-flush mb-6" bis_skin_checked="1"><div class="card-body" bis_skin_checked="1"><div class="position-relative" bis_skin_checked="1"><div class="row g-3 g-lg-6" bis_skin_checked="1"><div class="col-6" bis_skin_checked="1"><div class="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" bis_skin_checked="1"><div class="symbol symbol-30px me-5 mb-8" bis_skin_checked="1"><span class="symbol-label"><i class="ki-outline ki-flask fs-1 text-primary"></i></span></div><div class="m-0" bis_skin_checked="1"><span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">100%</span><span class="text-gray-500 fw-semibold fs-6">Balanced Investments</span></div></div></div><div class="col-6" bis_skin_checked="1"><div class="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" bis_skin_checked="1"><div class="symbol symbol-30px me-5 mb-8" bis_skin_checked="1"><span class="symbol-label"><i class="ki-outline ki-bank fs-1 text-primary"></i></span></div><div class="m-0" bis_skin_checked="1"><span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">100%</span><span class="text-gray-500 fw-semibold fs-6">Accessible</span></div></div></div><div class="col-6" bis_skin_checked="1"><div class="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" bis_skin_checked="1"><div class="symbol symbol-30px me-5 mb-8" bis_skin_checked="1"><span class="symbol-label"><i class="ki-outline ki-award fs-1 text-primary"></i></span></div><div class="m-0" bis_skin_checked="1"><span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">4.8</span><span class="text-gray-500 fw-semibold fs-6">Avg. Score</span></div></div></div><div class="col-6" bis_skin_checked="1"><div class="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" bis_skin_checked="1"><div class="symbol symbol-30px me-5 mb-8" bis_skin_checked="1"><span class="symbol-label"><i class="ki-outline ki-timer fs-1 text-primary"></i></span></div><div class="m-0" bis_skin_checked="1"><span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">24/7</span><span class="text-gray-500 fw-semibold fs-6">Availability</span></div></div></div></div></div></div></div><div class="card card-flush bg-body"><div class="card-header"><h4 class="card-title fw-bold text-text-gray-800 fs-2"> Stay Connected </h4></div><div class="card-body pt-2"><div class="mb-6"><a href="#" class="mb-6"><img${ssrRenderAttr("src", _imports_0$1)} class="h-20px me-2" alt=""><span class="text-gray-700 text-hover-primary fs-5 mb-6">Facebook</span></a></div><div class="mb-6"><a href="#" class="mb-6"><img${ssrRenderAttr("src", _imports_1)} class="h-20px me-2" alt=""><span class="text-gray-700 text-hover-primary fs-5 mb-6">Twitter</span></a></div><div class=""><a href="#" class="mb-6"><img${ssrRenderAttr("src", _imports_2)} class="h-20px me-2" alt=""><span class="text-gray-700 text-hover-primary fs-5 mb-6">Instagram</span></a></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/resources/about-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-us-ba80ab41.mjs.map
