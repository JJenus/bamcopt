import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { u as userData, a as useAuth } from './userData-981e93ad.mjs';
import { useSSRContext, mergeProps, defineComponent, unref, ref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, resolveComponent, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './NFTexLogo-b1aa70f7.mjs';
import { _ as __nuxt_component_1$1 } from './nuxt-link-78f9c8c3.mjs';
import { n as navs, _ as __nuxt_component_5 } from './Notifications-f37cb4c7.mjs';
import { u as useAppSettings } from './appSettings-112ed972.mjs';
import { _ as _imports_0$1, a as _imports_1$1, b as _imports_2$1, c as _imports_3, d as _imports_4 } from './france-2912dc83.mjs';
import { _ as __nuxt_component_2$1 } from './Balance-43915aa5.mjs';
import { _ as _sfc_main$8 } from './Entry-09d0fe4c.mjs';
import { a as useRoute } from '../server.mjs';
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
import 'axios';
import './cookie-8c768185.mjs';
import 'cookie-es';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'moment';
import 'currency.js';
import 'sweetalert2';
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';

const _sfc_main$7 = {
  __name: "Toast",
  __ssrInlineRender: true,
  setup(__props) {
    userData().getNotifications();
    userData().newNotifications;
    ref({
      title: "Great",
      status: "READ",
      createdAt: /* @__PURE__ */ new Date(),
      message: "Something splendid"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "kt_docs_toast_stack_container",
        class: "toast-container position-fixed top-0 end-0 p-3 z-index-3 pt-10 pt-lg-5 w-75 w-md-300px me-3",
        style: { "z-index": "60000" }
      }, _attrs))}><div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-kt-docs-toast="stack"><div class="toast-header"><i class="ki-duotone ki-message-notif fs-2 text-info me-3"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></i><strong class="me-auto">Bancopt</strong><small>11 mins ago</small><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div><div class="toast-body">Hello, world! This is a toast message.</div></div></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Toast.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$7;
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const newNotification = userData().newNotification;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NFTexLogo = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "kt_app_header",
        class: "app-header d-flex d-lg-none",
        "data-kt-sticky": "true",
        "data-kt-sticky-name": "app-header-sticky",
        "data-kt-sticky-offset": "{default: 'false', lg: '300px'}"
      }, _attrs))}><div class="app-container container-fluid d-flex align-items-stretch justify-content-between" id="kt_app_header_container"><div class="d-flex align-items-center me-auto position-relative">`);
      _push(ssrRenderComponent(_component_NFTexLogo, { classes: "h-30px" }, null, _parent));
      _push(`</div><div class="d-flex align-items-center ms-2 me-n3" title="Show header menu"><div class="app-navbar-item d-flex justify-content-end flex-grow-1 me-1 d-lg-none"><div class="${ssrRenderClass([
        unref(newNotification) ? "btn-color-primary btn-icon-primary" : "btn-color-muted btn-icon-muted",
        "symbol btn btn-icon btn-custom btn-active-light-primary w-35px h-35px w-md-40px h-md-40px"
      ])}" id="kt_activities_toggle">`);
      if (unref(newNotification)) {
        _push(`<i class="ki-outline ki-notification-on fs-2x"></i>`);
      } else {
        _push(`<i class="ki-outline ki-notification-bing fs-2x"></i>`);
      }
      if (unref(newNotification)) {
        _push(`<div class="bg-danger blink position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3" bis_skin_checked="1"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_aside_mobile_toggle"><i class="ki-outline ki-text-align-left fs-2 fw-bold"></i></div></div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/Header.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "SideBar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NFTexLogo = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "kt_app_sidebar",
        class: "app-sidebar d-none d-lg-flex flex-column",
        "data-kt-drawer": "true",
        "data-kt-drawer-name": "app-sidebar",
        "data-kt-drawer-activate": "{default: true, lg: false}",
        "data-kt-drawer-overlay": "true",
        "data-kt-drawer-width": "250px",
        "data-kt-drawer-direction": "start",
        "data-kt-drawer-toggle": "#kt_app_sidebar_mobile_toggle"
      }, _attrs))}><div class="app-sidebar-logo d-none mx-auto pt-7 pt-xl-18 mb-xl-9 d-lg-flex align-items-center" id="kt_app_sidebar_logo"><div class="d-flex align-items-center me-auto position-relative">`);
      _push(ssrRenderComponent(_component_NFTexLogo, { classes: "h-30px" }, null, _parent));
      _push(`</div></div><div class="app-sidebar-menu overflow-hidden flex-column-fluid"><div id="kt_app_sidebar_menu_wrapper" class="app-sidebar-wrapper hover-scroll-y my-5 mx-3 mx-xl-11" data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer" data-kt-scroll-wrappers="#kt_app_sidebar_menu" data-kt-scroll-offset="5px"><div class="menu menu-column menu-rounded menu-sub-indention menu-active-bg menu- px-3" id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false"><!--[-->`);
      ssrRenderList("navs" in _ctx ? _ctx.navs : unref(navs), (nav) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: nav.dir,
          class: [nav.name == "Scan" ? "d-none" : "", "menu-item"],
          "data-kt-menu-trigger": "click"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="menu-link"${_scopeId}><span class="menu-icon"${_scopeId}><i class="${ssrRenderClass([nav.icon, "fs-2x"])}"${_scopeId}><!--[-->`);
              ssrRenderList(nav.paths, (path) => {
                _push2(`<i class="${ssrRenderClass(path)}"${_scopeId}></i>`);
              });
              _push2(`<!--]--></i></span><span class="menu-title"${_scopeId}>${ssrInterpolate(nav.name)}</span></span>`);
            } else {
              return [
                createVNode("span", { class: "menu-link" }, [
                  createVNode("span", { class: "menu-icon" }, [
                    createVNode("i", {
                      class: [nav.icon, "fs-2x"]
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(nav.paths, (path) => {
                        return openBlock(), createBlock("i", { class: path }, null, 2);
                      }), 256))
                    ], 2)
                  ]),
                  createVNode("span", { class: "menu-title" }, toDisplayString(nav.name), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div><div class="app-sidebar-footer flex-column-auto m-9" id="kt_app_sidebar_footer"><div class="card card-custom-2 bg-light-success border-0"><div class="card-body text-center"><h4 class="text-gray-800 text-center fw-bold mb-9"> Create a ticket <br> enjoy awesome support </h4><a role="button" class="btn btn-sm btn-primary btn"> Chat </a></div></div></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/SideBar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main$5;
const _sfc_main$4 = {
  __name: "UserMenuDropdown",
  __ssrInlineRender: true,
  setup(__props) {
    const user = userData().data;
    const image = user.value.imgUrl || "/assets/media/svg/avatars/blank.svg";
    const tiers = useAppSettings().accountLevels;
    const account = user.value.account;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$1;
      const _component_NuxLink = resolveComponent("NuxLink");
      _push(`<!--[--><div class="cursor-pointer symbol symbol-circle ms-2 symbol-35px symbol-lg-50px" data-kt-menu-trigger="{default: &#39;click&#39;, lg: &#39;hover&#39;}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end"><img${ssrRenderAttr("src", unref(image))} alt="user"></div><div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true"><div class="menu-item px-3"><div class="menu-content d-flex align-items-center px-3"><div class="symbol symbol-50px me-5"><img alt="Logo"${ssrRenderAttr("src", unref(image))}></div><div class="d-flex flex-column"><div class="fw-bold d-flex align-items-center fs-5">`);
      if (unref(user).name) {
        _push(`<span>${ssrInterpolate(unref(user).name)}</span>`);
      } else {
        _push(`<span class="spinner-border spinner-border-sm"></span>`);
      }
      _push(`<i class="fa-solid fa-circle text-success ms-2 fs-67"></i></div><div class="d-flex align-items-center fw-bold fs-7 text-muted"><i class="ki-solid ki-medal-star text-primary fs-2"></i><!--[-->`);
      ssrRenderList(unref(tiers), (tier) => {
        _push(`<span>`);
        if (unref(account).accountLevel === tier.accountLevel) {
          _push(`<span>${ssrInterpolate(tier.title)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      });
      _push(`<!--]--></div></div></div></div><div class="separator my-2"></div><div class="menu-item px-5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/app/profile/",
        class: "menu-link px-5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` My Profile `);
          } else {
            return [
              createTextVNode(" My Profile ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="menu-item px-5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/app/account-info",
        class: "menu-link px-5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="d-flex flex-column align-items-start"${_scopeId}><span${_scopeId}>Account Info</span><small class="text-muted fs-8"${_scopeId}>View your transaction limits</small></div>`);
          } else {
            return [
              createVNode("div", { class: "d-flex flex-column align-items-start" }, [
                createVNode("span", null, "Account Info"),
                createVNode("small", { class: "text-muted fs-8" }, "View your transaction limits")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="separator my-2"></div><div class="menu-item px-5" data-kt-menu-trigger="{default: &#39;click&#39;, lg: &#39;hover&#39;}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0"><a href="#" class="menu-link px-5"><span class="menu-title position-relative"> Mode <span class="ms-5 position-absolute translate-middle-y top-50 end-0"><i class="ki-outline ki-night-day theme-light-show fs-2"></i><i class="ki-outline ki-moon theme-dark-show fs-2"></i></span></span></a><div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px" data-kt-menu="true" data-kt-element="theme-mode-menu"><div class="menu-item px-3 my-0"><a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="light"><span class="menu-icon" data-kt-element="icon"><i class="ki-outline ki-night-day fs-2"></i></span><span class="menu-title"> Light </span></a></div><div class="menu-item px-3 my-0"><a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="dark"><span class="menu-icon" data-kt-element="icon"><i class="ki-outline ki-moon fs-2"></i></span><span class="menu-title"> Dark </span></a></div><div class="menu-item px-3 my-0"><a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="system"><span class="menu-icon" data-kt-element="icon"><i class="ki-outline ki-screen fs-2"></i></span><span class="menu-title"> System </span></a></div></div></div><div class="menu-item px-5" data-kt-menu-trigger="{default: &#39;click&#39;, lg: &#39;hover&#39;}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0"><a href="#" class="menu-link px-5"><span class="menu-title position-relative"> Language <span class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0"> English <img class="w-15px h-15px rounded-1 ms-2"${ssrRenderAttr("src", _imports_0$1)} alt=""></span></span></a><div class="menu-sub menu-sub-dropdown w-175px py-4"><div class="menu-item px-3"><a role="button" class="menu-link d-flex px-5 active"><span class="symbol symbol-20px me-4"><img class="rounded-1"${ssrRenderAttr("src", _imports_0$1)} alt=""></span> English </a></div><div class="menu-item px-3"><a role="button" class="menu-link d-flex px-5"><span class="symbol symbol-20px me-4"><img class="rounded-1"${ssrRenderAttr("src", _imports_1$1)} alt=""></span> Spanish </a></div><div class="menu-item px-3"><a role="button" class="menu-link d-flex px-5"><span class="symbol symbol-20px me-4"><img class="rounded-1"${ssrRenderAttr("src", _imports_2$1)} alt=""></span> German </a></div><div class="menu-item px-3"><a role="button" class="menu-link d-flex px-5"><span class="symbol symbol-20px me-4"><img class="rounded-1"${ssrRenderAttr("src", _imports_3)} alt=""></span> Japanese </a></div><div class="menu-item px-3"><a role="button" class="menu-link d-flex px-5"><span class="symbol symbol-20px me-4"><img class="rounded-1"${ssrRenderAttr("src", _imports_4)} alt=""></span> French </a></div></div></div><div class="menu-item px-5 my-1 d-none">`);
      _push(ssrRenderComponent(_component_NuxLink, {
        to: "/app/settings",
        class: "menu-link px-5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Account Settings `);
          } else {
            return [
              createTextVNode(" Account Settings ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="menu-item px-5"><a role="button" class="menu-link px-5"> Sign Out </a></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/UserMenuDropdown.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$4;
const _sfc_main$3 = {
  __name: "AsideBar",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const newNotification = userData().isNewNotification;
    const transactions = ref([]);
    (_a = useAuth().userData.value) == null ? void 0 : _a.userId;
    const getPreview = () => {
      if (transactions.value.length <= 5) {
        return transactions.value;
      }
      const list = [];
      for (let i = 0; i < 5; i++) {
        list.push(transactions.value[i]);
      }
      return list;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$1;
      const _component_AppUserMenuDropdown = __nuxt_component_1;
      const _component_AppBalance = __nuxt_component_2$1;
      const _component_AppTransactionEntry = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "kt_app_aside",
        class: "app-aside mobile-aside flex-column z-inde-1",
        style: {},
        "data-kt-drawer": "true",
        "data-kt-drawer-name": "app-aside",
        "data-kt-drawer-activate": "{default: true, lg: false}",
        "data-kt-drawer-overlay": "true",
        "data-kt-drawer-width": "300px",
        "data-kt-drawer-direction": "end",
        "data-kt-drawer-toggle": "#kt_app_aside_mobile_toggle"
      }, _attrs))}><div class="app-navbar flex-shrink-0 p-5 p-lg-18" id="kt_app_aside_navbar"><div class="app-navbar-item ms-n3"><button class="btn dv-lg-none btn-outline ms-2 btn-custom btn-icon-muted btn-active-light btn-active-color-primary" data-kt-menu-trigger="{default: &#39;click&#39;, lg: &#39;hover&#39;}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end"><i class="ki-solid ki-messages fs-2x"></i> Support </button></div><div class="flex-grow-1 ms-1 ms-lg-3 d-lg-none"></div><div class="${ssrRenderClass([
        unref(newNotification) ? "btn-color-primary btn-icon-primary" : "btn-color-muted btn-icon-muted",
        "symbol btn btn-icon btn-custom ms-lg-auto btn-active-light-primary w-35px h-35px w-md-40px h-md-40px"
      ])}" id="kt_activities_toggle">`);
      if (unref(newNotification)) {
        _push(`<i class="ki-outline ki-notification-on fs-2x"></i>`);
      } else {
        _push(`<i class="ki-outline ki-notification-bing fs-2x"></i>`);
      }
      if (unref(newNotification)) {
        _push(`<div class="bg-danger blink position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3" bis_skin_checked="1"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="app-navbar-item ms-1 ms-lg-3 mb-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/app/profile/edit",
        class: "btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px",
        "data-kt-menu-trigger": "{default: 'click', lg: 'hover'}",
        "data-kt-menu-attach": "parent",
        "data-kt-menu-placement": "bottom-end"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="ki-outline ki-notepad-edit fs-2x"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "ki-outline ki-notepad-edit fs-2x" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">`);
      _push(ssrRenderComponent(_component_AppUserMenuDropdown, null, null, _parent));
      _push(`</div></div><div id="kt_app_aside_content_wrapper" class="app-aside_content-wrapper hover-scroll-overlay-y ps-5 ps-lg-18 pe-3 pe-lg-16 me-2" data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_aside_navbar" data-kt-scroll-wrappers="#kt_app_aside_content" data-kt-scroll-offset="5px"><div class="card card-custom-2 bg-light-danger border-0 mb-lg-10 d-none d-lg-block"><div class="card-body">`);
      _push(ssrRenderComponent(_component_AppBalance, null, null, _parent));
      _push(`</div></div><div class="card card-flush card-reset bg-transparent card-p-0"><div class="card-header pt-5"><h3 class="card-title align-items-start flex-column"><span class="card-label text-gray-800 fw-bold mb-2">Recent Transactions</span></h3><div class="card-toolbar"><button class="btn btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-overflow="true"><i class="ki-outline ki-dots-square fs-1 text-gray-400 me-n1"></i></button><div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px" data-kt-menu="true"><div class="menu-item px-3"><div class="menu-content fs-6 text-dark fw-bold px-3 py-4"><i class="ki-solid ki-setting-4 fs-5 me-2"></i> Filter </div></div><div class="separator mb-3 opacity-75"></div><div class="menu-item px-3"><a role="button" class="menu-link px-3"> Sent </a></div><div class="menu-item px-3"><a role="button" class="menu-link px-3"> Received </a></div><div class="separator mt-3 opacity-75"></div><div class="menu-item px-3"><div class="menu-content px-3 py-3"><a class="btn btn-primary btn-sm px-4 w-100" href="#"> View All </a></div></div></div></div></div><div class="card-body pt-6"><!--[-->`);
      ssrRenderList(getPreview(), (transact) => {
        _push(ssrRenderComponent(_component_AppTransactionEntry, { transaction: transact }, null, _parent));
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/AsideBar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = _sfc_main$3;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MobileNavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const path = route.path;
    console.log(path);
    const active = ref(path);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: { "z-index": "1049" },
        class: "position-fixed bg-light bottom-0 start-0 w-100 d-lg-none"
      }, _attrs))}><div data-kt-drawer-dismiss="true" class="w-100 d-flex align-items-center justify-content-between p-3"><!--[-->`);
      ssrRenderList("navs" in _ctx ? _ctx.navs : unref(navs), (nav) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          onClick: ($event) => active.value = nav.dir,
          to: nav.dir,
          class: [
            nav.name == "Scan" ? "d-none" : unref(active) == nav.dir ? "active" : "",
            "btn btn-icon w-35px btn-active-primary btn-outline-dashed hover-scale btn-icon-primary btn-text-primary h-40px w-40px h-md-40px"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass([nav.icon, "fs-2x"])}"${_scopeId}><!--[-->`);
              ssrRenderList(nav.paths, (path2) => {
                _push2(`<i class="${ssrRenderClass(path2)}"${_scopeId}></i>`);
              });
              _push2(`<!--]--></i>`);
            } else {
              return [
                createVNode("i", {
                  class: [nav.icon, "fs-2x"]
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(nav.paths, (path2) => {
                    return openBlock(), createBlock("i", { class: path2 }, null, 2);
                  }), 256))
                ], 2)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/MobileNavBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = "" + publicAssetsURL("assets/media/svg/card-logos/visa.svg");
const _imports_1 = "" + publicAssetsURL("assets/media/svg/card-logos/mastercard.svg");
const _imports_2 = "" + publicAssetsURL("assets/media/svg/card-logos/american-express.svg");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TopUp",
  __ssrInlineRender: true,
  setup(__props) {
    const user = userData().data;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "modal fade",
        id: "kt_modal_upgrade_plan",
        tabindex: "-1",
        "aria-hidden": "true"
      }, _attrs))}><div class="modal-dialog modal-xl"><div class="modal-content rounded"><div class="modal-header justify-content-end border-0 pb-0"><div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal"><i class="ki-outline ki-cross fs-1"></i></div></div><div class="modal-body pt-0 pb-15 px-5 px-xl-20"><div class="mb-13 text-center"><h1 class="mb-3">Deposit</h1><div class="text-muted fw-semibold fs-5"> If you need any assistance, please contact <a role="button" class="link-primary fw-bold">support</a>. </div></div><form id="kt_modal_new_card_form" class="form fv-plugins-bootstrap5 fv-plugins-framework" action="#" data-select2-id="select2-data-kt_modal_new_card_form"><div class="d-flex flex-column mb-7 fv-row fv-plugins-icon-container"><label class="d-flex align-items-center fs-6 fw-semibold form-label mb-2"><span class="required">Name On Card</span><span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify a card holder&#39;s name" data-bs-original-title="Specify a card holder&#39;s name" data-kt-initialized="1"><i class="ki-outline ki-information-5 text-gray-500 fs-6"></i></span></label><input type="text" class="form-control form-control-solid" placeholder="" name="card_name"${ssrRenderAttr("value", unref(user).name)}><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div><div class="d-flex flex-column mb-7 fv-row fv-plugins-icon-container"><label class="required fs-6 fw-semibold form-label mb-2">Card Number</label><div class="position-relative"><input type="text" class="form-control form-control-solid" placeholder="Enter card number" name="card_number" value=""><div class="position-absolute translate-middle-y top-50 end-0 me-5"><img${ssrRenderAttr("src", _imports_0)} alt="" class="h-25px"><img${ssrRenderAttr("src", _imports_1)} alt="" class="h-25px"><img${ssrRenderAttr("src", _imports_2)} alt="" class="h-25px"></div></div><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div><div class="row mb-10" data-select2-id="select2-data-345-k61a"><div class="col-md-8 fv-row" data-select2-id="select2-data-344-xvb5"><label class="required fs-6 fw-semibold form-label mb-2">Expiration Date</label><div class="row fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid"><div class="col-6"><input type="text" class="form-control form-control-solid" placeholder="" name="card_expiry_month"><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div><div class="col-6" data-select2-id="select2-data-343-x9q5"><input type="text" class="form-control form-control-solid" placeholder="" name="card_expiry_year"><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div></div></div><div class="col-md-4 fv-row fv-plugins-icon-container"><label class="d-flex align-items-center fs-6 fw-semibold form-label mb-2"><span class="required">CVV</span><span class="ms-1" data-bs-toggle="tooltip" aria-label="Enter a card CVV code" data-bs-original-title="Enter a card CVV code" data-kt-initialized="1"><i class="ki-outline ki-information-5 text-gray-500 fs-6"></i></span></label><div class="position-relative"><input type="text" class="form-control form-control-solid" minlength="3" maxlength="4" placeholder="CVV" name="card_cvv"><div class="position-absolute translate-middle-y top-50 end-0 me-3"><i class="ki-outline ki-credit-cart fs-2hx"></i></div></div><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div></div><div class="d-flex flex-stack"><div class="me-5"><label class="fs-6 fw-semibold form-label">Save Card for further billing?</label><div class="fs-7 fw-semibold text-muted"> If you need more info, please check budget planning </div></div><label class="form-check form-switch form-check-custom form-check-solid"><input class="form-check-input" type="checkbox" value="1" checked><span class="form-check-label fw-semibold text-muted"> Save Card </span></label></div><div class="text-center pt-15"><button type="reset" id="kt_modal_new_card_cancel" class="btn btn-light me-3"> Discard </button><button type="submit" id="kt_modal_new_card_submit" class="btn btn-primary"><span class="indicator-label"> Submit </span><span class="indicator-progress"> Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span></button></div></form></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/TopUp.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Toast = __nuxt_component_0;
      const _component_AppHeader = _sfc_main$6;
      const _component_AppSideBar = __nuxt_component_2;
      const _component_AppAsideBar = __nuxt_component_3;
      const _component_AppMobileNavBar = _sfc_main$2;
      const _component_AppNotifications = __nuxt_component_5;
      const _component_AppTopUp = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "kt_app_body",
        "data-kt-app-header-fixed-mobile": "true",
        "data-kt-app-sidebar-enabled": "true",
        "data-kt-app-sidebar-fixed": "true",
        "data-kt-app-sidebar-push-header": "true",
        "data-kt-app-sidebar-push-toolbar": "true",
        "data-kt-app-sidebar-push-footer": "true",
        "data-kt-app-aside-enabled": "true",
        "data-kt-app-aside-fixed": "true",
        "data-kt-app-aside-push-header": "true",
        "data-kt-app-aside-push-toolbar": "true",
        "data-kt-app-aside-push-footer": "true",
        "data-bs-theme-mode": "dark",
        class: "app-default position-relative"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Toast, { class: "mt-15 mt-lg-5" }, null, _parent));
      _push(`<div class="d-flex flex-column flex-root app-root position-relative" id="kt_app_root"><div class="app-page flex-column flex-column-fluid" id="kt_app_page">`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">`);
      _push(ssrRenderComponent(_component_AppSideBar, null, null, _parent));
      _push(`<div class="app-main flex-column flex-row-fluid" id="kt_app_main"><div class="d-flex flex-column flex-column-fluid"><div id="kt_app_content" class="app-content flex-column-fluid"><div id="kt_app_content_container" class="app-container container-fluid pb-20 pb-lg-10">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_component_AppAsideBar, null, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_AppMobileNavBar, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_AppNotifications, null, null, _parent));
      _push(`<div style="${ssrRenderStyle({ "margin-bottom": "40px" })}" id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true"><i class="ki-outline ki-arrow-up"></i></div>`);
      _push(ssrRenderComponent(_component_AppTopUp, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=app-280bcc77.mjs.map
