import { u as useAppSettings } from './appSettings-112ed972.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import currency from 'currency.js';
import '../server.mjs';
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
import './userData-981e93ad.mjs';
import 'axios';
import './cookie-8c768185.mjs';
import 'cookie-es';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tiers",
  __ssrInlineRender: true,
  setup(__props) {
    const tiers = useAppSettings().accountLevels;
    const loading = ref(false);
    const form = ref({
      title: "",
      dailyLimit: 0,
      maxBalanceLimit: 0,
      accountLevel: tiers.value.length + 1,
      createdAt: null,
      updatedAt: null,
      id: void 0
    });
    ref({
      title: "",
      dailyLimit: 0,
      maxBalanceLimit: 0,
      accountLevel: tiers.value.length + 1,
      createdAt: null,
      updatedAt: null,
      id: void 0
    });
    ref();
    const money = (amount) => {
      return currency(amount, { symbol: "" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="card-header"><div class="card-title m-0"><h3 class="fw-bold m-0">Setup Available Tiers</h3></div></div><div class="card-body">`);
      if (unref(tiers).length < 1) {
        _push(`<div class="col-12 border d-flex align-items-center justify-content-center rounded h-100px"><span class="fs-2 fw-bold text-muted"> No Tiers Found </span></div>`);
      } else {
        _push(`<div class="row row-cols-1 row-cols-md-2 mb-8"><!--[-->`);
        ssrRenderList(unref(tiers), (tier) => {
          _push(`<div class="col"><div class="${ssrRenderClass([
            unref(form).id === tier.id ? "border-2 border-primary border-dashed" : "",
            "card shadow-lg"
          ])}"><div class="card-header py-0 m-0 position-relative"><div class="d-flex align-items-center m-0"><i class="ki-solid ki-medal-star text-info fs-3x me-2"></i><h3 class="h3 p-0 m-0">${ssrInterpolate(tier.title)}</h3></div><div class="position-absolute top-0 end-0 m-3"><button class="btn btn-primary btn-icon"><i class="ki-solid ki-pencil"></i></button></div></div><div class="card-body m-0"><div class="mb-4 d-flex justify-content-between"><div class="text-muted"> Daily Transaction Limit </div><div class="fw-bold ms-auto text-end">${ssrInterpolate(money(tier.dailyLimit))}</div></div><div class="d-flex justify-content-between"><div class="text-muted"> Maximum Account Balance </div><div class="fw-bold ms-auto text-end">${ssrInterpolate(money(tier.maxBalanceLimit))}</div></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="card-footer"><div class="card-title mb-8"><h3 class="fw-bold m-0">Add New Tier</h3></div><form><div class="mb-5"><label class="form-label">Title</label><input${ssrRenderAttr("value", unref(form).title)} type="text" class="form-control" required></div><div class="mb-5"><label class="form-label">Tier Level ( <small class="fs-8 text-warning">this should be in line 1,2,3... where 1 is the smallest</small> )</label><input${ssrRenderAttr("value", unref(form).accountLevel)} type="number" class="form-control" required></div><div class="mb-5"><label class="form-label">Daily limit</label><input${ssrRenderAttr("value", unref(form).dailyLimit)} type="text" class="form-control" required></div><div class="mb-5"><label class="form-label">Max balance limit</label><input${ssrRenderAttr("value", unref(form).maxBalanceLimit)} type="text" class="form-control" required></div><div class="mb-3i d-flex">`);
      if (unref(form).id) {
        _push(`<button type="reset" class="btn btn-secondary me-3"> Clear </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="btn btn-primary w-100">`);
      if (!unref(loading)) {
        _push(`<span>Submit</span>`);
      } else {
        _push(`<span class="spinner-border spinner-border-sm"></span>`);
      }
      _push(`</button></div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings/tiers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tiers-860f3762.mjs.map
