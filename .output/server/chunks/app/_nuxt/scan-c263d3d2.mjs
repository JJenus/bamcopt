import { useSSRContext, defineComponent, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Camera",
  __ssrInlineRender: true,
  setup(__props) {
    const html5QrCode = ref();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex flex-column align-items-center justify-content-center w-100" }, _attrs))}><div class="bg-light overflow-hidden mb-5 border border-secondary position-relative rounded-3 min-h-200px min-w-300px"><div id="reader" class="wh-200px w-300px"></div>`);
      if (unref(html5QrCode)) {
        _push(`<div class="scanner position-absolute"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="d-flex flex-row justify-content-center mt-6">`);
      if (unref(html5QrCode)) {
        _push(`<button class="btn btn-danger me-3"> Stop </button>`);
      } else {
        _push(`<button class="btn btn-primary"> Start </button>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/scan/Camera.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppScanCamera = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card-custom border-0 h-md-100 mb-5 mb-lg-10" }, _attrs))}><div class="card-header border-0 text-center d-flex flex-column fs-6 justify-content-center p-4"><h1 class="text-center h2 pt-4 fw-bold">Scan</h1><div> Scan QR code to make payment </div></div><div class="card-body ps-xl-15 min-h-400px">`);
  _push(ssrRenderComponent(_component_AppScanCamera, null, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/scan.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const scan = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { scan as default };
//# sourceMappingURL=scan-c263d3d2.mjs.map
