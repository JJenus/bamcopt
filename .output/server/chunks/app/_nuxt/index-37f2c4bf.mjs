import { u as userData } from './userData-981e93ad.mjs';
import { defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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
import 'axios';
import './cookie-8c768185.mjs';
import 'cookie-es';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const user = userData().data;
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)}><div id="kt_customer_view_details" class="collapse show"><div class="card-body p-9"><div class="row mb-7"><label class="col-sm-4 fw-semibold text-muted">Full Name</label><div class="col-sm-8"><span class="fw-bold fs-6 text-gray-800">${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.name)}</span></div></div><div class="row mb-7"><label class="col-sm-4 fw-semibold text-muted"> Contact Phone <span class="ms-1" data-bs-toggle="tooltip" aria-label="Phone number must be active" data-bs-original-title="Phone number must be active" data-kt-initialized="1"><i class="ki-outline ki-information fs-7"></i></span></label><div class="col-sm-8 d-flex align-items-center"><span class="fw-bold fs-6 text-gray-800 me-2">${ssrInterpolate(unref(user).phone)}</span></div></div><div class="row mb-7"><label class="col-sm-4 fw-semibold text-muted">Email</label><div class="col-sm-8 d-flex align-items-center"><a href="#" class="fw-semibold fs-6 text-gray-800 text-hover-primary me-3">${ssrInterpolate(unref(user).email)}</a>`);
      if (unref(user).emailVerified) {
        _push(`<span class="badge badge-success">Verified</span>`);
      } else {
        _push(`<span class="badge badge-danger">Not verified</span>`);
      }
      _push(`</div></div><div class="row mb-7"><label class="col-sm-4 fw-semibold text-muted"> Country <span class="ms-1" data-bs-toggle="tooltip" aria-label="Country of origination" data-bs-original-title="Country of origination" data-kt-initialized="1"><i class="ki-outline ki-information fs-7"></i></span></label><div class="col-sm-8"><span class="fw-bold fs-6 text-gray-800">${ssrInterpolate(unref(user).country)}</span></div></div><div class="row mb-7"><label class="col-sm-4 fw-semibold text-muted">Communication</label><div class="col-sm-8"><span class="fw-bold fs-6 text-gray-800">Email, Phone</span></div></div><div class="row mb-10"><label class="col-sm-4 fw-semibold text-muted">Allow Changes</label><div class="col-sm-8"><span class="fw-semibold fs-6 text-gray-800">Yes</span></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-37f2c4bf.mjs.map
