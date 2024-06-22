import { u as useRuntimeConfig } from '../server.mjs';
import { u as useSeoMeta } from './index-2fc80598.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
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

const currentPage = "Our Banking";
const _sfc_main = {
  __name: "banking",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig().public;
    useSeoMeta({
      title: `${currentPage} - ${config.APP}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "kt_app_content",
        class: "app-content flex-column-fluid"
      }, _attrs))}><div id="kt_app_content_container" class="app-container container-fluid"><div class="page-title d-flex flex-column justify-content-center me-3 mb-10"><h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0"> Banking With Ease </h1><ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"><li class="breadcrumb-item text-muted"><a href="/" class="text-muted text-hover-primary"> Home </a></li><li class="breadcrumb-item"><span class="bullet bg-gray-400 w-5px h-2px"></span></li><li class="breadcrumb-item text-muted"> Corporate Banking </li><li class="breadcrumb-item"><span class="bullet bg-gray-400 w-5px h-2px"></span></li><li class="breadcrumb-item text-muted"> Corporate Banking </li></ul></div><div class="d-flex flex-column flex-xl-row"><div class="card bg-body flex-row-fluid mb-9 mb-xl-0 me-xl-9"><div class="card-body"><form action="#" class="form mb-15" method="post" id="kt_contact_form"><div class="d-flex flex-column mb-9 fv-row"><h1 class="fw-bold text-dark mb-7"> Personal Banking </h1><div class="d-flex flex-stack mb-5"><span class="text-gray-400 fs-4 fw-bold">Accessible To All</span></div><span class="fs-4 fw-semibold text-gray-600 d-block"> We are constantly thinking about you! We create accounts tailored to suit your individual needs as a valued customer and are constantly innovating, bringing new products and services to help make banking and life easier for you. </span></div></form></div></div><div class="flex-column flex-lg-row-auto w-100 w-xl-350px"><div class="card card-flush bg-body mb-9"><div class="card-header"><h2 class="card-title fs-2 fw-bold text-dark"> Corporate Banking </h2><div class="card-toolbar"><button type="button" class="btn btn-sm btn-icon btn-color-primary"><i class="ki-outline ki-phone fs-1"></i></button></div></div><div class="card-body pt-2"><div class="d-flex flex-stack mb-5"><span class="text-gray-400 fs-4 fw-bold">Helping Businesses</span></div><span class="text-gray-800 fs-6 fw-semibold d-block mb-9"> At Federal Credit Reserve , we are committed to the development of the real sectors of the economy. We offer a comprehensive portfolio of corporate and commercial banking services in the Energy, Manufacturing, FMCGs, Export &amp; Import, Telecommunications, Agriculture and Public Sectors of the economy amongst others. </span></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/banking.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=banking-16f1a7cd.mjs.map
