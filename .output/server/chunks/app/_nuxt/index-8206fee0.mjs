import { u as useAppSettings } from './appSettings-112ed972.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const settings = useAppSettings().settings;
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="card-header"><div class="card-title m-0"><h3 class="fw-bold m-0">Default App Settings</h3></div></div><div class="card-body"><form class="row row-cols-2"><div class="mb-5"><label class="form-label">Default Currency</label><input${ssrRenderAttr("value", unref(settings).defaultBaseCurrency)} type="text" class="form-control" required></div><div class="mb-5"><label class="form-label">Default Language</label><input${ssrRenderAttr("value", unref(settings).defaultLanguage)} type="text" class="form-control" required></div><div class="mb-3i d-flex"><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="btn btn-primary w-100">`);
      if (!unref(loading)) {
        _push(`<span>Save</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-8206fee0.mjs.map
