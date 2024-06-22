import { _ as _sfc_main$1 } from './Entry-09d0fe4c.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { u as userData, a as useAuth } from './userData-981e93ad.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import currency from 'currency.js';
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
import '../server.mjs';
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'sweetalert2';
import 'axios';
import 'moment';
import './cookie-8c768185.mjs';
import 'cookie-es';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transactions",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const transactions = userData().transactions;
    const userId = (_a = useAuth().userData.value) == null ? void 0 : _a.userId;
    const received = ref(0);
    const sent = ref(0);
    const calc = () => {
      received.value = 0;
      sent.value = 0;
      transactions.value.forEach((e) => {
        if (e.receiverId === userId) {
          received.value += e.amount;
        } else {
          sent.value += e.amount;
        }
      });
    };
    calc();
    const getAmount = (cAmount) => {
      cAmount = cAmount || 0;
      const amount = currency(cAmount, {
        symbol: ""
      }).format();
      return amount;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppTransactionEntry = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card-custom border-0 min-h-500px h-md-100 mb-5 mb-lg-10" }, _attrs))}><div class="card-body ps-xl-15"><h1 class="text-center h1 pt-4 fw-bold mb-8">Transactions</h1><div class="d-flex flex-row justify-content-between mb-5"><div><div class="card-title mb-2"><div class="widget-title fw-bold fs-4 d-flex align-items-center"><span>Received</span><i class="ki-duotone ki-double-left fs-1 text-success ms-2"><i class="path1"></i><i class="path2"></i></i></div></div><div class="d-flex align-items-center mb-8"><span class="fs-3 fw-semibold text-gray-400 me-1 align-self-start">$</span><span class="page-title fs-2 fw-bold me-2 lh-1 ls-n2">${ssrInterpolate(getAmount(unref(received)))}</span></div></div><div><div class="card-title mb-2"><div class="widget-title fw-bold fs-4 d-flex align-items-center"><i class="ki-duotone ki-double-right fs-1 text-danger me-2"><i class="path1"></i><i class="path2"></i></i><span>Sent</span></div></div><div class="d-flex align-items-center mb-8"><span class="fs-3 fw-semibold text-gray-400 me-1 align-self-start">$</span><span class="page-title fs-2 fw-bold me-2 lh-1 ls-n2">${ssrInterpolate(getAmount(unref(sent)))}</span></div></div></div><div class="d-nonie"><!--[-->`);
      ssrRenderList(unref(transactions), (transact) => {
        _push(ssrRenderComponent(_component_AppTransactionEntry, {
          showDetails: true,
          transaction: transact
        }, null, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transactions-db2b3cb5.mjs.map
