import { _ as __nuxt_component_1 } from './nuxt-link-78f9c8c3.mjs';
import { u as useRuntimeConfig } from '../server.mjs';
import { u as useSeoMeta } from './index-2fc80598.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
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

const currentPage = "Investments";
const _sfc_main = {
  __name: "investment",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig().public;
    useSeoMeta({
      title: `${currentPage} - ${config.APP}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "kt_app_content",
        class: "app-content flex-column-fluid"
      }, _attrs))}><div id="kt_app_content_container" class="app-container container-fluid"><div class="page-title d-flex flex-column justify-content-center me-3 mb-10"><h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0"> Why Choose Us? </h1><ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"><li class="breadcrumb-item text-muted"><a href="/" class="text-muted text-hover-primary"> Home </a></li><li class="breadcrumb-item"><span class="bullet bg-gray-400 w-5px h-2px"></span></li><li class="breadcrumb-item text-muted">Quality</li><li class="breadcrumb-item"><span class="bullet bg-gray-400 w-5px h-2px"></span></li><li class="breadcrumb-item text-muted">Services</li></ul></div><div class="d-flex flex-column flex-xl-row"><div class="card bg-body flex-row-fluid mb-9 mb-xl-0 me-xl-9"></div><div class="flex-column flex-lg-row-auto w-100"><div class="card card-flush bg-body mb-9"><div class="card-body"><div class="row g-5"><div class="col-lg-5"><div class="mb-12" bis_skin_checked="1"><div class="m-0" bis_skin_checked="1"><h4 class="fs-1 text-gray-800 w-bolder mb-6"> Consider investing with us. </h4><p class="fw-semibold fs-4 text-gray-600 mb-2"> There is no feeling better than knowing your money is safe. </p></div><div class="m-0" bis_skin_checked="1"><div class="d-flex align-items-center collapsible py-3 toggle mb-0 collapsed" data-bs-toggle="collapse" data-bs-target="#kt_job_1_1" bis_skin_checked="1" aria-expanded="false"><div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5" bis_skin_checked="1"><i class="ki-outline ki-minus-square toggle-on text-primary fs-1"></i><i class="ki-outline ki-plus-square toggle-off fs-1"></i></div><h4 class="text-gray-700 fw-bold cursor-pointer mb-0"> We put people first </h4></div><div id="kt_job_1_1" class="fs-6 ms-1 collapse" bis_skin_checked="1" style="${ssrRenderStyle({})}"><div class="mb-4" bis_skin_checked="1"><div class="d-flex align-items-center ps-10 mb-n1" bis_skin_checked="1"><span class="bullet me-3"></span><div class="text-gray-600 fw-semibold fs-6" bis_skin_checked="1"> We are committed to being an ethical partner in your wealth journey. We focus on doing what we believe is best for you and your family\u2019s financial health. </div></div></div></div><div class="separator separator-dashed" bis_skin_checked="1"></div></div><div class="m-0" bis_skin_checked="1"><div class="d-flex align-items-center collapsible py-3 toggle mb-0 collapsed" data-bs-toggle="collapse" data-bs-target="#kt_job_1_2" bis_skin_checked="1" aria-expanded="false"><div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5" bis_skin_checked="1"><i class="ki-outline ki-minus-square toggle-on text-primary fs-1"></i><i class="ki-outline ki-plus-square toggle-off fs-1"></i></div><h4 class="text-gray-700 fw-bold cursor-pointer mb-0"> Flexible investment options </h4></div><div id="kt_job_1_2" class="fs-6 ms-1 collapse" bis_skin_checked="1" style="${ssrRenderStyle({})}"><div class="mb-4" bis_skin_checked="1"><div class="d-flex align-items-center ps-10 mb-n1" bis_skin_checked="1"><span class="bullet me-3"></span><div class="text-gray-600 fw-semibold fs-6" bis_skin_checked="1"> Whether your needs are simple or complex, as a wealth management client you have access to a full spectrum of financial life management services. </div></div></div></div><div class="separator separator-dashed" bis_skin_checked="1"></div></div><div class="m-0" bis_skin_checked="1"><div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_1_3" bis_skin_checked="1"><div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5" bis_skin_checked="1"><i class="ki-outline ki-minus-square toggle-on text-primary fs-1"></i><i class="ki-outline ki-plus-square toggle-off fs-1"></i></div><h4 class="text-gray-700 fw-bold cursor-pointer mb-0"> Decades of experience </h4></div><div id="kt_job_1_3" class="collapse fs-6 ms-1" bis_skin_checked="1"><div class="mb-4" bis_skin_checked="1"><div class="d-flex align-items-center ps-10 mb-n1" bis_skin_checked="1"><span class="bullet me-3"></span><div class="text-gray-600 fw-semibold fs-6" bis_skin_checked="1"> Our years of banking and trust and estate experience, along with Investments\u2019 wealth management expertise, we give you access to guidance from seasoned thought leaders, as well as a vast library of timely insights on financial markets and the economy. </div></div></div></div><div class="separator separator-dashed" bis_skin_checked="1"></div></div><div class="m-0" bis_skin_checked="1"><div class="d-flex align-items-center collapsible py-3 toggle collapsed mb-0" data-bs-toggle="collapse" data-bs-target="#kt_job_1_4" bis_skin_checked="1"><div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5" bis_skin_checked="1"><i class="ki-outline ki-minus-square toggle-on text-primary fs-1"></i><i class="ki-outline ki-plus-square toggle-off fs-1"></i></div><h4 class="text-gray-700 fw-bold cursor-pointer mb-0"> Secure Loan Processs </h4></div><div id="kt_job_1_4" class="collapse fs-6 ms-1" bis_skin_checked="1"><div class="mb-4" bis_skin_checked="1"><div class="d-flex align-items-center ps-10 mb-n1" bis_skin_checked="1"><span class="bullet me-3"></span><div class="text-gray-600 fw-semibold fs-6" bis_skin_checked="1"> Compare various loan options that are right and best suitable for you. </div></div></div></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "sign-up",
        class: "btn btn-sm btn-primary mt-5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign Up `);
          } else {
            return [
              createTextVNode(" Sign Up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="col-lg-7"><div class="overlay" bis_skin_checked="1"><div class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-500px" style="${ssrRenderStyle({ "background-image": "url('/assets/media/stock/1600x800/img-4.jpg')" })}" bis_skin_checked="1"></div></div></div></div></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/investment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=investment-340854ad.mjs.map
