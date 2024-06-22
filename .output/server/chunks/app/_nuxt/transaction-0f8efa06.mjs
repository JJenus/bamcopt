import { u as useRuntimeConfig, a as useRoute } from '../server.mjs';
import { u as useSeoMeta } from './index-2fc80598.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import currency from 'currency.js';
import moment from 'moment';
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

const currentPage = "Transaction";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transaction",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig().public;
    useSeoMeta({
      title: `${currentPage} - ${config.APP}`
    });
    const route = useRoute();
    const transactionId = ref();
    if (route.query["id"]) {
      transactionId.value = route.query["id"];
    }
    const showReceipt = ref(false);
    const loading = ref(false);
    const transaction = ref();
    const money = (amount) => {
      return currency(amount, { symbol: "" }).format();
    };
    const isActive = (status, level) => {
      if (status === "completed") {
        return true;
      } else if (status === "awaiting" && (level === "processing" || level === "awaiting")) {
        return true;
      } else if (status === "processing" && (level === "awaiting" || level === "completed")) {
        return false;
      } else {
        return false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kd-flex flex-column flex-column-fluid" }, _attrs))}><div id="kt_app_content" class="app-content flex-column-fluid"><div id="kt_app_content_container" class="app-container container-fluid d-flex flex-column align-items-center justify-content-center min-h-500px pt-10 pt-md-15 pt-lg-5">`);
      if (!unref(showReceipt)) {
        _push(`<div><h1 class="mb-8">Track Transaction Progress</h1>`);
        if (!unref(loading)) {
          _push(`<form><div class="mb-5"><input class="form-control form-control-lg" type="text" placeholder="Enter transaction ID"${ssrRenderAttr("value", unref(transactionId))}></div><button type="submit" class="btn btn-primary w-100"> Submit </button></form>`);
        } else {
          _push(`<span class="spinner-border spinner-border-lg"></span>`);
        }
        _push(`</div>`);
      } else if (unref(transaction)) {
        _push(`<div class="d-flex flex-column align-items-center justify-content-center"><div class="fs-2"> To ${ssrInterpolate(unref(transaction).beneficiary.name)}</div><div class="fs-3x fw-bold mb-5"> $${ssrInterpolate(money(unref(transaction).amount))}</div><div class="d-flex justify-content-between mb-5"><div class="d-flex flex-column justify-content-center align-items-center"><div class="${ssrRenderClass([
          unref(transaction).status === "processing" ? "animate__animated animate__infinite animate__delay-2s animate__pulse" : "",
          "mb-3"
        ])}"><button class="${ssrRenderClass([
          isActive(
            unref(transaction).status,
            "processing"
          ) ? "btn-success btn-active-success rounded-circle" : "btn-light-primary btn-active-light-primary",
          "btn btn-icon w-40px h-40px"
        ])}"><i class="${ssrRenderClass([
          isActive(
            unref(transaction).status,
            "processing"
          ) ? "ki-solid ki-check" : "ki-solid ki-loading",
          "fs-2x fw-bold"
        ])}"></i></button></div><div class="text-center w-100"><span class="text-center fw-bold fs-4">Processing</span></div></div><div class="${ssrRenderClass([
          isActive(unref(transaction).status, "awaiting") ? "border-success" : "border-primary",
          "border-top border-2 w-20px w-md-50px w-lg-100px h-0px mt-5"
        ])}"></div><div class="d-flex flex-column justify-content-center align-items-center"><div class="${ssrRenderClass([
          unref(transaction).status === "awaiting" ? "animate__animated animate__infinite animate__delay-2s animate__pulse" : "",
          "mb-3"
        ])}"><button class="${ssrRenderClass([
          isActive(unref(transaction).status, "awaiting") ? "btn-success btn-active-success rounded-circle" : "btn-light-primary btn-active-light-primary",
          "btn btn-icon w-40px h-40px"
        ])}"><i class="${ssrRenderClass([
          isActive(
            unref(transaction).status,
            "awaiting"
          ) ? "ki-solid ki-check" : "ki-solid ki-loading",
          "fs-2x fw-bold"
        ])}"></i></button></div><div class="text-center w-100"><span class="text-center fw-bold fs-4">Sent To Bank</span></div></div><div class="${ssrRenderClass([
          isActive(unref(transaction).status, "completed") ? "border-success" : "border-primary",
          "border-top border-2 w-20px w-md-50px w-lg-100px h-0px mt-5"
        ])}"></div><div class="d-flex flex-column justify-content-center align-items-center"><div class="${ssrRenderClass([
          unref(transaction).status === "completed" ? "animate__animated animate__infinite animate__delay-2s animate__pulse" : "",
          "mb-3"
        ])}"><button class="${ssrRenderClass([
          isActive(
            unref(transaction).status,
            "completed"
          ) ? "btn-success btn-active-success rounded-circle" : "btn-light-primary btn-active-light-primary",
          "btn btn-icon w-40px h-40px"
        ])}"><i class="${ssrRenderClass([
          isActive(
            unref(transaction).status,
            "completed"
          ) ? "ki-solid ki-check" : "ki-solid ki-loading",
          "fs-2x fw-bold"
        ])}"></i></button></div><div class="text-center w-100"><span class="text-center fw-bold fs-4"> Completed </span></div></div></div><div class="card bg-gray-100 mb-4"><div class="card-body pb-4 fw-bold"><p>${ssrInterpolate(unref(transaction).notes)}</p></div></div><div class="card w-100 w-lg-500px"><div class="card-body pb-4 fw-bold"><table class="table table-borderless"><tbody><tr><td class="fw-bold text-muted"> Recipient Name </td><td class="fw-bold text-end">${ssrInterpolate(unref(transaction).beneficiary.name)}</td></tr><tr><td class="fw-bold text-muted">Bank</td><td class="fw-bold text-end">${ssrInterpolate(unref(transaction).beneficiary.bank)}</td></tr><tr><td class="fw-bold text-muted"> Account ID </td><td class="fw-bold text-end">${ssrInterpolate(unref(transaction).beneficiary.destinationAccount)}</td></tr><tr><td class="fw-bold text-muted"> Transaction ID </td><td class="fw-bold text-end">${ssrInterpolate(unref(transaction).transactionId)}</td></tr><tr><td colspan="2" class="text-center">${ssrInterpolate(unref(moment)(
          unref(transaction).createdAt
        ).format("lll"))}</td></tr></tbody></table></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/track/transaction.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transaction-0f8efa06.mjs.map
