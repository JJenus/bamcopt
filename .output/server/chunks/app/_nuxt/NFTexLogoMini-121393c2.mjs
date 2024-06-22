import { _ as __nuxt_component_1 } from './nuxt-link-78f9c8c3.mjs';
import { u as useRuntimeConfig } from '../server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { a as _imports_0 } from './NFTexLogo-b1aa70f7.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NFTexLogoMini",
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
      const _component_NuxtLink = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: "/",
        class: "d-flex align-items-center justify-content-center position-relative m-0 p-0"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img alt="Logo"${ssrRenderAttr("src", _imports_0)} class="${ssrRenderClass([__props.classes, ""])}" class=""${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                alt: "Logo",
                src: _imports_0,
                class: [__props.classes, ""]
              }, null, 2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NFTexLogoMini.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=NFTexLogoMini-121393c2.mjs.map
