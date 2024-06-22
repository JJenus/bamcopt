import { _ as __nuxt_component_1 } from './nuxt-link-78f9c8c3.mjs';
import { u as userData } from './userData-981e93ad.mjs';
import { u as useAppSettings } from './appSettings-112ed972.mjs';
import { useSSRContext, unref, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
import currency from 'currency.js';

const _sfc_main = {
  __name: "Balance",
  __ssrInlineRender: true,
  setup(__props) {
    const balance = userData().account;
    const tiers = useAppSettings().accountLevels;
    const getBalance = () => {
      let cAmount = balance.value.amount || 0;
      const amount = currency(cAmount, {
        symbol: ""
      }).format();
      return amount;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="card-title mb-7 d-none d-lg-block"><span class="widget-title fw-bold fs-4"> My Balance <i class="ki-outline ki-question-2 fs-3 text-primary ms-1"></i></span></div><div class="d-flex align-items-center fw-bold mb-3"><i class="ki-solid ki-medal-star text-info fs-1"></i><!--[-->`);
      ssrRenderList(unref(tiers), (tier) => {
        _push(`<span>`);
        if (unref(balance).accountLevel === tier.accountLevel) {
          _push(`<span>${ssrInterpolate(tier.title)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      });
      _push(`<!--]--></div><div class="d-flex align-items-center mb-8"><span class="fs-3 fw-semibold text-gray-400 me-1 align-self-start">$</span>`);
      if (unref(balance).amount !== null) {
        _push(`<span class="page-title fs-2tx fw-bold me-2 lh-1 ls-n2">${ssrInterpolate(getBalance())}</span>`);
      } else {
        _push(`<span class="spinner-border spinner-border-sm text-muted"></span>`);
      }
      _push(`</div><div class="mb-8 d-none"><h6 class="text-muted">Account Number</h6><h1 class="fw-bold">${ssrInterpolate(unref(balance).accountNumber)}</h1></div><div class="mb-2 d-flex"><a href="#" class="btn btn-sm btn-danger fw-semibold me-2" style="${ssrRenderStyle({ "background-color": "#ff5d53" })}" data-bs-toggle="modal" data-bs-target="#kt_modal_upgrade_plan"> Add funds </a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/app/transfer",
        class: "btn btn-sm btn-primary fw-semibold me-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Transfer `);
          } else {
            return [
              createTextVNode(" Transfer ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/Balance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main;

export { __nuxt_component_2 as _ };
//# sourceMappingURL=Balance-43915aa5.mjs.map
