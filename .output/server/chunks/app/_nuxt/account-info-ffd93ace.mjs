import { u as userData } from './userData-981e93ad.mjs';
import { u as useAppSettings } from './appSettings-112ed972.mjs';
import { useSSRContext, defineComponent, unref, ref, mergeProps } from 'vue';
import { u as useRuntimeConfig } from '../server.mjs';
import { u as useSeoMeta } from './index-2fc80598.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import currency from 'currency.js';
import 'axios';
import './cookie-8c768185.mjs';
import 'cookie-es';
import 'h3';
import 'destr';
import 'ohash';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'ufo';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';
import 'http-graceful-shutdown';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UpgradeAccount",
  __ssrInlineRender: true,
  setup(__props) {
    const user = userData().data;
    user.value.account = userData().account.value;
    const accountLevel = userData().account.value.accountLevel;
    const accountLevels = useAppSettings().accountLevels;
    if (userData().users.value.length === 0) {
      userData().getUsers();
    }
    const tiers = accountLevels.value;
    console.log(user.value.account);
    ref(true);
    const CONFIG = useRuntimeConfig().public;
    useSeoMeta({
      title: `${CONFIG.APP} - Deploy Collection`
    });
    const loading = ref(false);
    ref();
    const imageUrl = ref();
    const form = ref({ ...user.value });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "modal fade",
        id: "upgrade-account",
        tabindex: "-1",
        "aria-labelledby": "upgrade-account",
        "aria-hidden": "true"
      }, _attrs))} data-v-2ddb98a7><div class="modal-dialog modal-dialog-centered" data-v-2ddb98a7><div class="modal-content" data-v-2ddb98a7><div class="modal-body position-relative" data-v-2ddb98a7><div class="position-absolute end-0 top-0 m-3" data-v-2ddb98a7><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-2ddb98a7></button></div>`);
      if (!unref(user).idUrl) {
        _push(`<div class="" data-v-2ddb98a7><h1 class="mb-5 text-center" data-v-2ddb98a7>Verify Identity</h1><form data-v-2ddb98a7><label for="" class="form-label" data-v-2ddb98a7>Upload ID</label><div class="dropzone overflow-hidden w-100 min-h-200px d-flex align-items-center justify-content-center" id="kt_dropzonejs_nft_collection_studio" data-v-2ddb98a7><input type="file" class="d-none" accept="image/*" data-v-2ddb98a7>`);
        if (unref(imageUrl)) {
          _push(`<img class="w-100"${ssrRenderAttr("src", unref(imageUrl))} alt="" srcset="" data-v-2ddb98a7>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="dz-message needsclick position-absolute" data-v-2ddb98a7><i class="ki-duotone ki-file-up fs-3x text-primary" data-v-2ddb98a7><span class="path1" data-v-2ddb98a7></span><span class="path2" data-v-2ddb98a7></span></i><div class="ms-4" data-v-2ddb98a7><h3 class="fs-5 fw-bold text-gray-900 mb-1" data-v-2ddb98a7> Click to upload. </h3><span class="fs-7 fw-semibold text-gray-500" data-v-2ddb98a7>Max size: 5mb</span></div></div></div><button class="btn btn-primary mt-5 w-100" data-v-2ddb98a7>`);
        if (!unref(loading)) {
          _push(`<span data-v-2ddb98a7>Submit</span>`);
        } else {
          _push(`<span class="spinner-border spinner-border-sm" data-v-2ddb98a7></span>`);
        }
        _push(`</button></form></div>`);
      } else {
        _push(`<div class="text-center" data-v-2ddb98a7><h1 class="mb-10 text-center" data-v-2ddb98a7>Upgrade Account</h1>`);
        if (unref(form).account) {
          _push(`<div class="row row-cpls-1 row-cols-md-2 mb-5" data-v-2ddb98a7><!--[-->`);
          ssrRenderList(unref(tiers), (tier) => {
            _push(`<div class="col t-parent" data-v-2ddb98a7><input${ssrIncludeBooleanAttr(
              tier.accountLevel <= unref(accountLevel)
            ) ? " disabled" : ""} type="radio" class="btn-check" name="tier"${ssrRenderAttr("id", "radio_buttons_" + tier.id)}${ssrRenderAttr("value", tier.accountLevel)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).account.accountLevel, tier.accountLevel)) ? " checked" : ""} data-v-2ddb98a7><label class="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center"${ssrRenderAttr("for", "radio_buttons_" + tier.id)} data-v-2ddb98a7><i class="ki-solid ki-medal-star fs-4x me-4" data-v-2ddb98a7></i><span class="d-block fw-semibold text-start" data-v-2ddb98a7><span class="text-gray-900 fw-bold d-block fs-3" data-v-2ddb98a7>${ssrInterpolate(tier.title)}</span>`);
            if (tier.accountLevel <= unref(accountLevel)) {
              _push(`<span class="text-warning fw-semibold fs-6 t-not" data-v-2ddb98a7> Not allowed </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span></label></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="btn btn-primary fw-bold" data-v-2ddb98a7>`);
        if (!unref(loading)) {
          _push(`<span class="" data-v-2ddb98a7>Request upgrade</span>`);
        } else {
          _push(`<span class="spinner-border spinner-border-sm" data-v-2ddb98a7></span>`);
        }
        _push(`</button></div>`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/UpgradeAccount.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2ddb98a7"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "account-info",
  __ssrInlineRender: true,
  setup(__props) {
    userData().data;
    const accountLevel = userData().account.value.accountLevel;
    const tiers = useAppSettings().accountLevels;
    const money = (amount) => {
      return currency(amount, { symbol: "" }).format();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppUpgradeAccount = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="card card-custom border-0 h-md-100 mb-5 mb-lg-10"><div class="card-header border-0 text-center d-flex flex-column fs-6 justify-content-center p-4"><h1 class="text-center h2 pt-4 fw-bold">Account Information</h1><div class="text-muted">View your transaction limits</div><div class="d-flex align-items-center justify-content-center mt-5"><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#upgrade-account"> Upgrade account </button></div></div><div class="card-body ps-xl-15 min-h-400px"><div class="row g-5 row-cols-1"><!--[-->`);
      ssrRenderList(unref(tiers), (tier) => {
        _push(`<div class="col"><div class="${ssrRenderClass([
          unref(accountLevel) === tier.accountLevel ? "card-custom bg-light-primary" : "",
          "card"
        ])}"><div class="card-header py-0 m-0"><div class="d-flex align-items-center m-0"><i class="${ssrRenderClass([
          unref(accountLevel) === tier.accountLevel ? "text-success" : "text-info",
          "ki-solid ki-medal-star fs-3x me-2"
        ])}"></i><h3 class="h3 p-0 m-0">${ssrInterpolate(tier.title)}</h3>`);
        if (unref(accountLevel) === tier.accountLevel) {
          _push(`<span class="badge bg-success ms-3">active</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="card-body m-0"><div class="mb-4 d-flex justify-content-between"><div class="text-muted"> Daily Transaction Limit </div><div class="fw-bold ms-auto text-end">${ssrInterpolate(money(tier.dailyLimit))}</div></div><div class="d-flex justify-content-between"><div class="text-muted"> Maximum Account Balance </div><div class="fw-bold ms-auto text-end">${ssrInterpolate(money(tier.maxBalanceLimit))}</div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
      _push(ssrRenderComponent(_component_AppUpgradeAccount, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/account-info.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=account-info-ffd93ace.mjs.map
