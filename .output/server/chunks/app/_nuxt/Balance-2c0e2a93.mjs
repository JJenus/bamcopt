import { u as userData } from './userData-981e93ad.mjs';
import { useSSRContext, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import currency from 'currency.js';

const _sfc_main = {
  __name: "Balance",
  __ssrInlineRender: true,
  setup(__props) {
    const balance = userData().account;
    const getBalance = () => {
      let cAmount = balance.value.amount || 0;
      const amount = currency(cAmount, {
        symbol: ""
      }).format();
      return amount;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="card-title mb-7 d-none d-lg-block"><span class="widget-title fw-bold fs-4"> My Balance <i class="ki-outline ki-question-2 fs-3 text-primary ms-1"></i></span></div><div class="d-flex align-items-center mb-8"><span class="fs-3 fw-semibold text-gray-400 me-1 align-self-start">$</span>`);
      if (unref(balance).amount !== null) {
        _push(`<span class="page-title fs-2tx fw-bold me-2 lh-1 ls-n2">${ssrInterpolate(getBalance())}</span>`);
      } else {
        _push(`<span class="spinner-border spinner-border-sm text-muted"></span>`);
      }
      _push(`</div><div class="widget-desc fw-bold mb-8 d-none"><a href="#" class="text-success me-2">+6.72%</a> $835.32 vs Last Week </div><div class="mb-2 d-flex"><a role="button" class="btn btn-sm btn-danger fw-semibold me-2" style="${ssrRenderStyle({ "background-color": "#ff5d53" })}" data-bs-toggle="modal" data-bs-target="#kt_modal_topup_admin"> Top Up Balance </a></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/Balance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main;

export { __nuxt_component_2 as _ };
//# sourceMappingURL=Balance-2c0e2a93.mjs.map
