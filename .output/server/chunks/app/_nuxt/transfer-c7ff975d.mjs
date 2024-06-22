import { useSSRContext, defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode } from 'vue';
import { e as useState } from '../server.mjs';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import currency from 'currency.js';
import { _ as __nuxt_component_1 } from './nuxt-link-78f9c8c3.mjs';
import { u as userData } from './userData-981e93ad.mjs';
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
import 'axios';
import './cookie-8c768185.mjs';
import 'cookie-es';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ToElisa",
  __ssrInlineRender: true,
  props: {
    amount: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const recipient = useState("transfer-recipient");
    const userFound = useState(
      "transfer-recipient-found",
      () => ""
    );
    const searching = ref(false);
    const getBAmount = () => {
      let cAmount = props.amount || 0;
      const amount = currency(cAmount, {
        symbol: ""
      }).format();
      return amount;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-5"><input${ssrRenderAttr("value", unref(recipient).email)} name="email" type="text" placeholder="Enter email: jon@gmail.com" class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"><div class="${ssrRenderClass([!unref(userFound) ? "text-danger" : "", "text-end pe-3 fs-1"])}">`);
      if (unref(searching)) {
        _push(`<span class="spinner-border spinner-border-sm text-muted"></span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(userFound) === false && !unref(searching)) {
        _push(`<span class="fs-sm">User doesn&#39;t exist</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(userFound)) {
        _push(`<div style="${ssrRenderStyle({ "margin-bottom": "15px" })}" bis_skin_checked="1"><h3 class="mb-3" style="${ssrRenderStyle({ "color": "#181c32" })}">Transfer</h3><div style="${ssrRenderStyle({ "padding-bottom": "9px" })}" bis_skin_checked="1"><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "color": "#7e8299", "font-size": "14px", "font-weight": "500", "margin-bottom": "8px" })}" bis_skin_checked="1"><div style="${ssrRenderStyle({ "font-family": "Arial, Helvetica, sans-serif" })}" bis_skin_checked="1"> Amount </div><div class="text-end fw-bold" style="${ssrRenderStyle({ "font-family": "Arial, Helvetica, sans-serif" })}" bis_skin_checked="1"> $${ssrInterpolate(getBAmount())}</div></div><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "color": "#7e8299", "font-size": "14px", "font-weight": "500" })}" bis_skin_checked="1"><div style="${ssrRenderStyle({ "font-family": "Arial, Helvetica, sans-serif" })}" bis_skin_checked="1"> To: </div><div class="text-end" style="${ssrRenderStyle({ "font-family": "Arial, Helvetica, sans-serif" })}" bis_skin_checked="1">${ssrInterpolate(unref(recipient).name)} <div class="fw-bold">${ssrInterpolate(unref(recipient).email)}</div></div></div><div class="separator separator-dashed" style="${ssrRenderStyle({ "margin": "15px 0" })}" bis_skin_checked="1"></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/transaction/ToElisa.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ToBank",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useState("transaction-form");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "row row-cols-1 row-cols-lg-2 g-4" }, _attrs))}><div class="col"><input${ssrRenderAttr("value", unref(form).beneficiary.bank)} name="bank_name" type="text" placeholder="Bank Name" class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"></div><div class="col"><input required${ssrRenderAttr("value", unref(form).beneficiary.name)} name="account_holder_name" type="text" placeholder="Account Holder Name" class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"></div><div class="col"><input required${ssrRenderAttr("value", unref(form).beneficiary.destinationAccount)} name="account_number" type="text" placeholder="Account Number" class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"></div><div class="col"><input name="routing_number" type="text" placeholder="Routing Number (optional)" class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"><div class="text-end d-none pe-3 fs-1"><span class="fs-sm text-muted">Required only if the receiving bank requires it</span></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/transaction/ToBank.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transfer",
  __ssrInlineRender: true,
  setup(__props) {
    ref();
    ref();
    userData().account;
    const next = ref(false);
    const active = ref(true);
    const transaction = useState("transaction-form");
    const form = ref({
      amount: ""
    });
    ref();
    const buttons = [
      {
        num: 1
      },
      {
        num: 2
      },
      {
        num: 3
      },
      {
        num: 4
      },
      {
        num: 5
      },
      {
        num: 6
      },
      {
        num: 7
      },
      {
        num: 8
      },
      {
        num: 9
      },
      {
        num: "."
      },
      {
        num: 0
      }
    ];
    ref(false);
    const recipientIni = ref({
      id: "",
      name: "",
      email: ""
    });
    useState(
      "transfer-recipient",
      () => recipientIni.value
    );
    const userFound = useState(
      "transfer-recipient-found",
      () => ""
    );
    function areAllValuesSet(beneficiary) {
      for (const key in beneficiary) {
        if (key !== "id" && key !== "userId" && !beneficiary[key]) {
          return true;
        }
      }
      return false;
    }
    const disableSend = () => {
      if (active.value && !userFound.value) {
        return true;
      } else if (!active.value)
        return areAllValuesSet(transaction.value.beneficiary);
      return false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppTransactionToElisa = _sfc_main$2;
      const _component_AppTransactionToBank = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card-flush card-custom border-0 h-md-100 mb-5 mb-lg-10" }, _attrs))}><div class="card-header text-center d-flex justify-content-center p-4"><h1 class="text-center h2 pt-4 fw-bold">Transfer</h1></div><div class="card-body"><form class="px-5 px-md-0 px-xl-15"><div class="mb-5"><input${ssrIncludeBooleanAttr(unref(next)) ? " disabled" : ""} type="text" placeholder="0" class="form-control disabled money-input fs-2 form-control-lg text-center fw-bold form-control-solid"></div>`);
      if (unref(next)) {
        _push(`<div class="mb-8 min-h-250px"><div class="d-flex flex-center flex-row mb-5 gap-2"><button class="${ssrRenderClass([unref(active) ? "active" : "", "btn px-0 w-100 btn-light-primary btn-active-light-info fw-semibold"])}" type="button"><i class="ki-solid ki-dollar fs-3"></i> To ${ssrInterpolate(_ctx.$config.public.APP)}</button><button class="${ssrRenderClass([!unref(active) ? "active" : "", "btn w-75 btn-light-primary h-100 btn-active-light-info fw-semibold"])}" type="button"><i class="ki-solid ki-bank fs-3"></i> Banks </button></div>`);
        if (unref(active)) {
          _push(ssrRenderComponent(_component_AppTransactionToElisa, {
            amount: unref(form).amount
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_AppTransactionToBank, null, null, _parent));
        }
        _push(`</div>`);
      } else {
        _push(`<div><div class="d-flex flex-row mb-8 justify-content-end w-100 d-none"><button type="button" class="btn btn-sm btn-light-primary fw-semibold me-2"><i class="ki-solid ki-dollar"></i> Request payment </button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/app/scan",
          class: "btn btn-sm btn-light-warning fw-semibold me-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="ki-duotone ki-scan-barcode"${_scopeId}><i class="path1"${_scopeId}></i><i class="path2"${_scopeId}></i><i class="path3"${_scopeId}></i><i class="path4"${_scopeId}></i><i class="path5"${_scopeId}></i><i class="path6"${_scopeId}></i><i class="path7"${_scopeId}></i><i class="path8"${_scopeId}></i></i> Scan `);
            } else {
              return [
                createVNode("i", { class: "ki-duotone ki-scan-barcode" }, [
                  createVNode("i", { class: "path1" }),
                  createVNode("i", { class: "path2" }),
                  createVNode("i", { class: "path3" }),
                  createVNode("i", { class: "path4" }),
                  createVNode("i", { class: "path5" }),
                  createVNode("i", { class: "path6" }),
                  createVNode("i", { class: "path7" }),
                  createVNode("i", { class: "path8" })
                ]),
                createTextVNode(" Scan ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="row flex-row row-cols-3 justify-content-end"><!--[-->`);
        ssrRenderList(buttons, (btn) => {
          _push(`<div class="col justify-content-center d-flex mb-4"><button type="button" class="btn btn-active-light-primary p-0 btn-icon fw-bold fs-2">${ssrInterpolate(btn.num)}</button></div>`);
        });
        _push(`<!--]--><div class="col justify-content-center d-flex mb-4"><button type="button" class="btn btn-active-light-danger btn-icon-danger btn-icon fw-bold fs-2"><i class="ki-solid ki-arrow-left fs-2x fw-bold"></i></button></div></div></div>`);
      }
      _push(`<div class="${ssrRenderClass([unref(next) ? "d-flex flex-row" : "", "mt-4"])}">`);
      if (unref(next)) {
        _push(`<button class="btn btn-light-primary me-3"> Back </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button${ssrIncludeBooleanAttr(unref(next) && disableSend()) ? " disabled" : ""} type="submit" class="btn btn-primary btn-icon fw-bold fs-2 w-100"><span class="indicator-label">`);
      if (unref(next)) {
        _push(`<span>Submit</span>`);
      } else {
        _push(`<span>Next</span>`);
      }
      _push(`</span><span class="indicator-progress"> Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span></button></div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/transfer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transfer-c7ff975d.mjs.map
