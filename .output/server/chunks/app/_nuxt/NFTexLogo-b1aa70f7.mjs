import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { u as useRuntimeConfig } from '../server.mjs';
import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _imports_0 = "" + publicAssetsURL("assets/media/logos/logo-ban.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NFTexLogo",
  __ssrInlineRender: true,
  props: {
    classes: {
      type: String,
      required: false
    },
    appClass: {
      type: String,
      required: false
    },
    appClassDark: {
      type: String,
      required: false
    }
  },
  setup(__props) {
    useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: "/",
        class: "d-flex text-darki align-items-center ps-3 gap-2"
      }, _attrs))} data-v-24dc20e8><img alt="Logo"${ssrRenderAttr("src", _imports_0)} class="${ssrRenderClass([__props.classes, "theme-dark-showi"])}" data-v-24dc20e8><span class="${ssrRenderClass([__props.appClass, "fw-bold fs-3x truculenta-ero text-danger theme-dark-show"])}" data-v-24dc20e8>Bancopt</span><span class="${ssrRenderClass([__props.appClass, "fw-bold fs-3x truculenta-ero theme-light-show text-warning"])}" data-v-24dc20e8>Bancopt</span></a>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NFTexLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-24dc20e8"]]);

export { __nuxt_component_0 as _, _imports_0 as a };
//# sourceMappingURL=NFTexLogo-b1aa70f7.mjs.map
