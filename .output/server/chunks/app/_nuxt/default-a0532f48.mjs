import { _ as __nuxt_component_0 } from './NFTexLogo-b1aa70f7.mjs';
import { _ as __nuxt_component_1$1 } from './nuxt-link-78f9c8c3.mjs';
import { a as useAuth, u as userData } from './userData-981e93ad.mjs';
import { useSSRContext, defineComponent, mergeProps, ref, withCtx, createVNode, toDisplayString, unref, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_1, b as _imports_2, c as _imports_3, d as _imports_4 } from './france-2912dc83.mjs';
import { a as useRoute, u as useRuntimeConfig, e as useState } from '../server.mjs';
import { _ as _sfc_main$6 } from './NFTexLogoMini-121393c2.mjs';
import axios from 'axios';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import { u as useCookie } from './cookie-8c768185.mjs';
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
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'cookie-es';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "UserDropdown",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px",
        "data-kt-menu": "true"
      }, _attrs))}><div class="menu-item px-5"><a href="/account/" class="menu-link px-5"> My Profile <i class="ki-solid ki-user ms-auto fs-2"></i></a></div><div class="menu-item px-5"><a href="/studio/create" class="menu-link px-5"> Create <i class="ki-solid ki-element-plus ms-auto fs-2"></i></a></div><div class="separator my-2"></div><div class="menu-item px-5"><a href="/account/" class="menu-link px-5"> Collections <i class="ki-solid ki-element-7 ms-auto fs-2"></i></a></div><div class="menu-item px-5"><a href="/account/created" class="menu-link px-5"> Created <i class="ki-solid ki-element-equal ms-auto fs-2"></i></a></div><div class="separator my-2"></div><div class="menu-item px-5" data-kt-menu-trigger="{default: &#39;click&#39;, lg: &#39;hover&#39;}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0"><a href="#" class="menu-link px-5"><span class="menu-title position-relative"> Mode <span class="ms-5 position-absolute translate-middle-y top-50 end-0"><i class="ki-outline ki-night-day theme-light-show fs-2"></i><i class="ki-outline ki-moon theme-dark-show fs-2"></i></span></span></a><div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px" data-kt-menu="true" data-kt-element="theme-mode-menu"><div class="menu-item px-3 my-0"><a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="light"><span class="menu-icon" data-kt-element="icon"><i class="ki-outline ki-night-day fs-2"></i></span><span class="menu-title"> Light </span></a></div><div class="menu-item px-3 my-0"><a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="dark"><span class="menu-icon" data-kt-element="icon"><i class="ki-outline ki-moon fs-2"></i></span><span class="menu-title"> Dark </span></a></div><div class="menu-item px-3 my-0"><a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="system"><span class="menu-icon" data-kt-element="icon"><i class="ki-outline ki-screen fs-2"></i></span><span class="menu-title"> System </span></a></div></div></div><div class="menu-item px-5" data-kt-menu-trigger="{default: &#39;click&#39;, lg: &#39;hover&#39;}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0"><a href="#" class="menu-link px-5"><span class="menu-title position-relative"> Language <span class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0"> English <img class="w-15px h-15px rounded-1 ms-2"${ssrRenderAttr("src", _imports_0)} alt=""></span></span></a><div class="menu-sub menu-sub-dropdown w-175px py-4"><div class="menu-item px-3"><a role="button" class="menu-link d-flex px-5 active"><span class="symbol symbol-20px me-4"><img class="rounded-1"${ssrRenderAttr("src", _imports_0)} alt=""></span> English </a></div><div class="menu-item px-3"><a role="button" class="menu-link d-flex px-5"><span class="symbol symbol-20px me-4"><img class="rounded-1"${ssrRenderAttr("src", _imports_1)} alt=""></span> Spanish </a></div><div class="menu-item px-3"><a role="button" class="menu-link d-flex px-5"><span class="symbol symbol-20px me-4"><img class="rounded-1"${ssrRenderAttr("src", _imports_2)} alt=""></span> German </a></div><div class="menu-item px-3"><a role="button" class="menu-link d-flex px-5"><span class="symbol symbol-20px me-4"><img class="rounded-1"${ssrRenderAttr("src", _imports_3)} alt=""></span> Japanese </a></div><div class="menu-item px-3"><a role="button" class="menu-link d-flex px-5"><span class="symbol symbol-20px me-4"><img class="rounded-1"${ssrRenderAttr("src", _imports_4)} alt=""></span> French </a></div></div></div><div class="menu-item px-5 my-1"><a role="button" class="menu-link px-5"> Account Settings </a></div><div class="menu-item px-5"><a role="button" class="menu-link px-5"> Sign Out </a></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UserDropdown.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRuntimeConfig().public;
    const auth = useAuth();
    const user = userData().data;
    const active = ref("all");
    const navs = [
      {
        name: "Home",
        path: "/"
      },
      {
        name: "About",
        path: "/resources/about-us"
      },
      {
        name: "Contact-Us",
        path: "/resources/contact-us"
      }
    ];
    const setActive = (data, theme) => {
      const a = active.value.toLocaleLowerCase() === data.toLocaleLowerCase();
      const color = theme === "light" ? "active border-bottom border-info" : "active border-bottom border-info";
      return a ? color : "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NFTexLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_1$1;
      const _component_UserDropdown = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: { "z-index": "22" },
        id: "kt_app_header",
        class: "app-header d-flex border-0 bg-transparent",
        "data-kt-sticky": true,
        "data-kt-sticky-name": "app-header-sticky",
        "data-kt-sticky-offset": "{default: 'false', lg: '300px'}"
      }, _attrs))}><div class="app-container container-fluid d-flex align-items-stretch justify-content-between" id="kt_app_header_container"><div class="d-flex d-lg-none align-items-center me-auto">`);
      _push(ssrRenderComponent(_component_NFTexLogo, { classes: "h-40px ms-n3" }, null, _parent));
      _push(`</div><div class="d-none d-lg-flex align-items-center">`);
      _push(ssrRenderComponent(_component_NFTexLogo, { classes: "h-60px" }, null, _parent));
      _push(`</div><div class="app-navbar flex-shrink-0" id="kt_app_aside_navbar"><div class="d-none d-lg-flex align-items-center"><ul class="nav nav-tabs nav-pills d-flex flex-nowrap border-0 fs-6"><!--[-->`);
      ssrRenderList(navs, (nav) => {
        _push(`<li class="nav-item me-08 mb-md-2i">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: ["nav-link theme-dark-show w-100 bg-transparent btn btn-color-white btn-active-color-white btn-active-light btn-sm", setActive(nav.name, "dark")],
          to: nav.path
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="d-flex flex-column align-items-start"${_scopeId}><span class="fs-4 fw-bold"${_scopeId}>${ssrInterpolate(nav.name)}</span></span>`);
            } else {
              return [
                createVNode("span", { class: "d-flex flex-column align-items-start" }, [
                  createVNode("span", { class: "fs-4 fw-bold" }, toDisplayString(nav.name), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: ["nav-link theme-light-show w-100 bg-transparent btn btn-color-info btn-active-color-primary btn-active-light btn-sm", setActive(nav.name, "light")],
          to: nav.path
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="d-flex flex-column align-items-start"${_scopeId}><span class="fs-4 fw-bold"${_scopeId}>${ssrInterpolate(nav.name)}</span></span>`);
            } else {
              return [
                createVNode("span", { class: "d-flex flex-column align-items-start" }, [
                  createVNode("span", { class: "fs-4 fw-bold" }, toDisplayString(nav.name), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div class="app-navbar-item mx-3 ms-lg-1" id="kt_header_user_menu_toggle">`);
      if (unref(auth).isAuthenticated()) {
        _push(`<a href="/app" class="cursor-pointer d-nonei d-lg-block symbol symbol-circle ms-2 symbol-35px symbol-lg-50px ms-0 ms-lg-3"><img${ssrRenderAttr(
          "src",
          unref(user).imgUrl ? unref(user).imgUrl : _ctx.$config.public.DEFAULT_DP
        )} alt="user" class=""></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UserDropdown, { class: "d-none" }, null, _parent));
      _push(`</div><div class="app-navbar-item d-none d-lg-flexi justify-content-end flex-grow-1 ms-1 ms-lg-3"><div class="btn btn-secondary btn-custom fw-bold btn-active-light btn-active-color-white btn-color-white btn-icon w-40px h-40px" id="kt_activities_toggle"><i class="ki-outline ki-handcart fs-2x"></i></div></div></div><div class="d-flex d-lg-none align-items-center me-n1 ms-3" title="Show sidebar menu"><button class="btn btn-icon btn-icon-white btn-active-icon-white btn-active-color-white w-35px h-35px" id="kt_app_sidebar_mobile_toggle"><i class="ki-solid ki-burger-menu-5 fs-3x"></i></button></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NFTexLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: { "border-radius": "0" },
        class: "app-containeri container-fluidi fs-5 pt-10 mt-10 py-3"
      }, _attrs))}><div class="card bg-body border-0 w-100 m-0 p-0 rounded-0"><div class="card-body mx-0"><div class="row row-cols-md-2 justify-content-between"><div class="col-md-4 order-2w p-0 m-0 order-md-1w pb-8"><div class="d-flex flex-column align-itemis-center mb-6"><div class="d-flex flex-row align-items-center justify-content-center m-0 mb-3">`);
      _push(ssrRenderComponent(_component_NFTexLogo, { classes: "h-50px" }, null, _parent));
      _push(`</div></div><p class="text-center p-4"> Our business and philanthropy are helping build more sustainable, diverse and equitable communities around the world. </p></div><div class="col-md-5"><h2 class="fs-2qx text-danger mb-2">Stay informed</h2><p> Reach us on <br> ${ssrInterpolate(_ctx.$config.public.MOBILE)}</p><p class="mb-5"> Don\u2019t miss, to subscribe to our new feeds, kindly fill the form below. </p><div class="d-flex align-items-center"><div class="position-relative my-1 me-3" bis_skin_checked="1"><i class="ki-outline ki-sms fs-3 position-absolute top-50 translate-middle-y ms-4"></i><input type="text" data-kt-table-widget-4="search" class="form-control w-200px w-lg-300px ps-12" placeholder="Email"></div><button class="btn btn-light-danger"> Subscribe </button></div></div></div><div class="d-flex flex-column flex-md-row mt-9 align-items-center justify-content-between"><div class="px-md-2 fs-6"><span>Copyright \xA9 2023 ${ssrInterpolate(unref(config).APP)}. all rights reserved.</span></div><ul class="menu menu-gray-600 menu-hover-primary fw-semibold order-1w"><li class="menu-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/resources/about-us",
        target: "_blank",
        class: "menu-link px-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About`);
          } else {
            return [
              createTextVNode("About")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="menu-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/resources/contact-us",
        class: "menu-link px-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact Us `);
          } else {
            return [
              createTextVNode(" Contact Us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="menu-item"><a target="_blank" class="menu-link px-2">Term and conditions</a></li></ul></div></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$3;
const useAppResource = () => {
  const countries = useState("form-countries", () => []);
  const country = useState("user-country", () => {
  });
  countries.value = [
    {
      name: {
        common: "Cyprus",
        official: "Republic of Cyprus",
        nativeName: {
          ell: {
            official: "\u0394\u03B7\u03BC\u03BF\u03BA\u03C1\u03B1\u03C4\u03AF\u03B1 \u03C4\u03B7\u03C2 \u039A\u03CD\u03C0\u03C1\u03BF\u03C2",
            common: "\u039A\u03CD\u03C0\u03C1\u03BF\u03C2"
          },
          tur: {
            official: "K\u0131br\u0131s Cumhuriyeti",
            common: "K\u0131br\u0131s"
          }
        }
      },
      altSpellings: [
        "CY",
        "K\xFDpros",
        "K\u0131br\u0131s",
        "Republic of Cyprus",
        "\u039A\u03C5\u03C0\u03C1\u03B9\u03B1\u03BA\u03AE \u0394\u03B7\u03BC\u03BF\u03BA\u03C1\u03B1\u03C4\u03AF\u03B1",
        "K\u0131br\u0131s Cumhuriyeti"
      ]
    },
    {
      name: {
        common: "Eritrea",
        official: "State of Eritrea",
        nativeName: {
          eng: {
            official: "State of Eritrea",
            common: "Eritrea"
          },
          tir: {
            official: "\u1203\u1308\u1228 \u12A4\u122D\u1275\u122B",
            common: "\u12A4\u122D\u1275\u122B"
          }
        }
      },
      altSpellings: [
        "ER",
        "State of Eritrea",
        "\u1203\u1308\u1228 \u12A4\u122D\u1275\u122B",
        "Dawlat Iritriy\xE1",
        "\u02BEErtr\u0101",
        "Iritriy\u0101"
      ]
    },
    {
      name: {
        common: "Liberia",
        official: "Republic of Liberia",
        nativeName: {
          eng: {
            official: "Republic of Liberia",
            common: "Liberia"
          }
        }
      },
      altSpellings: ["LR", "Republic of Liberia"]
    },
    {
      name: {
        common: "Bermuda",
        official: "Bermuda",
        nativeName: {
          eng: {
            official: "Bermuda",
            common: "Bermuda"
          }
        }
      },
      altSpellings: [
        "BM",
        "The Islands of Bermuda",
        "The Bermudas",
        "Somers Isles"
      ]
    },
    {
      name: {
        common: "Vatican City",
        official: "Vatican City State",
        nativeName: {
          ita: {
            official: "Stato della Citt\xE0 del Vaticano",
            common: "Vaticano"
          },
          lat: {
            official: "Status Civitatis Vatican\xE6",
            common: "Vatican\xE6"
          }
        }
      },
      altSpellings: [
        "VA",
        "Holy See (Vatican City State)",
        "Vatican City State",
        "Stato della Citt\xE0 del Vaticano"
      ]
    },
    {
      name: {
        common: "Cook Islands",
        official: "Cook Islands",
        nativeName: {
          eng: {
            official: "Cook Islands",
            common: "Cook Islands"
          },
          rar: {
            official: "K\u016Bki '\u0100irani",
            common: "K\u016Bki '\u0100irani"
          }
        }
      },
      altSpellings: ["CK", "K\u016Bki '\u0100irani"]
    },
    {
      name: {
        common: "Somalia",
        official: "Federal Republic of Somalia",
        nativeName: {
          ara: {
            official: "\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u0635\u0648\u0645\u0627\u0644\u200E\u200E",
            common: "\u0627\u0644\u0635\u0648\u0645\u0627\u0644\u200E\u200E"
          },
          som: {
            official: "Jamhuuriyadda Federaalka Soomaaliya",
            common: "Soomaaliya"
          }
        }
      },
      altSpellings: [
        "SO",
        "a\u1E63-\u1E62\u016Bm\u0101l",
        "Federal Republic of Somalia",
        "Jamhuuriyadda Federaalka Soomaaliya",
        "Jumh\u016Briyyat a\u1E63-\u1E62\u016Bm\u0101l al-Fider\u0101liyya"
      ]
    },
    {
      name: {
        common: "Zambia",
        official: "Republic of Zambia",
        nativeName: {
          eng: {
            official: "Republic of Zambia",
            common: "Zambia"
          }
        }
      },
      altSpellings: ["ZM", "Republic of Zambia"]
    },
    {
      name: {
        common: "Venezuela",
        official: "Bolivarian Republic of Venezuela",
        nativeName: {
          spa: {
            official: "Rep\xFAblica Bolivariana de Venezuela",
            common: "Venezuela"
          }
        }
      },
      altSpellings: [
        "VE",
        "Bolivarian Republic of Venezuela",
        "Venezuela, Bolivarian Republic of",
        "Rep\xFAblica Bolivariana de Venezuela"
      ]
    },
    {
      name: {
        common: "Turkmenistan",
        official: "Turkmenistan",
        nativeName: {
          rus: {
            official: "\u0422\u0443\u0440\u043A\u043C\u0435\u043D\u0438\u0441\u0442\u0430\u043D",
            common: "\u0422\u0443\u0440\u043A\u043C\u0435\u043D\u0438\u044F"
          },
          tuk: {
            official: "T\xFCrkmenistan",
            common: "T\xFCrkmenistan"
          }
        }
      },
      altSpellings: ["TM"]
    },
    {
      name: {
        common: "Albania",
        official: "Republic of Albania",
        nativeName: {
          sqi: {
            official: "Republika e Shqip\xEBris\xEB",
            common: "Shqip\xEBria"
          }
        }
      },
      altSpellings: ["AL", "Shqip\xEBri", "Shqip\xEBria", "Shqipnia"]
    },
    {
      name: {
        common: "Croatia",
        official: "Republic of Croatia",
        nativeName: {
          hrv: {
            official: "Republika Hrvatska",
            common: "Hrvatska"
          }
        }
      },
      altSpellings: [
        "HR",
        "Hrvatska",
        "Republic of Croatia",
        "Republika Hrvatska"
      ]
    },
    {
      name: {
        common: "United Kingdom",
        official: "United Kingdom of Great Britain and Northern Ireland",
        nativeName: {
          eng: {
            official: "United Kingdom of Great Britain and Northern Ireland",
            common: "United Kingdom"
          }
        }
      },
      altSpellings: ["GB", "UK", "Great Britain"]
    },
    {
      name: {
        common: "Sudan",
        official: "Republic of the Sudan",
        nativeName: {
          ara: {
            official: "\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u0633\u0648\u062F\u0627\u0646",
            common: "\u0627\u0644\u0633\u0648\u062F\u0627\u0646"
          },
          eng: {
            official: "Republic of the Sudan",
            common: "Sudan"
          }
        }
      },
      altSpellings: [
        "SD",
        "Republic of the Sudan",
        "Jumh\u016Br\u012Byat as-S\u016Bd\u0101n"
      ]
    },
    {
      name: {
        common: "Timor-Leste",
        official: "Democratic Republic of Timor-Leste",
        nativeName: {
          por: {
            official: "Rep\xFAblica Democr\xE1tica de Timor-Leste",
            common: "Timor-Leste"
          },
          tet: {
            official: "Rep\xFAblika Demokr\xE1tika Tim\xF3r-Leste",
            common: "Tim\xF3r-Leste"
          }
        }
      },
      altSpellings: [
        "TL",
        "East Timor",
        "Democratic Republic of Timor-Leste",
        "Rep\xFAblica Democr\xE1tica de Timor-Leste",
        "Rep\xFAblika Demokr\xE1tika Tim\xF3r-Leste",
        "Tim\xF3r Lorosa'e",
        "Timor Lorosae"
      ]
    },
    {
      name: {
        common: "Republic of the Congo",
        official: "Republic of the Congo",
        nativeName: {
          fra: {
            official: "R\xE9publique du Congo",
            common: "R\xE9publique du Congo"
          },
          kon: {
            official: "Repubilika ya Kongo",
            common: "Repubilika ya Kongo"
          },
          lin: {
            official: "Republ\xEDki ya Kong\xF3",
            common: "Republ\xEDki ya Kong\xF3"
          }
        }
      },
      altSpellings: ["CG", "Congo", "Congo-Brazzaville"]
    },
    {
      name: {
        common: "Azerbaijan",
        official: "Republic of Azerbaijan",
        nativeName: {
          aze: {
            official: "Az\u0259rbaycan Respublikas\u0131",
            common: "Az\u0259rbaycan"
          }
        }
      },
      altSpellings: [
        "AZ",
        "Republic of Azerbaijan",
        "Az\u0259rbaycan Respublikas\u0131"
      ]
    },
    {
      name: {
        common: "Kenya",
        official: "Republic of Kenya",
        nativeName: {
          eng: {
            official: "Republic of Kenya",
            common: "Kenya"
          },
          swa: {
            official: "Republic of Kenya",
            common: "Kenya"
          }
        }
      },
      altSpellings: ["KE", "Republic of Kenya", "Jamhuri ya Kenya"]
    },
    {
      name: {
        common: "American Samoa",
        official: "American Samoa",
        nativeName: {
          eng: {
            official: "American Samoa",
            common: "American Samoa"
          },
          smo: {
            official: "S\u0101moa Amelika",
            common: "S\u0101moa Amelika"
          }
        }
      },
      altSpellings: [
        "AS",
        "Amerika S\u0101moa",
        "Amelika S\u0101moa",
        "S\u0101moa Amelika"
      ]
    },
    {
      name: {
        common: "Ivory Coast",
        official: "Republic of C\xF4te d'Ivoire",
        nativeName: {
          fra: {
            official: "R\xE9publique de C\xF4te d'Ivoire",
            common: "C\xF4te d'Ivoire"
          }
        }
      },
      altSpellings: [
        "CI",
        "C\xF4te d'Ivoire",
        "Ivory Coast",
        "Republic of C\xF4te d'Ivoire",
        "R\xE9publique de C\xF4te d'Ivoire"
      ]
    },
    {
      name: {
        common: "Senegal",
        official: "Republic of Senegal",
        nativeName: {
          fra: {
            official: "R\xE9publique du S\xE9n\xE9gal",
            common: "S\xE9n\xE9gal"
          }
        }
      },
      altSpellings: [
        "SN",
        "Republic of Senegal",
        "R\xE9publique du S\xE9n\xE9gal"
      ]
    },
    {
      name: {
        common: "Vietnam",
        official: "Socialist Republic of Vietnam",
        nativeName: {
          vie: {
            official: "C\u1ED9ng h\xF2a x\xE3 h\u1ED9i ch\u1EE7 ngh\u0129a Vi\u1EC7t Nam",
            common: "Vi\u1EC7t Nam"
          }
        }
      },
      altSpellings: [
        "VN",
        "Socialist Republic of Vietnam",
        "C\u1ED9ng h\xF2a X\xE3 h\u1ED9i ch\u1EE7 ngh\u0129a Vi\u1EC7t Nam",
        "Viet Nam"
      ]
    },
    {
      name: {
        common: "El Salvador",
        official: "Republic of El Salvador",
        nativeName: {
          spa: {
            official: "Rep\xFAblica de El Salvador",
            common: "El Salvador"
          }
        }
      },
      altSpellings: [
        "SV",
        "Republic of El Salvador",
        "Rep\xFAblica de El Salvador"
      ]
    },
    {
      name: {
        common: "Afghanistan",
        official: "Islamic Republic of Afghanistan",
        nativeName: {
          prs: {
            official: "\u062C\u0645\u0647\u0648\u0631\u06CC \u0627\u0633\u0644\u0627\u0645\u06CC \u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646",
            common: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646"
          },
          pus: {
            official: "\u062F \u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646 \u0627\u0633\u0644\u0627\u0645\u064A \u062C\u0645\u0647\u0648\u0631\u06CC\u062A",
            common: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646"
          },
          tuk: {
            official: "Owganystan Yslam Respublikasy",
            common: "Owganystan"
          }
        }
      },
      altSpellings: ["AF", "Af\u0121\u0101nist\u0101n"]
    },
    {
      name: {
        common: "Saint Martin",
        official: "Saint Martin",
        nativeName: {
          fra: {
            official: "Saint-Martin",
            common: "Saint-Martin"
          }
        }
      },
      altSpellings: [
        "MF",
        "Collectivity of Saint Martin",
        "Collectivit\xE9 de Saint-Martin",
        "Saint Martin (French part)"
      ]
    },
    {
      name: {
        common: "Latvia",
        official: "Republic of Latvia",
        nativeName: {
          lav: {
            official: "Latvijas Republikas",
            common: "Latvija"
          }
        }
      },
      altSpellings: ["LV", "Republic of Latvia", "Latvijas Republika"]
    },
    {
      name: {
        common: "Guatemala",
        official: "Republic of Guatemala",
        nativeName: {
          spa: {
            official: "Rep\xFAblica de Guatemala",
            common: "Guatemala"
          }
        }
      },
      altSpellings: ["GT"]
    },
    {
      name: {
        common: "Kuwait",
        official: "State of Kuwait",
        nativeName: {
          ara: {
            official: "\u062F\u0648\u0644\u0629 \u0627\u0644\u0643\u0648\u064A\u062A",
            common: "\u0627\u0644\u0643\u0648\u064A\u062A"
          }
        }
      },
      altSpellings: ["KW", "State of Kuwait", "Dawlat al-Kuwait"]
    },
    {
      name: {
        common: "S\xE3o Tom\xE9 and Pr\xEDncipe",
        official: "Democratic Republic of S\xE3o Tom\xE9 and Pr\xEDncipe",
        nativeName: {
          por: {
            official: "Rep\xFAblica Democr\xE1tica do S\xE3o Tom\xE9 e Pr\xEDncipe",
            common: "S\xE3o Tom\xE9 e Pr\xEDncipe"
          }
        }
      },
      altSpellings: [
        "ST",
        "Democratic Republic of S\xE3o Tom\xE9 and Pr\xEDncipe",
        "Sao Tome and Principe",
        "Rep\xFAblica Democr\xE1tica de S\xE3o Tom\xE9 e Pr\xEDncipe"
      ]
    },
    {
      name: {
        common: "Kyrgyzstan",
        official: "Kyrgyz Republic",
        nativeName: {
          kir: {
            official: "\u041A\u044B\u0440\u0433\u044B\u0437 \u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0441\u044B",
            common: "\u041A\u044B\u0440\u0433\u044B\u0437\u0441\u0442\u0430\u043D"
          },
          rus: {
            official: "\u041A\u044B\u0440\u0433\u044B\u0437\u0441\u043A\u0430\u044F \u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430",
            common: "\u041A\u0438\u0440\u0433\u0438\u0437\u0438\u044F"
          }
        }
      },
      altSpellings: [
        "KG",
        "\u041A\u0438\u0440\u0433\u0438\u0437\u0438\u044F",
        "Kyrgyz Republic",
        "\u041A\u044B\u0440\u0433\u044B\u0437 \u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0441\u044B",
        "Kyrgyz Respublikasy"
      ]
    },
    {
      name: {
        common: "Poland",
        official: "Republic of Poland",
        nativeName: {
          pol: {
            official: "Rzeczpospolita Polska",
            common: "Polska"
          }
        }
      },
      altSpellings: ["PL", "Republic of Poland", "Rzeczpospolita Polska"]
    },
    {
      name: {
        common: "Guam",
        official: "Guam",
        nativeName: {
          cha: {
            official: "Gu\xE5h\xE5n",
            common: "Gu\xE5h\xE5n"
          },
          eng: {
            official: "Guam",
            common: "Guam"
          },
          spa: {
            official: "Guam",
            common: "Guam"
          }
        }
      },
      altSpellings: ["GU", "Gu\xE5h\xE5n"]
    },
    {
      name: {
        common: "Ghana",
        official: "Republic of Ghana",
        nativeName: {
          eng: {
            official: "Republic of Ghana",
            common: "Ghana"
          }
        }
      },
      altSpellings: ["GH"]
    },
    {
      name: {
        common: "Lithuania",
        official: "Republic of Lithuania",
        nativeName: {
          lit: {
            official: "Lietuvos Respublikos",
            common: "Lietuva"
          }
        }
      },
      altSpellings: [
        "LT",
        "Republic of Lithuania",
        "Lietuvos Respublika"
      ]
    },
    {
      name: {
        common: "Armenia",
        official: "Republic of Armenia",
        nativeName: {
          hye: {
            official: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576\u056B \u0540\u0561\u0576\u0580\u0561\u057A\u0565\u057F\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
            common: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576"
          }
        }
      },
      altSpellings: [
        "AM",
        "Hayastan",
        "Republic of Armenia",
        "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576\u056B \u0540\u0561\u0576\u0580\u0561\u057A\u0565\u057F\u0578\u0582\u0569\u0575\u0578\u0582\u0576"
      ]
    },
    {
      name: {
        common: "Jersey",
        official: "Bailiwick of Jersey",
        nativeName: {
          eng: {
            official: "Bailiwick of Jersey",
            common: "Jersey"
          },
          fra: {
            official: "Bailliage de Jersey",
            common: "Jersey"
          },
          nrf: {
            official: "Bailliage d\xE9 J\xE8rri",
            common: "J\xE8rri"
          }
        }
      },
      altSpellings: [
        "JE",
        "Bailiwick of Jersey",
        "Bailliage de Jersey",
        "Bailliage d\xE9 J\xE8rri"
      ]
    },
    {
      name: {
        common: "Grenada",
        official: "Grenada",
        nativeName: {
          eng: {
            official: "Grenada",
            common: "Grenada"
          }
        }
      },
      altSpellings: ["GD"]
    },
    {
      name: {
        common: "Tajikistan",
        official: "Republic of Tajikistan",
        nativeName: {
          rus: {
            official: "\u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0422\u0430\u0434\u0436\u0438\u043A\u0438\u0441\u0442\u0430\u043D",
            common: "\u0422\u0430\u0434\u0436\u0438\u043A\u0438\u0441\u0442\u0430\u043D"
          },
          tgk: {
            official: "\u04B6\u0443\u043C\u04B3\u0443\u0440\u0438\u0438 \u0422\u043E\u04B7\u0438\u043A\u0438\u0441\u0442\u043E\u043D",
            common: "\u0422\u043E\u04B7\u0438\u043A\u0438\u0441\u0442\u043E\u043D"
          }
        }
      },
      altSpellings: [
        "TJ",
        "To\xE7ikiston",
        "Republic of Tajikistan",
        "\u04B6\u0443\u043C\u04B3\u0443\u0440\u0438\u0438 \u0422\u043E\u04B7\u0438\u043A\u0438\u0441\u0442\u043E\u043D",
        "\xC7umhuriyi To\xE7ikiston"
      ]
    },
    {
      name: {
        common: "Ethiopia",
        official: "Federal Democratic Republic of Ethiopia",
        nativeName: {
          amh: {
            official: "\u12E8\u12A2\u1275\u12EE\u1335\u12EB \u134C\u12F4\u122B\u120B\u12CA \u12F2\u121E\u12AD\u122B\u1232\u12EB\u12CA \u122A\u1350\u1265\u120A\u12AD",
            common: "\u12A2\u1275\u12EE\u1335\u12EB"
          }
        }
      },
      altSpellings: [
        "ET",
        "\u02BE\u012Aty\u014D\u1E57\u1E57y\u0101",
        "Federal Democratic Republic of Ethiopia",
        "\u12E8\u12A2\u1275\u12EE\u1335\u12EB \u134C\u12F4\u122B\u120B\u12CA \u12F2\u121E\u12AD\u122B\u1232\u12EB\u12CA \u122A\u1350\u1265\u120A\u12AD"
      ]
    },
    {
      name: {
        common: "Western Sahara",
        official: "Sahrawi Arab Democratic Republic",
        nativeName: {
          ber: {
            official: "Sahrawi Arab Democratic Republic",
            common: "Western Sahara"
          },
          mey: {
            official: "\u0627\u0644\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0635\u062D\u0631\u0627\u0648\u064A\u0629 \u0627\u0644\u062F\u064A\u0645\u0642\u0631\u0627\u0637\u064A\u0629",
            common: "\u0627\u0644\u0635\u062D\u0631\u0627\u0621 \u0627\u0644\u063A\u0631\u0628\u064A\u0629"
          },
          spa: {
            official: "Rep\xFAblica \xC1rabe Saharaui Democr\xE1tica",
            common: "Sahara Occidental"
          }
        }
      },
      altSpellings: ["EH", "Tane\u1E93roft Tutrimt"]
    },
    {
      name: {
        common: "Morocco",
        official: "Kingdom of Morocco",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0645\u063A\u0631\u0628\u064A\u0629",
            common: "\u0627\u0644\u0645\u063A\u0631\u0628"
          },
          ber: {
            official: "\u2D5C\u2D30\u2D33\u2D4D\u2D37\u2D49\u2D5C \u2D4F \u2D4D\u2D4E\u2D56\u2D54\u2D49\u2D31",
            common: "\u2D4D\u2D4E\u2D30\u2D56\u2D54\u2D49\u2D31"
          }
        }
      },
      altSpellings: [
        "MA",
        "Kingdom of Morocco",
        "Al-Mamlakah al-Ma\u0121ribiyah"
      ]
    },
    {
      name: {
        common: "Puerto Rico",
        official: "Commonwealth of Puerto Rico",
        nativeName: {
          eng: {
            official: "Commonwealth of Puerto Rico",
            common: "Puerto Rico"
          },
          spa: {
            official: "Estado Libre Asociado de Puerto Rico",
            common: "Puerto Rico"
          }
        }
      },
      altSpellings: [
        "PR",
        "Commonwealth of Puerto Rico",
        "Estado Libre Asociado de Puerto Rico"
      ]
    },
    {
      name: {
        common: "Christmas Island",
        official: "Territory of Christmas Island",
        nativeName: {
          eng: {
            official: "Territory of Christmas Island",
            common: "Christmas Island"
          }
        }
      },
      altSpellings: ["CX", "Territory of Christmas Island"]
    },
    {
      name: {
        common: "New Zealand",
        official: "New Zealand",
        nativeName: {
          eng: {
            official: "New Zealand",
            common: "New Zealand"
          },
          mri: {
            official: "Aotearoa",
            common: "Aotearoa"
          },
          nzs: {
            official: "New Zealand",
            common: "New Zealand"
          }
        }
      },
      altSpellings: ["NZ", "Aotearoa"]
    },
    {
      name: {
        common: "Brunei",
        official: "Nation of Brunei, Abode of Peace",
        nativeName: {
          msa: {
            official: "Nation of Brunei, Abode Damai",
            common: "Negara Brunei Darussalam"
          }
        }
      },
      altSpellings: [
        "BN",
        "Brunei Darussalam",
        "Nation of Brunei",
        "the Abode of Peace"
      ]
    },
    {
      name: {
        common: "French Guiana",
        official: "Guiana",
        nativeName: {
          fra: {
            official: "Guyane",
            common: "Guyane fran\xE7aise"
          }
        }
      },
      altSpellings: ["GF", "Guiana", "Guyane"]
    },
    {
      name: {
        common: "Niue",
        official: "Niue",
        nativeName: {
          eng: {
            official: "Niue",
            common: "Niue"
          },
          niu: {
            official: "Niu\u0113",
            common: "Niu\u0113"
          }
        }
      },
      altSpellings: ["NU"]
    },
    {
      name: {
        common: "Romania",
        official: "Romania",
        nativeName: {
          ron: {
            official: "Rom\xE2nia",
            common: "Rom\xE2nia"
          }
        }
      },
      altSpellings: ["RO", "Rumania", "Roumania", "Rom\xE2nia"]
    },
    {
      name: {
        common: "Svalbard and Jan Mayen",
        official: "Svalbard og Jan Mayen",
        nativeName: {
          nor: {
            official: "Svalbard og Jan Mayen",
            common: "Svalbard og Jan Mayen"
          }
        }
      },
      altSpellings: ["SJ", "Svalbard and Jan Mayen Islands"]
    },
    {
      name: {
        common: "Belarus",
        official: "Republic of Belarus",
        nativeName: {
          bel: {
            official: "\u0420\u044D\u0441\u043F\u0443\u0431\u043B\u0456\u043A\u0430 \u0411\u0435\u043B\u0430\u0440\u0443\u0441\u044C",
            common: "\u0411\u0435\u043B\u0430\u0440\u0443\u0301\u0441\u044C"
          },
          rus: {
            official: "\u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0411\u0435\u043B\u0430\u0440\u0443\u0441\u044C",
            common: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u044C"
          }
        }
      },
      altSpellings: [
        "BY",
        "Bielaru\u015B",
        "Republic of Belarus",
        "\u0411\u0435\u043B\u043E\u0440\u0443\u0441\u0441\u0438\u044F",
        "\u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0411\u0435\u043B\u043E\u0440\u0443\u0441\u0441\u0438\u044F"
      ]
    },
    {
      name: {
        common: "Panama",
        official: "Republic of Panama",
        nativeName: {
          spa: {
            official: "Rep\xFAblica de Panam\xE1",
            common: "Panam\xE1"
          }
        }
      },
      altSpellings: ["PA", "Republic of Panama", "Rep\xFAblica de Panam\xE1"]
    },
    {
      name: {
        common: "Cameroon",
        official: "Republic of Cameroon",
        nativeName: {
          eng: {
            official: "Republic of Cameroon",
            common: "Cameroon"
          },
          fra: {
            official: "R\xE9publique du Cameroun",
            common: "Cameroun"
          }
        }
      },
      altSpellings: [
        "CM",
        "Republic of Cameroon",
        "R\xE9publique du Cameroun"
      ]
    },
    {
      name: {
        common: "Czechia",
        official: "Czech Republic",
        nativeName: {
          ces: {
            official: "\u010Cesk\xE1 republika",
            common: "\u010Cesko"
          },
          slk: {
            official: "\u010Cesk\xE1 republika",
            common: "\u010Cesko"
          }
        }
      },
      altSpellings: ["CZ", "\u010Cesk\xE1 republika", "\u010Cesko"]
    },
    {
      name: {
        common: "Saint Barth\xE9lemy",
        official: "Collectivity of Saint Barth\xE9lemy",
        nativeName: {
          fra: {
            official: "Collectivit\xE9 de Saint-Barth\xE9lemy",
            common: "Saint-Barth\xE9lemy"
          }
        }
      },
      altSpellings: [
        "BL",
        "St. Barthelemy",
        "Collectivity of Saint Barth\xE9lemy",
        "Collectivit\xE9 de Saint-Barth\xE9lemy"
      ]
    },
    {
      name: {
        common: "Greece",
        official: "Hellenic Republic",
        nativeName: {
          ell: {
            official: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AE \u0394\u03B7\u03BC\u03BF\u03BA\u03C1\u03B1\u03C4\u03AF\u03B1",
            common: "\u0395\u03BB\u03BB\u03AC\u03B4\u03B1"
          }
        }
      },
      altSpellings: [
        "GR",
        "Ell\xE1da",
        "Hellenic Republic",
        "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AE \u0394\u03B7\u03BC\u03BF\u03BA\u03C1\u03B1\u03C4\u03AF\u03B1"
      ]
    },
    {
      name: {
        common: "Mali",
        official: "Republic of Mali",
        nativeName: {
          fra: {
            official: "R\xE9publique du Mali",
            common: "Mali"
          }
        }
      },
      altSpellings: ["ML", "Republic of Mali", "R\xE9publique du Mali"]
    },
    {
      name: {
        common: "Martinique",
        official: "Martinique",
        nativeName: {
          fra: {
            official: "Martinique",
            common: "Martinique"
          }
        }
      },
      altSpellings: ["MQ"]
    },
    {
      name: {
        common: "France",
        official: "French Republic",
        nativeName: {
          fra: {
            official: "R\xE9publique fran\xE7aise",
            common: "France"
          }
        }
      },
      altSpellings: ["FR", "French Republic", "R\xE9publique fran\xE7aise"]
    },
    {
      name: {
        common: "Pakistan",
        official: "Islamic Republic of Pakistan",
        nativeName: {
          eng: {
            official: "Islamic Republic of Pakistan",
            common: "Pakistan"
          },
          urd: {
            official: "\u0627\u0633\u0644\u0627\u0645\u06CC \u062C\u0645\u06C1\u0648\u0631\u06CC\u06C2 \u067E\u0627\u0643\u0633\u062A\u0627\u0646",
            common: "\u067E\u0627\u0643\u0633\u062A\u0627\u0646"
          }
        }
      },
      altSpellings: [
        "PK",
        "P\u0101kist\u0101n",
        "Islamic Republic of Pakistan",
        "Isl\u0101m\u012B Jumh\u016Briya'eh P\u0101kist\u0101n"
      ]
    },
    {
      name: {
        common: "Peru",
        official: "Republic of Peru",
        nativeName: {
          aym: {
            official: "Piruw Suyu",
            common: "Piruw"
          },
          que: {
            official: "Piruw Ripuwlika",
            common: "Piruw"
          },
          spa: {
            official: "Rep\xFAblica del Per\xFA",
            common: "Per\xFA"
          }
        }
      },
      altSpellings: ["PE", "Republic of Peru", "Rep\xFAblica del Per\xFA"]
    },
    {
      name: {
        common: "Barbados",
        official: "Barbados",
        nativeName: {
          eng: {
            official: "Barbados",
            common: "Barbados"
          }
        }
      },
      altSpellings: ["BB"]
    },
    {
      name: {
        common: "Greenland",
        official: "Greenland",
        nativeName: {
          kal: {
            official: "Kalaallit Nunaat",
            common: "Kalaallit Nunaat"
          }
        }
      },
      altSpellings: ["GL", "Gr\xF8nland"]
    },
    {
      name: {
        common: "Saint Pierre and Miquelon",
        official: "Saint Pierre and Miquelon",
        nativeName: {
          fra: {
            official: "Collectivit\xE9 territoriale de Saint-Pierre-et-Miquelon",
            common: "Saint-Pierre-et-Miquelon"
          }
        }
      },
      altSpellings: [
        "PM",
        "Collectivit\xE9 territoriale de Saint-Pierre-et-Miquelon"
      ]
    },
    {
      name: {
        common: "Chad",
        official: "Republic of Chad",
        nativeName: {
          ara: {
            official: "\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u062A\u0634\u0627\u062F",
            common: "\u062A\u0634\u0627\u062F\u200E"
          },
          fra: {
            official: "R\xE9publique du Tchad",
            common: "Tchad"
          }
        }
      },
      altSpellings: [
        "TD",
        "Tchad",
        "Republic of Chad",
        "R\xE9publique du Tchad"
      ]
    },
    {
      name: {
        common: "Hungary",
        official: "Hungary",
        nativeName: {
          hun: {
            official: "Magyarorsz\xE1g",
            common: "Magyarorsz\xE1g"
          }
        }
      },
      altSpellings: ["HU"]
    },
    {
      name: {
        common: "Comoros",
        official: "Union of the Comoros",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u0627\u062A\u062D\u0627\u062F \u0627\u0644\u0642\u0645\u0631\u064A",
            common: "\u0627\u0644\u0642\u0645\u0631\u200E"
          },
          fra: {
            official: "Union des Comores",
            common: "Comores"
          },
          zdj: {
            official: "Udzima wa Komori",
            common: "Komori"
          }
        }
      },
      altSpellings: [
        "KM",
        "Union of the Comoros",
        "Union des Comores",
        "Udzima wa Komori",
        "al-Itti\u1E25\u0101d al-Qumur\u012B"
      ]
    },
    {
      name: {
        common: "Bangladesh",
        official: "People's Republic of Bangladesh",
        nativeName: {
          ben: {
            official: "\u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6 \u0997\u09A3\u09AA\u09CD\u09B0\u099C\u09BE\u09A4\u09A8\u09CD\u09A4\u09CD\u09B0\u09C0",
            common: "\u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6"
          }
        }
      },
      altSpellings: [
        "BD",
        "People's Republic of Bangladesh",
        "G\xF4n\xF4pr\xF4jat\xF4ntri Bangladesh"
      ]
    },
    {
      name: {
        common: "Tokelau",
        official: "Tokelau",
        nativeName: {
          eng: {
            official: "Tokelau",
            common: "Tokelau"
          },
          smo: {
            official: "Tokelau",
            common: "Tokelau"
          },
          tkl: {
            official: "Tokelau",
            common: "Tokelau"
          }
        }
      },
      altSpellings: ["TK"]
    },
    {
      name: {
        common: "Fiji",
        official: "Republic of Fiji",
        nativeName: {
          eng: {
            official: "Republic of Fiji",
            common: "Fiji"
          },
          fij: {
            official: "Matanitu Tugalala o Viti",
            common: "Viti"
          },
          hif: {
            official: "\u0930\u093F\u092A\u092C\u094D\u0932\u093F\u0915 \u0911\u092B \u092B\u0940\u091C\u0940",
            common: "\u092B\u093F\u091C\u0940"
          }
        }
      },
      altSpellings: [
        "FJ",
        "Viti",
        "Republic of Fiji",
        "Matanitu ko Viti",
        "Fij\u012B Ga\u1E47ar\u0101jya"
      ]
    },
    {
      name: {
        common: "China",
        official: "People's Republic of China",
        nativeName: {
          zho: {
            official: "\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD",
            common: "\u4E2D\u56FD"
          }
        }
      },
      altSpellings: [
        "CN",
        "Zh\u014Dnggu\xF3",
        "Zhongguo",
        "Zhonghua",
        "People's Republic of China",
        "\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD",
        "Zh\u014Dnghu\xE1 R\xE9nm\xEDn G\xF2ngh\xE9gu\xF3"
      ]
    },
    {
      name: {
        common: "Colombia",
        official: "Republic of Colombia",
        nativeName: {
          spa: {
            official: "Rep\xFAblica de Colombia",
            common: "Colombia"
          }
        }
      },
      altSpellings: [
        "CO",
        "Republic of Colombia",
        "Rep\xFAblica de Colombia"
      ]
    },
    {
      name: {
        common: "British Virgin Islands",
        official: "Virgin Islands",
        nativeName: {
          eng: {
            official: "Virgin Islands",
            common: "British Virgin Islands"
          }
        }
      },
      altSpellings: ["VG", "Virgin Islands, British"]
    },
    {
      name: {
        common: "Algeria",
        official: "People's Democratic Republic of Algeria",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u062F\u064A\u0645\u0642\u0631\u0627\u0637\u064A\u0629 \u0627\u0644\u0634\u0639\u0628\u064A\u0629 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u064A\u0629",
            common: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631"
          }
        }
      },
      altSpellings: ["DZ", "Dzayer", "Alg\xE9rie"]
    },
    {
      name: {
        common: "Maldives",
        official: "Republic of the Maldives",
        nativeName: {
          div: {
            official: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0783\u07A7\u0787\u07B0\u0796\u07AD\u078E\u07AC \u0796\u07AA\u0789\u07B0\u0780\u07AB\u0783\u07A8\u0787\u07B0\u0794\u07A7",
            common: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0783\u07A7\u0787\u07B0\u0796\u07AD\u078E\u07AC"
          }
        }
      },
      altSpellings: [
        "MV",
        "Maldive Islands",
        "Republic of the Maldives",
        "Dhivehi Raajjeyge Jumhooriyya"
      ]
    },
    {
      name: {
        common: "Malaysia",
        official: "Malaysia",
        nativeName: {
          eng: {
            official: "Malaysia",
            common: "Malaysia"
          },
          msa: {
            official: "\u0645\u0644\u064A\u0633\u064A\u0627",
            common: "\u0645\u0644\u064A\u0633\u064A\u0627"
          }
        }
      },
      altSpellings: ["MY"]
    },
    {
      name: {
        common: "Cayman Islands",
        official: "Cayman Islands",
        nativeName: {
          eng: {
            official: "Cayman Islands",
            common: "Cayman Islands"
          }
        }
      },
      altSpellings: ["KY"]
    },
    {
      name: {
        common: "Spain",
        official: "Kingdom of Spain",
        nativeName: {
          spa: {
            official: "Reino de Espa\xF1a",
            common: "Espa\xF1a"
          }
        }
      },
      altSpellings: ["ES", "Kingdom of Spain", "Reino de Espa\xF1a"]
    },
    {
      name: {
        common: "Ireland",
        official: "Republic of Ireland",
        nativeName: {
          eng: {
            official: "Republic of Ireland",
            common: "Ireland"
          },
          gle: {
            official: "Poblacht na h\xC9ireann",
            common: "\xC9ire"
          }
        }
      },
      altSpellings: [
        "IE",
        "\xC9ire",
        "Republic of Ireland",
        "Poblacht na h\xC9ireann"
      ]
    },
    {
      name: {
        common: "Estonia",
        official: "Republic of Estonia",
        nativeName: {
          est: {
            official: "Eesti Vabariik",
            common: "Eesti"
          }
        }
      },
      altSpellings: [
        "EE",
        "Eesti",
        "Republic of Estonia",
        "Eesti Vabariik"
      ]
    },
    {
      name: {
        common: "Paraguay",
        official: "Republic of Paraguay",
        nativeName: {
          grn: {
            official: "Tet\xE3 Paragu\xE1i",
            common: "Paragu\xE1i"
          },
          spa: {
            official: "Rep\xFAblica de Paraguay",
            common: "Paraguay"
          }
        }
      },
      altSpellings: [
        "PY",
        "Republic of Paraguay",
        "Rep\xFAblica del Paraguay",
        "Tet\xE3 Paragu\xE1i"
      ]
    },
    {
      name: {
        common: "Uruguay",
        official: "Oriental Republic of Uruguay",
        nativeName: {
          spa: {
            official: "Rep\xFAblica Oriental del Uruguay",
            common: "Uruguay"
          }
        }
      },
      altSpellings: [
        "UY",
        "Oriental Republic of Uruguay",
        "Rep\xFAblica Oriental del Uruguay"
      ]
    },
    {
      name: {
        common: "South Africa",
        official: "Republic of South Africa",
        nativeName: {
          afr: {
            official: "Republiek van Suid-Afrika",
            common: "South Africa"
          },
          eng: {
            official: "Republic of South Africa",
            common: "South Africa"
          },
          nbl: {
            official: "IRiphabliki yeSewula Afrika",
            common: "Sewula Afrika"
          },
          nso: {
            official: "Rephaboliki ya Afrika-Borwa ",
            common: "Afrika-Borwa"
          },
          sot: {
            official: "Rephaboliki ya Afrika Borwa",
            common: "Afrika Borwa"
          },
          ssw: {
            official: "IRiphabhulikhi yeNingizimu Afrika",
            common: "Ningizimu Afrika"
          },
          tsn: {
            official: "Rephaboliki ya Aforika Borwa",
            common: "Aforika Borwa"
          },
          tso: {
            official: "Riphabliki ra Afrika Dzonga",
            common: "Afrika Dzonga"
          },
          ven: {
            official: "Riphabu\u1E3Diki ya Afurika Tshipembe",
            common: "Afurika Tshipembe"
          },
          xho: {
            official: "IRiphabliki yaseMzantsi Afrika",
            common: "Mzantsi Afrika"
          },
          zul: {
            official: "IRiphabliki yaseNingizimu Afrika",
            common: "Ningizimu Afrika"
          }
        }
      },
      altSpellings: [
        "ZA",
        "RSA",
        "Suid-Afrika",
        "Republic of South Africa"
      ]
    },
    {
      name: {
        common: "Saint Lucia",
        official: "Saint Lucia",
        nativeName: {
          eng: {
            official: "Saint Lucia",
            common: "Saint Lucia"
          }
        }
      },
      altSpellings: ["LC"]
    },
    {
      name: {
        common: "Vanuatu",
        official: "Republic of Vanuatu",
        nativeName: {
          bis: {
            official: "Ripablik blong Vanuatu",
            common: "Vanuatu"
          },
          eng: {
            official: "Republic of Vanuatu",
            common: "Vanuatu"
          },
          fra: {
            official: "R\xE9publique de Vanuatu",
            common: "Vanuatu"
          }
        }
      },
      altSpellings: [
        "VU",
        "Republic of Vanuatu",
        "Ripablik blong Vanuatu",
        "R\xE9publique de Vanuatu"
      ]
    },
    {
      name: {
        common: "Finland",
        official: "Republic of Finland",
        nativeName: {
          fin: {
            official: "Suomen tasavalta",
            common: "Suomi"
          },
          swe: {
            official: "Republiken Finland",
            common: "Finland"
          }
        }
      },
      altSpellings: [
        "FI",
        "Suomi",
        "Republic of Finland",
        "Suomen tasavalta",
        "Republiken Finland"
      ]
    },
    {
      name: {
        common: "Sweden",
        official: "Kingdom of Sweden",
        nativeName: {
          swe: {
            official: "Konungariket Sverige",
            common: "Sverige"
          }
        }
      },
      altSpellings: ["SE", "Kingdom of Sweden", "Konungariket Sverige"]
    },
    {
      name: {
        common: "British Indian Ocean Territory",
        official: "British Indian Ocean Territory",
        nativeName: {
          eng: {
            official: "British Indian Ocean Territory",
            common: "British Indian Ocean Territory"
          }
        }
      },
      altSpellings: ["IO"]
    },
    {
      name: {
        common: "Lebanon",
        official: "Lebanese Republic",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u0644\u0628\u0646\u0627\u0646\u064A\u0629",
            common: "\u0644\u0628\u0646\u0627\u0646"
          },
          fra: {
            official: "R\xE9publique libanaise",
            common: "Liban"
          }
        }
      },
      altSpellings: [
        "LB",
        "Lebanese Republic",
        "Al-Jumh\u016Br\u012Byah Al-Libn\u0101n\u012Byah"
      ]
    },
    {
      name: {
        common: "United States",
        official: "United States of America",
        nativeName: {
          eng: {
            official: "United States of America",
            common: "United States"
          }
        }
      },
      altSpellings: ["US", "USA", "United States of America"]
    },
    {
      name: {
        common: "Chile",
        official: "Republic of Chile",
        nativeName: {
          spa: {
            official: "Rep\xFAblica de Chile",
            common: "Chile"
          }
        }
      },
      altSpellings: ["CL", "Republic of Chile", "Rep\xFAblica de Chile"]
    },
    {
      name: {
        common: "Norfolk Island",
        official: "Territory of Norfolk Island",
        nativeName: {
          eng: {
            official: "Territory of Norfolk Island",
            common: "Norfolk Island"
          },
          pih: {
            official: "Teratri of Norf'k Ailen",
            common: "Norf'k Ailen"
          }
        }
      },
      altSpellings: [
        "NF",
        "Territory of Norfolk Island",
        "Teratri of Norf'k Ailen"
      ]
    },
    {
      name: {
        common: "Montserrat",
        official: "Montserrat",
        nativeName: {
          eng: {
            official: "Montserrat",
            common: "Montserrat"
          }
        }
      },
      altSpellings: ["MS"]
    },
    {
      name: {
        common: "Australia",
        official: "Commonwealth of Australia",
        nativeName: {
          eng: {
            official: "Commonwealth of Australia",
            common: "Australia"
          }
        }
      },
      altSpellings: ["AU"]
    },
    {
      name: {
        common: "Belize",
        official: "Belize",
        nativeName: {
          bjz: {
            official: "Belize",
            common: "Belize"
          },
          eng: {
            official: "Belize",
            common: "Belize"
          },
          spa: {
            official: "Belice",
            common: "Belice"
          }
        }
      },
      altSpellings: ["BZ"]
    },
    {
      name: {
        common: "Guyana",
        official: "Co-operative Republic of Guyana",
        nativeName: {
          eng: {
            official: "Co-operative Republic of Guyana",
            common: "Guyana"
          }
        }
      },
      altSpellings: ["GY", "Co-operative Republic of Guyana"]
    },
    {
      name: {
        common: "Mongolia",
        official: "Mongolia",
        nativeName: {
          mon: {
            official: "\u041C\u043E\u043D\u0433\u043E\u043B \u0443\u043B\u0441",
            common: "\u041C\u043E\u043D\u0433\u043E\u043B \u0443\u043B\u0441"
          }
        }
      },
      altSpellings: ["MN"]
    },
    {
      name: {
        common: "Tuvalu",
        official: "Tuvalu",
        nativeName: {
          eng: {
            official: "Tuvalu",
            common: "Tuvalu"
          },
          tvl: {
            official: "Tuvalu",
            common: "Tuvalu"
          }
        }
      },
      altSpellings: ["TV"]
    },
    {
      name: {
        common: "Dominican Republic",
        official: "Dominican Republic",
        nativeName: {
          spa: {
            official: "Rep\xFAblica Dominicana",
            common: "Rep\xFAblica Dominicana"
          }
        }
      },
      altSpellings: ["DO"]
    },
    {
      name: {
        common: "Equatorial Guinea",
        official: "Republic of Equatorial Guinea",
        nativeName: {
          fra: {
            official: "R\xE9publique de la Guin\xE9e \xC9quatoriale",
            common: "Guin\xE9e \xE9quatoriale"
          },
          por: {
            official: "Rep\xFAblica da Guin\xE9 Equatorial",
            common: "Guin\xE9 Equatorial"
          },
          spa: {
            official: "Rep\xFAblica de Guinea Ecuatorial",
            common: "Guinea Ecuatorial"
          }
        }
      },
      altSpellings: [
        "GQ",
        "Republic of Equatorial Guinea",
        "Rep\xFAblica de Guinea Ecuatorial",
        "R\xE9publique de Guin\xE9e \xE9quatoriale",
        "Rep\xFAblica da Guin\xE9 Equatorial"
      ]
    },
    {
      name: {
        common: "Saint Kitts and Nevis",
        official: "Federation of Saint Christopher and Nevis",
        nativeName: {
          eng: {
            official: "Federation of Saint Christopher and Nevis",
            common: "Saint Kitts and Nevis"
          }
        }
      },
      altSpellings: ["KN", "Federation of Saint Christopher and Nevis"]
    },
    {
      name: {
        common: "Bolivia",
        official: "Plurinational State of Bolivia",
        nativeName: {
          aym: {
            official: "Wuliwya Suyu",
            common: "Wuliwya"
          },
          grn: {
            official: "Tet\xE3 Vol\xEDvia",
            common: "Vol\xEDvia"
          },
          que: {
            official: "Buliwya Mamallaqta",
            common: "Buliwya"
          },
          spa: {
            official: "Estado Plurinacional de Bolivia",
            common: "Bolivia"
          }
        }
      },
      altSpellings: [
        "BO",
        "Buliwya",
        "Wuliwya",
        "Bolivia, Plurinational State of",
        "Plurinational State of Bolivia",
        "Estado Plurinacional de Bolivia",
        "Buliwya Mamallaqta",
        "Wuliwya Suyu",
        "Tet\xE3 Vol\xEDvia"
      ]
    },
    {
      name: {
        common: "Nepal",
        official: "Federal Democratic Republic of Nepal",
        nativeName: {
          nep: {
            official: "\u0928\u0947\u092A\u093E\u0932 \u0938\u0902\u0918\u0940\u092F \u0932\u094B\u0915\u0924\u093E\u0928\u094D\u0924\u094D\u0930\u093F\u0915 \u0917\u0923\u0924\u0928\u094D\u0924\u094D\u0930",
            common: "\u0928\u0947\u092A\u093E\u0932"
          }
        }
      },
      altSpellings: [
        "NP",
        "Federal Democratic Republic of Nepal",
        "Lokt\u0101ntrik Ganatantra Nep\u0101l"
      ]
    },
    {
      name: {
        common: "French Southern and Antarctic Lands",
        official: "Territory of the French Southern and Antarctic Lands",
        nativeName: {
          fra: {
            official: "Territoire des Terres australes et antarctiques fran\xE7aises",
            common: "Terres australes et antarctiques fran\xE7aises"
          }
        }
      },
      altSpellings: ["TF", "French Southern Territories"]
    },
    {
      name: {
        common: "Taiwan",
        official: "Republic of China (Taiwan)",
        nativeName: {
          zho: {
            official: "\u4E2D\u83EF\u6C11\u570B",
            common: "\u53F0\u7063"
          }
        }
      },
      altSpellings: [
        "TW",
        "T\xE1iw\u0101n",
        "Republic of China",
        "\u4E2D\u83EF\u6C11\u570B",
        "Zh\u014Dnghu\xE1 M\xEDngu\xF3",
        "Chinese Taipei"
      ]
    },
    {
      name: {
        common: "Benin",
        official: "Republic of Benin",
        nativeName: {
          fra: {
            official: "R\xE9publique du B\xE9nin",
            common: "B\xE9nin"
          }
        }
      },
      altSpellings: ["BJ", "Republic of Benin", "R\xE9publique du B\xE9nin"]
    },
    {
      name: {
        common: "Bulgaria",
        official: "Republic of Bulgaria",
        nativeName: {
          bul: {
            official: "\u0420\u0435\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F",
            common: "\u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F"
          }
        }
      },
      altSpellings: ["BG", "Republic of Bulgaria", "\u0420\u0435\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F"]
    },
    {
      name: {
        common: "Moldova",
        official: "Republic of Moldova",
        nativeName: {
          ron: {
            official: "Republica Moldova",
            common: "Moldova"
          }
        }
      },
      altSpellings: [
        "MD",
        "Moldova, Republic of",
        "Republic of Moldova",
        "Republica Moldova"
      ]
    },
    {
      name: {
        common: "Isle of Man",
        official: "Isle of Man",
        nativeName: {
          eng: {
            official: "Isle of Man",
            common: "Isle of Man"
          },
          glv: {
            official: "Ellan Vannin or Mannin",
            common: "Mannin"
          }
        }
      },
      altSpellings: ["IM", "Ellan Vannin", "Mann", "Mannin"]
    },
    {
      name: {
        common: "Bhutan",
        official: "Kingdom of Bhutan",
        nativeName: {
          dzo: {
            official: "\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F62\u0F92\u0FB1\u0F63\u0F0B\u0F41\u0F56\u0F0B",
            common: "\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B"
          }
        }
      },
      altSpellings: ["BT", "Kingdom of Bhutan"]
    },
    {
      name: {
        common: "Cambodia",
        official: "Kingdom of Cambodia",
        nativeName: {
          khm: {
            official: "\u1796\u17D2\u179A\u17C7\u179A\u17B6\u1787\u17B6\u178E\u17B6\u1785\u1780\u17D2\u179A\u1780\u1798\u17D2\u1796\u17BB\u1787\u17B6",
            common: "K\xE2mp\u016Dch\xE9a"
          }
        }
      },
      altSpellings: ["KH", "Kingdom of Cambodia"]
    },
    {
      name: {
        common: "Antigua and Barbuda",
        official: "Antigua and Barbuda",
        nativeName: {
          eng: {
            official: "Antigua and Barbuda",
            common: "Antigua and Barbuda"
          }
        }
      },
      altSpellings: ["AG"]
    },
    {
      name: {
        common: "Haiti",
        official: "Republic of Haiti",
        nativeName: {
          fra: {
            official: "R\xE9publique d'Ha\xEFti",
            common: "Ha\xEFti"
          },
          hat: {
            official: "Repiblik Ayiti",
            common: "Ayiti"
          }
        }
      },
      altSpellings: [
        "HT",
        "Republic of Haiti",
        "R\xE9publique d'Ha\xEFti",
        "Repiblik Ayiti"
      ]
    },
    {
      name: {
        common: "Cape Verde",
        official: "Republic of Cabo Verde",
        nativeName: {
          por: {
            official: "Rep\xFAblica de Cabo Verde",
            common: "Cabo Verde"
          }
        }
      },
      altSpellings: [
        "CV",
        "Republic of Cabo Verde",
        "Rep\xFAblica de Cabo Verde"
      ]
    },
    {
      name: {
        common: "Georgia",
        official: "Georgia",
        nativeName: {
          kat: {
            official: "\u10E1\u10D0\u10E5\u10D0\u10E0\u10D7\u10D5\u10D4\u10DA\u10DD",
            common: "\u10E1\u10D0\u10E5\u10D0\u10E0\u10D7\u10D5\u10D4\u10DA\u10DD"
          }
        }
      },
      altSpellings: ["GE", "Sakartvelo"]
    },
    {
      name: {
        common: "Burundi",
        official: "Republic of Burundi",
        nativeName: {
          fra: {
            official: "R\xE9publique du Burundi",
            common: "Burundi"
          },
          run: {
            official: "Republika y'Uburundi ",
            common: "Uburundi"
          }
        }
      },
      altSpellings: [
        "BI",
        "Republic of Burundi",
        "Republika y'Uburundi",
        "R\xE9publique du Burundi"
      ]
    },
    {
      name: {
        common: "Bahamas",
        official: "Commonwealth of the Bahamas",
        nativeName: {
          eng: {
            official: "Commonwealth of the Bahamas",
            common: "Bahamas"
          }
        }
      },
      altSpellings: ["BS", "Commonwealth of the Bahamas"]
    },
    {
      name: {
        common: "Mauritius",
        official: "Republic of Mauritius",
        nativeName: {
          eng: {
            official: "Republic of Mauritius",
            common: "Mauritius"
          },
          fra: {
            official: "R\xE9publique de Maurice",
            common: "Maurice"
          },
          mfe: {
            official: "Republik Moris",
            common: "Moris"
          }
        }
      },
      altSpellings: [
        "MU",
        "Republic of Mauritius",
        "R\xE9publique de Maurice"
      ]
    },
    {
      name: {
        common: "Libya",
        official: "State of Libya",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u062F\u0648\u0644\u0629 \u0644\u064A\u0628\u064A\u0627",
            common: "\u200F\u0644\u064A\u0628\u064A\u0627"
          }
        }
      },
      altSpellings: ["LY", "State of Libya", "Dawlat Libya"]
    },
    {
      name: {
        common: "Malawi",
        official: "Republic of Malawi",
        nativeName: {
          eng: {
            official: "Republic of Malawi",
            common: "Malawi"
          },
          nya: {
            official: "Chalo cha Malawi, Dziko la Mala\u0175i",
            common: "Mala\u0175i"
          }
        }
      },
      altSpellings: ["MW", "Republic of Malawi"]
    },
    {
      name: {
        common: "Mexico",
        official: "United Mexican States",
        nativeName: {
          spa: {
            official: "Estados Unidos Mexicanos",
            common: "M\xE9xico"
          }
        }
      },
      altSpellings: [
        "MX",
        "Mexicanos",
        "United Mexican States",
        "Estados Unidos Mexicanos"
      ]
    },
    {
      name: {
        common: "Eswatini",
        official: "Kingdom of Eswatini",
        nativeName: {
          eng: {
            official: "Kingdom of Eswatini",
            common: "Eswatini"
          },
          ssw: {
            official: "Umbuso weSwatini",
            common: "eSwatini"
          }
        }
      },
      altSpellings: [
        "SZ",
        "Swaziland",
        "weSwatini",
        "Swatini",
        "Ngwane",
        "Kingdom of Eswatini",
        "Umbuso weSwatini"
      ]
    },
    {
      name: {
        common: "Papua New Guinea",
        official: "Independent State of Papua New Guinea",
        nativeName: {
          eng: {
            official: "Independent State of Papua New Guinea",
            common: "Papua New Guinea"
          },
          hmo: {
            official: "Independen Stet bilong Papua Niugini",
            common: "Papua Niu Gini"
          },
          tpi: {
            official: "Independen Stet bilong Papua Niugini",
            common: "Papua Niugini"
          }
        }
      },
      altSpellings: [
        "PG",
        "Independent State of Papua New Guinea",
        "Independen Stet bilong Papua Niugini"
      ]
    },
    {
      name: {
        common: "Dominica",
        official: "Commonwealth of Dominica",
        nativeName: {
          eng: {
            official: "Commonwealth of Dominica",
            common: "Dominica"
          }
        }
      },
      altSpellings: [
        "DM",
        "Dominique",
        "Wai\u2018tu kubuli",
        "Commonwealth of Dominica"
      ]
    },
    {
      name: {
        common: "Liechtenstein",
        official: "Principality of Liechtenstein",
        nativeName: {
          deu: {
            official: "F\xFCrstentum Liechtenstein",
            common: "Liechtenstein"
          }
        }
      },
      altSpellings: [
        "LI",
        "Principality of Liechtenstein",
        "F\xFCrstentum Liechtenstein"
      ]
    },
    {
      name: {
        common: "Russia",
        official: "Russian Federation",
        nativeName: {
          rus: {
            official: "\u0420\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u0430\u044F \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u044F",
            common: "\u0420\u043E\u0441\u0441\u0438\u044F"
          }
        }
      },
      altSpellings: ["RU", "Russian Federation", "\u0420\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u0430\u044F \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u044F"]
    },
    {
      name: {
        common: "Israel",
        official: "State of Israel",
        nativeName: {
          ara: {
            official: "\u062F\u0648\u0644\u0629 \u0625\u0633\u0631\u0627\u0626\u064A\u0644",
            common: "\u0625\u0633\u0631\u0627\u0626\u064A\u0644"
          },
          heb: {
            official: "\u05DE\u05D3\u05D9\u05E0\u05EA \u05D9\u05E9\u05E8\u05D0\u05DC",
            common: "\u05D9\u05E9\u05E8\u05D0\u05DC"
          }
        }
      },
      altSpellings: ["IL", "State of Israel", "Med\u012Bnat Yisr\u0101'el"]
    },
    {
      name: {
        common: "Singapore",
        official: "Republic of Singapore",
        nativeName: {
          eng: {
            official: "Republic of Singapore",
            common: "Singapore"
          },
          zho: {
            official: "\u65B0\u52A0\u5761\u5171\u548C\u56FD",
            common: "\u65B0\u52A0\u5761"
          },
          msa: {
            official: "Republik Singapura",
            common: "Singapura"
          },
          tam: {
            official: "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD \u0B95\u0BC1\u0B9F\u0BBF\u0BAF\u0BB0\u0B9A\u0BC1",
            common: "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD"
          }
        }
      },
      altSpellings: [
        "SG",
        "Singapura",
        "Republik Singapura",
        "\u65B0\u52A0\u5761\u5171\u548C\u56FD"
      ]
    },
    {
      name: {
        common: "Uganda",
        official: "Republic of Uganda",
        nativeName: {
          eng: {
            official: "Republic of Uganda",
            common: "Uganda"
          },
          swa: {
            official: "Republic of Uganda",
            common: "Uganda"
          }
        }
      },
      altSpellings: ["UG", "Republic of Uganda", "Jamhuri ya Uganda"]
    },
    {
      name: {
        common: "Slovakia",
        official: "Slovak Republic",
        nativeName: {
          slk: {
            official: "Slovensk\xE1 republika",
            common: "Slovensko"
          }
        }
      },
      altSpellings: ["SK", "Slovak Republic", "Slovensk\xE1 republika"]
    },
    {
      name: {
        common: "Tonga",
        official: "Kingdom of Tonga",
        nativeName: {
          eng: {
            official: "Kingdom of Tonga",
            common: "Tonga"
          },
          ton: {
            official: "Kingdom of Tonga",
            common: "Tonga"
          }
        }
      },
      altSpellings: ["TO"]
    },
    {
      name: {
        common: "United Arab Emirates",
        official: "United Arab Emirates",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u062D\u062F\u0629",
            common: "\u062F\u0648\u0644\u0629 \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u062D\u062F\u0629"
          }
        }
      },
      altSpellings: ["AE", "UAE", "Emirates"]
    },
    {
      name: {
        common: "Mayotte",
        official: "Department of Mayotte",
        nativeName: {
          fra: {
            official: "D\xE9partement de Mayotte",
            common: "Mayotte"
          }
        }
      },
      altSpellings: [
        "YT",
        "Department of Mayotte",
        "D\xE9partement de Mayotte"
      ]
    },
    {
      name: {
        common: "Suriname",
        official: "Republic of Suriname",
        nativeName: {
          nld: {
            official: "Republiek Suriname",
            common: "Suriname"
          }
        }
      },
      altSpellings: [
        "SR",
        "Sarnam",
        "Sranangron",
        "Republic of Suriname",
        "Republiek Suriname"
      ]
    },
    {
      name: {
        common: "Uzbekistan",
        official: "Republic of Uzbekistan",
        nativeName: {
          rus: {
            official: "\u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D",
            common: "\u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D"
          },
          uzb: {
            official: "O'zbekiston Respublikasi",
            common: "O\u2018zbekiston"
          }
        }
      },
      altSpellings: [
        "UZ",
        "Republic of Uzbekistan",
        "O\u2018zbekiston Respublikasi",
        "\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D \u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0441\u0438"
      ]
    },
    {
      name: {
        common: "Saudi Arabia",
        official: "Kingdom of Saudi Arabia",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629",
            common: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629"
          }
        }
      },
      altSpellings: [
        "Saudi",
        "SA",
        "Kingdom of Saudi Arabia",
        "Al-Mamlakah al-\u2018Arabiyyah as-Su\u2018\u016Bdiyyah"
      ]
    },
    {
      name: {
        common: "Egypt",
        official: "Arab Republic of Egypt",
        nativeName: {
          ara: {
            official: "\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0645\u0635\u0631 \u0627\u0644\u0639\u0631\u0628\u064A\u0629",
            common: "\u0645\u0635\u0631"
          }
        }
      },
      altSpellings: ["EG", "Arab Republic of Egypt"]
    },
    {
      name: {
        common: "Italy",
        official: "Italian Republic",
        nativeName: {
          ita: {
            official: "Repubblica italiana",
            common: "Italia"
          }
        }
      },
      altSpellings: ["IT", "Italian Republic", "Repubblica italiana"]
    },
    {
      name: {
        common: "Madagascar",
        official: "Republic of Madagascar",
        nativeName: {
          fra: {
            official: "R\xE9publique de Madagascar",
            common: "Madagascar"
          },
          mlg: {
            official: "Repoblikan'i Madagasikara",
            common: "Madagasikara"
          }
        }
      },
      altSpellings: [
        "MG",
        "Republic of Madagascar",
        "Repoblikan'i Madagasikara",
        "R\xE9publique de Madagascar"
      ]
    },
    {
      name: {
        common: "New Caledonia",
        official: "New Caledonia",
        nativeName: {
          fra: {
            official: "Nouvelle-Cal\xE9donie",
            common: "Nouvelle-Cal\xE9donie"
          }
        }
      },
      altSpellings: ["NC"]
    },
    {
      name: {
        common: "Canada",
        official: "Canada",
        nativeName: {
          eng: {
            official: "Canada",
            common: "Canada"
          },
          fra: {
            official: "Canada",
            common: "Canada"
          }
        }
      },
      altSpellings: ["CA"]
    },
    {
      name: {
        common: "United States Virgin Islands",
        official: "Virgin Islands of the United States",
        nativeName: {
          eng: {
            official: "Virgin Islands of the United States",
            common: "United States Virgin Islands"
          }
        }
      },
      altSpellings: ["VI", "Virgin Islands, U.S."]
    },
    {
      name: {
        common: "Marshall Islands",
        official: "Republic of the Marshall Islands",
        nativeName: {
          eng: {
            official: "Republic of the Marshall Islands",
            common: "Marshall Islands"
          },
          mah: {
            official: "Republic of the Marshall Islands",
            common: "M\u0327aje\u013C"
          }
        }
      },
      altSpellings: [
        "MH",
        "Republic of the Marshall Islands",
        "Aolep\u0101n Aor\u014Dkin M\u0327aje\u013C"
      ]
    },
    {
      name: {
        common: "Mauritania",
        official: "Islamic Republic of Mauritania",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064A\u0629 \u0627\u0644\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0629",
            common: "\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627"
          }
        }
      },
      altSpellings: [
        "MR",
        "Islamic Republic of Mauritania",
        "al-Jumh\u016Briyyah al-\u02BEIsl\u0101miyyah al-M\u016Br\u012Bt\u0101niyyah"
      ]
    },
    {
      name: {
        common: "Gambia",
        official: "Republic of the Gambia",
        nativeName: {
          eng: {
            official: "Republic of the Gambia",
            common: "Gambia"
          }
        }
      },
      altSpellings: ["GM", "Republic of the Gambia"]
    },
    {
      name: {
        common: "Trinidad and Tobago",
        official: "Republic of Trinidad and Tobago",
        nativeName: {
          eng: {
            official: "Republic of Trinidad and Tobago",
            common: "Trinidad and Tobago"
          }
        }
      },
      altSpellings: ["TT", "Republic of Trinidad and Tobago"]
    },
    {
      name: {
        common: "Seychelles",
        official: "Republic of Seychelles",
        nativeName: {
          crs: {
            official: "Repiblik Sesel",
            common: "Sesel"
          },
          eng: {
            official: "Republic of Seychelles",
            common: "Seychelles"
          },
          fra: {
            official: "R\xE9publique des Seychelles",
            common: "Seychelles"
          }
        }
      },
      altSpellings: [
        "SC",
        "Republic of Seychelles",
        "Repiblik Sesel",
        "R\xE9publique des Seychelles"
      ]
    },
    {
      name: {
        common: "Japan",
        official: "Japan",
        nativeName: {
          jpn: {
            official: "\u65E5\u672C",
            common: "\u65E5\u672C"
          }
        }
      },
      altSpellings: ["JP", "Nippon", "Nihon"]
    },
    {
      name: {
        common: "Brazil",
        official: "Federative Republic of Brazil",
        nativeName: {
          por: {
            official: "Rep\xFAblica Federativa do Brasil",
            common: "Brasil"
          }
        }
      },
      altSpellings: [
        "BR",
        "Brasil",
        "Federative Republic of Brazil",
        "Rep\xFAblica Federativa do Brasil"
      ]
    },
    {
      name: {
        common: "Syria",
        official: "Syrian Arab Republic",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0648\u0631\u064A\u0629",
            common: "\u0633\u0648\u0631\u064A\u0627"
          }
        }
      },
      altSpellings: [
        "SY",
        "Syrian Arab Republic",
        "Al-Jumh\u016Br\u012Byah Al-\u02BBArab\u012Byah As-S\u016Br\u012Byah"
      ]
    },
    {
      name: {
        common: "Saint Helena, Ascension and Tristan da Cunha",
        official: "Saint Helena, Ascension and Tristan da Cunha",
        nativeName: {
          eng: {
            official: "Saint Helena, Ascension and Tristan da Cunha",
            common: "Saint Helena, Ascension and Tristan da Cunha"
          }
        }
      },
      altSpellings: [
        "Saint Helena",
        "St. Helena, Ascension and Tristan da Cunha"
      ]
    },
    {
      name: {
        common: "Tanzania",
        official: "United Republic of Tanzania",
        nativeName: {
          eng: {
            official: "United Republic of Tanzania",
            common: "Tanzania"
          },
          swa: {
            official: "Jamhuri ya Muungano wa Tanzania",
            common: "Tanzania"
          }
        }
      },
      altSpellings: [
        "TZ",
        "Tanzania, United Republic of",
        "United Republic of Tanzania",
        "Jamhuri ya Muungano wa Tanzania"
      ]
    },
    {
      name: {
        common: "Andorra",
        official: "Principality of Andorra",
        nativeName: {
          cat: {
            official: "Principat d'Andorra",
            common: "Andorra"
          }
        }
      },
      altSpellings: [
        "AD",
        "Principality of Andorra",
        "Principat d'Andorra"
      ]
    },
    {
      name: {
        common: "Iran",
        official: "Islamic Republic of Iran",
        nativeName: {
          fas: {
            official: "\u062C\u0645\u0647\u0648\u0631\u06CC \u0627\u0633\u0644\u0627\u0645\u06CC \u0627\u06CC\u0631\u0627\u0646",
            common: "\u0627\u06CC\u0631\u0627\u0646"
          }
        }
      },
      altSpellings: [
        "IR",
        "Islamic Republic of Iran",
        "Iran, Islamic Republic of",
        "Jomhuri-ye Esl\u0101mi-ye Ir\u0101n"
      ]
    },
    {
      name: {
        common: "Togo",
        official: "Togolese Republic",
        nativeName: {
          fra: {
            official: "R\xE9publique togolaise",
            common: "Togo"
          }
        }
      },
      altSpellings: [
        "TG",
        "Togolese",
        "Togolese Republic",
        "R\xE9publique Togolaise"
      ]
    },
    {
      name: {
        common: "Malta",
        official: "Republic of Malta",
        nativeName: {
          eng: {
            official: "Republic of Malta",
            common: "Malta"
          },
          mlt: {
            official: "Repubblika ta ' Malta",
            common: "Malta"
          }
        }
      },
      altSpellings: ["MT", "Republic of Malta", "Repubblika ta' Malta"]
    },
    {
      name: {
        common: "South Korea",
        official: "Republic of Korea",
        nativeName: {
          kor: {
            official: "\uB300\uD55C\uBBFC\uAD6D",
            common: "\uD55C\uAD6D"
          }
        }
      },
      altSpellings: [
        "KR",
        "Korea, Republic of",
        "Republic of Korea",
        "\uB0A8\uD55C",
        "\uB0A8\uC870\uC120"
      ]
    },
    {
      name: {
        common: "Samoa",
        official: "Independent State of Samoa",
        nativeName: {
          eng: {
            official: "Independent State of Samoa",
            common: "Samoa"
          },
          smo: {
            official: "Malo Sa\u02BBoloto Tuto\u02BBatasi o S\u0101moa",
            common: "S\u0101moa"
          }
        }
      },
      altSpellings: [
        "WS",
        "Independent State of Samoa",
        "Malo Sa\u02BBoloto Tuto\u02BBatasi o S\u0101moa"
      ]
    },
    {
      name: {
        common: "Germany",
        official: "Federal Republic of Germany",
        nativeName: {
          deu: {
            official: "Bundesrepublik Deutschland",
            common: "Deutschland"
          }
        }
      },
      altSpellings: [
        "DE",
        "Federal Republic of Germany",
        "Bundesrepublik Deutschland"
      ]
    },
    {
      name: {
        common: "Niger",
        official: "Republic of Niger",
        nativeName: {
          fra: {
            official: "R\xE9publique du Niger",
            common: "Niger"
          }
        }
      },
      altSpellings: ["NE", "Nijar"]
    },
    {
      name: {
        common: "Bouvet Island",
        official: "Bouvet Island",
        nativeName: {
          nor: {
            official: "Bouvet\xF8ya",
            common: "Bouvet\xF8ya"
          }
        }
      },
      altSpellings: ["BV", "Bouvet\xF8ya", "Bouvet-\xF8ya"]
    },
    {
      name: {
        common: "Jamaica",
        official: "Jamaica",
        nativeName: {
          eng: {
            official: "Jamaica",
            common: "Jamaica"
          },
          jam: {
            official: "Jamaica",
            common: "Jamaica"
          }
        }
      },
      altSpellings: ["JM"]
    },
    {
      name: {
        common: "Nicaragua",
        official: "Republic of Nicaragua",
        nativeName: {
          spa: {
            official: "Rep\xFAblica de Nicaragua",
            common: "Nicaragua"
          }
        }
      },
      altSpellings: [
        "NI",
        "Republic of Nicaragua",
        "Rep\xFAblica de Nicaragua"
      ]
    },
    {
      name: {
        common: "Guinea",
        official: "Republic of Guinea",
        nativeName: {
          fra: {
            official: "R\xE9publique de Guin\xE9e",
            common: "Guin\xE9e"
          }
        }
      },
      altSpellings: ["GN", "Republic of Guinea", "R\xE9publique de Guin\xE9e"]
    },
    {
      name: {
        common: "Anguilla",
        official: "Anguilla",
        nativeName: {
          eng: {
            official: "Anguilla",
            common: "Anguilla"
          }
        }
      },
      altSpellings: ["AI"]
    },
    {
      name: {
        common: "\xC5land Islands",
        official: "\xC5land Islands",
        nativeName: {
          swe: {
            official: "Landskapet \xC5land",
            common: "\xC5land"
          }
        }
      },
      altSpellings: ["AX", "Aaland", "Aland", "Ahvenanmaa"]
    },
    {
      name: {
        common: "Belgium",
        official: "Kingdom of Belgium",
        nativeName: {
          deu: {
            official: "K\xF6nigreich Belgien",
            common: "Belgien"
          },
          fra: {
            official: "Royaume de Belgique",
            common: "Belgique"
          },
          nld: {
            official: "Koninkrijk Belgi\xEB",
            common: "Belgi\xEB"
          }
        }
      },
      altSpellings: [
        "BE",
        "Belgi\xEB",
        "Belgie",
        "Belgien",
        "Belgique",
        "Kingdom of Belgium",
        "Koninkrijk Belgi\xEB",
        "Royaume de Belgique",
        "K\xF6nigreich Belgien"
      ]
    },
    {
      name: {
        common: "Portugal",
        official: "Portuguese Republic",
        nativeName: {
          por: {
            official: "Rep\xFAblica portugu\xEAs",
            common: "Portugal"
          }
        }
      },
      altSpellings: [
        "PT",
        "Portuguesa",
        "Portuguese Republic",
        "Rep\xFAblica Portuguesa"
      ]
    },
    {
      name: {
        common: "Denmark",
        official: "Kingdom of Denmark",
        nativeName: {
          dan: {
            official: "Kongeriget Danmark",
            common: "Danmark"
          }
        }
      },
      altSpellings: [
        "DK",
        "Danmark",
        "Kingdom of Denmark",
        "Kongeriget Danmark"
      ]
    },
    {
      name: {
        common: "Philippines",
        official: "Republic of the Philippines",
        nativeName: {
          eng: {
            official: "Republic of the Philippines",
            common: "Philippines"
          },
          fil: {
            official: "Republic of the Philippines",
            common: "Pilipinas"
          }
        }
      },
      altSpellings: [
        "PH",
        "Republic of the Philippines",
        "Rep\xFAblika ng Pilipinas"
      ]
    },
    {
      name: {
        common: "Wallis and Futuna",
        official: "Territory of the Wallis and Futuna Islands",
        nativeName: {
          fra: {
            official: "Territoire des \xEEles Wallis et Futuna",
            common: "Wallis et Futuna"
          }
        }
      },
      altSpellings: [
        "WF",
        "Territory of the Wallis and Futuna Islands",
        "Territoire des \xEEles Wallis et Futuna"
      ]
    },
    {
      name: {
        common: "Austria",
        official: "Republic of Austria",
        nativeName: {
          bar: {
            official: "Republik \xD6sterreich",
            common: "\xD6sterreich"
          }
        }
      },
      altSpellings: ["AT", "Osterreich", "Oesterreich"]
    },
    {
      name: {
        common: "Guinea-Bissau",
        official: "Republic of Guinea-Bissau",
        nativeName: {
          por: {
            official: "Rep\xFAblica da Guin\xE9-Bissau",
            common: "Guin\xE9-Bissau"
          },
          pov: {
            official: "Rep\xFAblica da Guin\xE9-Bissau",
            common: "Guin\xE9-Bissau"
          }
        }
      },
      altSpellings: [
        "GW",
        "Republic of Guinea-Bissau",
        "Rep\xFAblica da Guin\xE9-Bissau"
      ]
    },
    {
      name: {
        common: "Monaco",
        official: "Principality of Monaco",
        nativeName: {
          fra: {
            official: "Principaut\xE9 de Monaco",
            common: "Monaco"
          }
        }
      },
      altSpellings: [
        "MC",
        "Principality of Monaco",
        "Principaut\xE9 de Monaco"
      ]
    },
    {
      name: {
        common: "Namibia",
        official: "Republic of Namibia",
        nativeName: {
          afr: {
            official: "Republiek van Namibi\xEB",
            common: "Namibi\xEB"
          },
          deu: {
            official: "Republik Namibia",
            common: "Namibia"
          },
          eng: {
            official: "Republic of Namibia",
            common: "Namibia"
          },
          her: {
            official: "Republic of Namibia",
            common: "Namibia"
          },
          hgm: {
            official: "Republic of Namibia",
            common: "Namibia"
          },
          kwn: {
            official: "Republic of Namibia",
            common: "Namibia"
          },
          loz: {
            official: "Republic of Namibia",
            common: "Namibia"
          },
          ndo: {
            official: "Republic of Namibia",
            common: "Namibia"
          },
          tsn: {
            official: "Lefatshe la Namibia",
            common: "Namibia"
          }
        }
      },
      altSpellings: ["NA", "Namibi\xEB", "Republic of Namibia"]
    },
    {
      name: {
        common: "United States Minor Outlying Islands",
        official: "United States Minor Outlying Islands",
        nativeName: {
          eng: {
            official: "United States Minor Outlying Islands",
            common: "United States Minor Outlying Islands"
          }
        }
      },
      altSpellings: ["UM"]
    },
    {
      name: {
        common: "Costa Rica",
        official: "Republic of Costa Rica",
        nativeName: {
          spa: {
            official: "Rep\xFAblica de Costa Rica",
            common: "Costa Rica"
          }
        }
      },
      altSpellings: [
        "CR",
        "Republic of Costa Rica",
        "Rep\xFAblica de Costa Rica"
      ]
    },
    {
      name: {
        common: "Bosnia and Herzegovina",
        official: "Bosnia and Herzegovina",
        nativeName: {
          bos: {
            official: "Bosna i Hercegovina",
            common: "Bosna i Hercegovina"
          },
          hrv: {
            official: "Bosna i Hercegovina",
            common: "Bosna i Hercegovina"
          },
          srp: {
            official: "\u0411\u043E\u0441\u043D\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043E\u0432\u0438\u043D\u0430",
            common: "\u0411\u043E\u0441\u043D\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043E\u0432\u0438\u043D\u0430"
          }
        }
      },
      altSpellings: ["BA", "Bosnia-Herzegovina", "\u0411\u043E\u0441\u043D\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043E\u0432\u0438\u043D\u0430"]
    },
    {
      name: {
        common: "Macau",
        official: "Macao Special Administrative Region of the People's Republic of China",
        nativeName: {
          por: {
            official: "Regi\xE3o Administrativa Especial de Macau da Rep\xFAblica Popular da China",
            common: "Macau"
          },
          zho: {
            official: "\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u6FB3\u95E8\u7279\u522B\u884C\u653F\u533A",
            common: "\u6FB3\u95E8"
          }
        }
      },
      altSpellings: [
        "MO",
        "\u6FB3\u95E8",
        "Macao",
        "Macao Special Administrative Region of the People's Republic of China",
        "\u4E2D\u83EF\u4EBA\u6C11\u5171\u548C\u570B\u6FB3\u9580\u7279\u5225\u884C\u653F\u5340",
        "Regi\xE3o Administrativa Especial de Macau da Rep\xFAblica Popular da China"
      ]
    },
    {
      name: {
        common: "Mozambique",
        official: "Republic of Mozambique",
        nativeName: {
          por: {
            official: "Rep\xFAblica de Mo\xE7ambique",
            common: "Mo\xE7ambique"
          }
        }
      },
      altSpellings: [
        "MZ",
        "Republic of Mozambique",
        "Rep\xFAblica de Mo\xE7ambique"
      ]
    },
    {
      name: {
        common: "R\xE9union",
        official: "R\xE9union Island",
        nativeName: {
          fra: {
            official: "Ile de la R\xE9union",
            common: "La R\xE9union"
          }
        }
      },
      altSpellings: ["RE", "Reunion"]
    },
    {
      name: {
        common: "Montenegro",
        official: "Montenegro",
        nativeName: {
          cnr: {
            official: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430",
            common: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430"
          }
        }
      },
      altSpellings: ["ME", "Crna Gora"]
    },
    {
      name: {
        common: "North Korea",
        official: "Democratic People's Republic of Korea",
        nativeName: {
          kor: {
            official: "\uC870\uC120\uBBFC\uC8FC\uC8FC\uC758\uC778\uBBFC\uACF5\uD654\uAD6D",
            common: "\uC870\uC120"
          }
        }
      },
      altSpellings: [
        "KP",
        "Democratic People's Republic of Korea",
        "DPRK",
        "\uC870\uC120\uBBFC\uC8FC\uC8FC\uC758\uC778\uBBFC\uACF5\uD654\uAD6D",
        "Chos\u014Fn Minjuju\u016Di Inmin Konghwaguk",
        "Korea, Democratic People's Republic of",
        "\uBD81\uD55C",
        "\uBD81\uC870\uC120"
      ]
    },
    {
      name: {
        common: "Northern Mariana Islands",
        official: "Commonwealth of the Northern Mariana Islands",
        nativeName: {
          cal: {
            official: "Commonwealth of the Northern Mariana Islands",
            common: "Northern Mariana Islands"
          },
          cha: {
            official: "Sankattan Siha Na Islas Mari\xE5nas",
            common: "Na Islas Mari\xE5nas"
          },
          eng: {
            official: "Commonwealth of the Northern Mariana Islands",
            common: "Northern Mariana Islands"
          }
        }
      },
      altSpellings: [
        "MP",
        "Commonwealth of the Northern Mariana Islands",
        "Sankattan Siha Na Islas Mari\xE5nas"
      ]
    },
    {
      name: {
        common: "Ukraine",
        official: "Ukraine",
        nativeName: {
          ukr: {
            official: "\u0423\u043A\u0440\u0430\u0457\u043D\u0430",
            common: "\u0423\u043A\u0440\u0430\u0457\u043D\u0430"
          }
        }
      },
      altSpellings: ["UA", "Ukrayina"]
    },
    {
      name: {
        common: "Iraq",
        official: "Republic of Iraq",
        nativeName: {
          ara: {
            official: "\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u0639\u0631\u0627\u0642",
            common: "\u0627\u0644\u0639\u0631\u0627\u0642"
          },
          arc: {
            official: "\u0729\u0718\u073C\u071B\u0722\u0735\u0710 \u0710\u071D\u073C\u072A\u0732\u0729",
            common: "\u0729\u0718\u073C\u071B\u0722\u0735\u0710"
          },
          ckb: {
            official: "\u06A9\u06C6\u0645\u0627\u0631\u06CC \u0639\u06CE\u0631\u0627\u0642",
            common: "\u06A9\u06C6\u0645\u0627\u0631\u06CC"
          }
        }
      },
      altSpellings: ["IQ", "Republic of Iraq", "Jumh\u016Briyyat al-\u2018Ir\u0101q"]
    },
    {
      name: {
        common: "South Georgia",
        official: "South Georgia and the South Sandwich Islands",
        nativeName: {
          eng: {
            official: "South Georgia and the South Sandwich Islands",
            common: "South Georgia"
          }
        }
      },
      altSpellings: [
        "GS",
        "South Georgia and the South Sandwich Islands"
      ]
    },
    {
      name: {
        common: "Angola",
        official: "Republic of Angola",
        nativeName: {
          por: {
            official: "Rep\xFAblica de Angola",
            common: "Angola"
          }
        }
      },
      altSpellings: ["AO", "Rep\xFAblica de Angola", "\u0281\u025Bpublika de an'\u0261\u0254la"]
    },
    {
      name: {
        common: "Sierra Leone",
        official: "Republic of Sierra Leone",
        nativeName: {
          eng: {
            official: "Republic of Sierra Leone",
            common: "Sierra Leone"
          }
        }
      },
      altSpellings: ["SL", "Republic of Sierra Leone"]
    },
    {
      name: {
        common: "Micronesia",
        official: "Federated States of Micronesia",
        nativeName: {
          eng: {
            official: "Federated States of Micronesia",
            common: "Micronesia"
          }
        }
      },
      altSpellings: [
        "FM",
        "Federated States of Micronesia",
        "Micronesia, Federated States of"
      ]
    },
    {
      name: {
        common: "Cuba",
        official: "Republic of Cuba",
        nativeName: {
          spa: {
            official: "Rep\xFAblica de Cuba",
            common: "Cuba"
          }
        }
      },
      altSpellings: ["CU", "Republic of Cuba", "Rep\xFAblica de Cuba"]
    },
    {
      name: {
        common: "Turks and Caicos Islands",
        official: "Turks and Caicos Islands",
        nativeName: {
          eng: {
            official: "Turks and Caicos Islands",
            common: "Turks and Caicos Islands"
          }
        }
      },
      altSpellings: ["TC"]
    },
    {
      name: {
        common: "Serbia",
        official: "Republic of Serbia",
        nativeName: {
          srp: {
            official: "\u0420\u0435\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0421\u0440\u0431\u0438\u0458\u0430",
            common: "\u0421\u0440\u0431\u0438\u0458\u0430"
          }
        }
      },
      altSpellings: [
        "RS",
        "Srbija",
        "Republic of Serbia",
        "\u0420\u0435\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0421\u0440\u0431\u0438\u0458\u0430",
        "Republika Srbija"
      ]
    },
    {
      name: {
        common: "Ecuador",
        official: "Republic of Ecuador",
        nativeName: {
          spa: {
            official: "Rep\xFAblica del Ecuador",
            common: "Ecuador"
          }
        }
      },
      altSpellings: [
        "EC",
        "Republic of Ecuador",
        "Rep\xFAblica del Ecuador"
      ]
    },
    {
      name: {
        common: "Faroe Islands",
        official: "Faroe Islands",
        nativeName: {
          dan: {
            official: "F\xE6r\xF8erne",
            common: "F\xE6r\xF8erne"
          },
          fao: {
            official: "F\xF8royar",
            common: "F\xF8royar"
          }
        }
      },
      altSpellings: ["FO", "F\xF8royar", "F\xE6r\xF8erne"]
    },
    {
      name: {
        common: "Antarctica",
        official: "Antarctica",
        nativeName: {}
      },
      altSpellings: ["AQ"]
    },
    {
      name: {
        common: "Palestine",
        official: "State of Palestine",
        nativeName: {
          ara: {
            official: "\u062F\u0648\u0644\u0629 \u0641\u0644\u0633\u0637\u064A\u0646",
            common: "\u0641\u0644\u0633\u0637\u064A\u0646"
          }
        }
      },
      altSpellings: [
        "PS",
        "Palestine, State of",
        "State of Palestine",
        "Dawlat Filas\u1E6Din"
      ]
    },
    {
      name: {
        common: "Turkey",
        official: "Republic of Turkey",
        nativeName: {
          tur: {
            official: "T\xFCrkiye Cumhuriyeti",
            common: "T\xFCrkiye"
          }
        }
      },
      altSpellings: [
        "TR",
        "Turkiye",
        "Republic of Turkey",
        "T\xFCrkiye Cumhuriyeti"
      ]
    },
    {
      name: {
        common: "Kiribati",
        official: "Independent and Sovereign Republic of Kiribati",
        nativeName: {
          eng: {
            official: "Independent and Sovereign Republic of Kiribati",
            common: "Kiribati"
          },
          gil: {
            official: "Ribaberiki Kiribati",
            common: "Kiribati"
          }
        }
      },
      altSpellings: ["KI", "Republic of Kiribati", "Ribaberiki Kiribati"]
    },
    {
      name: {
        common: "Kazakhstan",
        official: "Republic of Kazakhstan",
        nativeName: {
          kaz: {
            official: "\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D \u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0441\u044B",
            common: "\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D"
          },
          rus: {
            official: "\u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u041A\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043D",
            common: "\u041A\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043D"
          }
        }
      },
      altSpellings: [
        "KZ",
        "Qazaqstan",
        "\u041A\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043D",
        "Republic of Kazakhstan",
        "\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D \u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0441\u044B",
        "Qazaqstan Respubl\xEFkas\u0131",
        "\u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u041A\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043D",
        "Respublika Kazakhstan"
      ]
    },
    {
      name: {
        common: "Gibraltar",
        official: "Gibraltar",
        nativeName: {
          eng: {
            official: "Gibraltar",
            common: "Gibraltar"
          }
        }
      },
      altSpellings: ["GI"]
    },
    {
      name: {
        common: "Iceland",
        official: "Iceland",
        nativeName: {
          isl: {
            official: "\xCDsland",
            common: "\xCDsland"
          }
        }
      },
      altSpellings: [
        "IS",
        "Island",
        "Republic of Iceland",
        "L\xFD\xF0veldi\xF0 \xCDsland"
      ]
    },
    {
      name: {
        common: "Palau",
        official: "Republic of Palau",
        nativeName: {
          eng: {
            official: "Republic of Palau",
            common: "Palau"
          },
          pau: {
            official: "Beluu er a Belau",
            common: "Belau"
          }
        }
      },
      altSpellings: ["PW", "Republic of Palau", "Beluu er a Belau"]
    },
    {
      name: {
        common: "Qatar",
        official: "State of Qatar",
        nativeName: {
          ara: {
            official: "\u062F\u0648\u0644\u0629 \u0642\u0637\u0631",
            common: "\u0642\u0637\u0631"
          }
        }
      },
      altSpellings: ["QA", "State of Qatar", "Dawlat Qa\u1E6Dar"]
    },
    {
      name: {
        common: "Switzerland",
        official: "Swiss Confederation",
        nativeName: {
          fra: {
            official: "Conf\xE9d\xE9ration suisse",
            common: "Suisse"
          },
          gsw: {
            official: "Schweizerische Eidgenossenschaft",
            common: "Schweiz"
          },
          ita: {
            official: "Confederazione Svizzera",
            common: "Svizzera"
          },
          roh: {
            official: "Confederaziun svizra",
            common: "Svizra"
          }
        }
      },
      altSpellings: [
        "CH",
        "Swiss Confederation",
        "Schweiz",
        "Suisse",
        "Svizzera",
        "Svizra"
      ]
    },
    {
      name: {
        common: "French Polynesia",
        official: "French Polynesia",
        nativeName: {
          fra: {
            official: "Polyn\xE9sie fran\xE7aise",
            common: "Polyn\xE9sie fran\xE7aise"
          }
        }
      },
      altSpellings: [
        "PF",
        "Polyn\xE9sie fran\xE7aise",
        "French Polynesia",
        "P\u014Dr\u012Bnetia Far\u0101ni"
      ]
    },
    {
      name: {
        common: "Pitcairn Islands",
        official: "Pitcairn Group of Islands",
        nativeName: {
          eng: {
            official: "Pitcairn Group of Islands",
            common: "Pitcairn Islands"
          }
        }
      },
      altSpellings: [
        "PN",
        "Pitcairn",
        "Pitcairn Henderson Ducie and Oeno Islands"
      ]
    },
    {
      name: {
        common: "Jordan",
        official: "Hashemite Kingdom of Jordan",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0623\u0631\u062F\u0646\u064A\u0629 \u0627\u0644\u0647\u0627\u0634\u0645\u064A\u0629",
            common: "\u0627\u0644\u0623\u0631\u062F\u0646"
          }
        }
      },
      altSpellings: [
        "JO",
        "Hashemite Kingdom of Jordan",
        "al-Mamlakah al-Urdun\u012Byah al-H\u0101shim\u012Byah"
      ]
    },
    {
      name: {
        common: "Myanmar",
        official: "Republic of the Union of Myanmar",
        nativeName: {
          mya: {
            official: "\u1015\u103C\u100A\u103A\u1011\u1031\u102C\u1004\u103A\u1005\u102F \u101E\u1019\u1039\u1019\u1010 \u1019\u103C\u1014\u103A\u1019\u102C\u1014\u102D\u102F\u1004\u103A\u1004\u1036\u1010\u1031\u102C\u103A",
            common: "\u1019\u103C\u1014\u103A\u1019\u102C"
          }
        }
      },
      altSpellings: [
        "MM",
        "Burma",
        "Republic of the Union of Myanmar",
        "Pyidaunzu Thanm\u0103da My\u0103ma Nainngandaw"
      ]
    },
    {
      name: {
        common: "Thailand",
        official: "Kingdom of Thailand",
        nativeName: {
          tha: {
            official: "\u0E23\u0E32\u0E0A\u0E2D\u0E32\u0E13\u0E32\u0E08\u0E31\u0E01\u0E23\u0E44\u0E17\u0E22",
            common: "\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22"
          }
        }
      },
      altSpellings: [
        "TH",
        "Prathet",
        "Thai",
        "Kingdom of Thailand",
        "\u0E23\u0E32\u0E0A\u0E2D\u0E32\u0E13\u0E32\u0E08\u0E31\u0E01\u0E23\u0E44\u0E17\u0E22",
        "Ratcha Anachak Thai"
      ]
    },
    {
      name: {
        common: "Caribbean Netherlands",
        official: "Bonaire, Sint Eustatius and Saba",
        nativeName: {
          nld: {
            official: "Bonaire, Sint Eustatius en Saba",
            common: "Caribisch Nederland"
          },
          pap: {
            official: "Boneiru, Sint Eustatius y Saba",
            common: "Boneiru, Sint Eustatius y Saba"
          }
        }
      },
      altSpellings: ["BES islands"]
    },
    {
      name: {
        common: "Aruba",
        official: "Aruba",
        nativeName: {
          nld: {
            official: "Aruba",
            common: "Aruba"
          },
          pap: {
            official: "Aruba",
            common: "Aruba"
          }
        }
      },
      altSpellings: ["AW"]
    },
    {
      name: {
        common: "Guadeloupe",
        official: "Guadeloupe",
        nativeName: {
          fra: {
            official: "Guadeloupe",
            common: "Guadeloupe"
          }
        }
      },
      altSpellings: ["GP", "Gwadloup"]
    },
    {
      name: {
        common: "Nigeria",
        official: "Federal Republic of Nigeria",
        nativeName: {
          eng: {
            official: "Federal Republic of Nigeria",
            common: "Nigeria"
          }
        }
      },
      altSpellings: [
        "NG",
        "Nijeriya",
        "Na\xEDj\xEDr\xED\xE0",
        "Federal Republic of Nigeria"
      ]
    },
    {
      name: {
        common: "Bahrain",
        official: "Kingdom of Bahrain",
        nativeName: {
          ara: {
            official: "\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0628\u062D\u0631\u064A\u0646",
            common: "\u200F\u0627\u0644\u0628\u062D\u0631\u064A\u0646"
          }
        }
      },
      altSpellings: ["BH", "Kingdom of Bahrain", "Mamlakat al-Ba\u1E25rayn"]
    },
    {
      name: {
        common: "Laos",
        official: "Lao People's Democratic Republic",
        nativeName: {
          lao: {
            official: "\u0EAA\u0EB2\u0E97\u0EB2\u0EA5\u0EB0\u0E99\u0EB0 \u0E8A\u0EB2\u0E97\u0EB4\u0E9B\u0EB0\u0EC4\u0E95 \u0E84\u0EBB\u0E99\u0EA5\u0EB2\u0EA7 \u0E82\u0EAD\u0E87",
            common: "\u0EAA\u0E9B\u0E9B\u0EA5\u0EB2\u0EA7"
          }
        }
      },
      altSpellings: [
        "LA",
        "Lao",
        "Lao People's Democratic Republic",
        "Sathalanalat Paxathipatai Paxaxon Lao"
      ]
    },
    {
      name: {
        common: "Cocos (Keeling) Islands",
        official: "Territory of the Cocos (Keeling) Islands",
        nativeName: {
          eng: {
            official: "Territory of the Cocos (Keeling) Islands",
            common: "Cocos (Keeling) Islands"
          }
        }
      },
      altSpellings: ["CC", "Keeling Islands", "Cocos Islands"]
    },
    {
      name: {
        common: "Djibouti",
        official: "Republic of Djibouti",
        nativeName: {
          ara: {
            official: "\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u062C\u064A\u0628\u0648\u062A\u064A",
            common: "\u062C\u064A\u0628\u0648\u062A\u064A\u200E"
          },
          fra: {
            official: "R\xE9publique de Djibouti",
            common: "Djibouti"
          }
        }
      },
      altSpellings: [
        "DJ",
        "Jabuuti",
        "Gabuuti",
        "Republic of Djibouti",
        "R\xE9publique de Djibouti",
        "Gabuutih Ummuuno",
        "Jamhuuriyadda Jabuuti"
      ]
    },
    {
      name: {
        common: "Solomon Islands",
        official: "Solomon Islands",
        nativeName: {
          eng: {
            official: "Solomon Islands",
            common: "Solomon Islands"
          }
        }
      },
      altSpellings: ["SB"]
    },
    {
      name: {
        common: "Heard Island and McDonald Islands",
        official: "Heard Island and McDonald Islands",
        nativeName: {
          eng: {
            official: "Heard Island and McDonald Islands",
            common: "Heard Island and McDonald Islands"
          }
        }
      },
      altSpellings: ["HM", "Heard Island and McDonald Islands"]
    },
    {
      name: {
        common: "India",
        official: "Republic of India",
        nativeName: {
          eng: {
            official: "Republic of India",
            common: "India"
          },
          hin: {
            official: "\u092D\u093E\u0930\u0924 \u0917\u0923\u0930\u093E\u091C\u094D\u092F",
            common: "\u092D\u093E\u0930\u0924"
          },
          tam: {
            official: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0B95\u0BCD \u0B95\u0BC1\u0B9F\u0BBF\u0BAF\u0BB0\u0B9A\u0BC1",
            common: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE"
          }
        }
      },
      altSpellings: [
        "IN",
        "Bh\u0101rat",
        "Republic of India",
        "Bharat Ganrajya",
        "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE"
      ]
    },
    {
      name: {
        common: "San Marino",
        official: "Republic of San Marino",
        nativeName: {
          ita: {
            official: "Repubblica di San Marino",
            common: "San Marino"
          }
        }
      },
      altSpellings: [
        "SM",
        "Republic of San Marino",
        "Repubblica di San Marino"
      ]
    },
    {
      name: {
        common: "Luxembourg",
        official: "Grand Duchy of Luxembourg",
        nativeName: {
          deu: {
            official: "Gro\xDFherzogtum Luxemburg",
            common: "Luxemburg"
          },
          fra: {
            official: "Grand-Duch\xE9 de Luxembourg",
            common: "Luxembourg"
          },
          ltz: {
            official: "Groussherzogtum L\xEBtzebuerg",
            common: "L\xEBtzebuerg"
          }
        }
      },
      altSpellings: [
        "LU",
        "Grand Duchy of Luxembourg",
        "Grand-Duch\xE9 de Luxembourg",
        "Gro\xDFherzogtum Luxemburg",
        "Groussherzogtum L\xEBtzebuerg"
      ]
    },
    {
      name: {
        common: "Sint Maarten",
        official: "Sint Maarten",
        nativeName: {
          eng: {
            official: "Sint Maarten",
            common: "Sint Maarten"
          },
          fra: {
            official: "Saint-Martin",
            common: "Saint-Martin"
          },
          nld: {
            official: "Sint Maarten",
            common: "Sint Maarten"
          }
        }
      },
      altSpellings: ["SX", "Sint Maarten (Dutch part)"]
    },
    {
      name: {
        common: "Falkland Islands",
        official: "Falkland Islands",
        nativeName: {
          eng: {
            official: "Falkland Islands",
            common: "Falkland Islands"
          }
        }
      },
      altSpellings: [
        "FK",
        "Islas Malvinas",
        "Falkland Islands (Malvinas)"
      ]
    },
    {
      name: {
        common: "Central African Republic",
        official: "Central African Republic",
        nativeName: {
          fra: {
            official: "R\xE9publique centrafricaine",
            common: "R\xE9publique centrafricaine"
          },
          sag: {
            official: "K\xF6d\xF6r\xF6s\xEAse t\xEE B\xEAafr\xEEka",
            common: "B\xEAafr\xEEka"
          }
        }
      },
      altSpellings: [
        "CF",
        "Central African Republic",
        "R\xE9publique centrafricaine"
      ]
    },
    {
      name: {
        common: "Botswana",
        official: "Republic of Botswana",
        nativeName: {
          eng: {
            official: "Republic of Botswana",
            common: "Botswana"
          },
          tsn: {
            official: "Lefatshe la Botswana",
            common: "Botswana"
          }
        }
      },
      altSpellings: [
        "BW",
        "Republic of Botswana",
        "Lefatshe la Botswana"
      ]
    },
    {
      name: {
        common: "Cura\xE7ao",
        official: "Country of Cura\xE7ao",
        nativeName: {
          eng: {
            official: "Country of Cura\xE7ao",
            common: "Cura\xE7ao"
          },
          nld: {
            official: "Land Cura\xE7ao",
            common: "Cura\xE7ao"
          },
          pap: {
            official: "Pais K\xF2rsou",
            common: "Pais K\xF2rsou"
          }
        }
      },
      altSpellings: [
        "CW",
        "Curacao",
        "K\xF2rsou",
        "Country of Cura\xE7ao",
        "Land Cura\xE7ao",
        "Pais K\xF2rsou"
      ]
    },
    {
      name: {
        common: "Guernsey",
        official: "Bailiwick of Guernsey",
        nativeName: {
          eng: {
            official: "Bailiwick of Guernsey",
            common: "Guernsey"
          },
          fra: {
            official: "Bailliage de Guernesey",
            common: "Guernesey"
          },
          nfr: {
            official: "Dg\xE8rn\xE9siais",
            common: "Dg\xE8rn\xE9siais"
          }
        }
      },
      altSpellings: [
        "GG",
        "Bailiwick of Guernsey",
        "Bailliage de Guernesey"
      ]
    },
    {
      name: {
        common: "Norway",
        official: "Kingdom of Norway",
        nativeName: {
          nno: {
            official: "Kongeriket Noreg",
            common: "Noreg"
          },
          nob: {
            official: "Kongeriket Norge",
            common: "Norge"
          },
          smi: {
            official: "Norgga gonagasriika",
            common: "Norgga"
          }
        }
      },
      altSpellings: [
        "NO",
        "Norge",
        "Noreg",
        "Kingdom of Norway",
        "Kongeriket Norge",
        "Kongeriket Noreg"
      ]
    },
    {
      name: {
        common: "Gabon",
        official: "Gabonese Republic",
        nativeName: {
          fra: {
            official: "R\xE9publique gabonaise",
            common: "Gabon"
          }
        }
      },
      altSpellings: ["GA", "Gabonese Republic", "R\xE9publique Gabonaise"]
    },
    {
      name: {
        common: "Zimbabwe",
        official: "Republic of Zimbabwe",
        nativeName: {
          bwg: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          eng: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          kck: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          khi: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          ndc: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          nde: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          nya: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          sna: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          sot: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          toi: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          tsn: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          tso: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          ven: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          xho: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          },
          zib: {
            official: "Republic of Zimbabwe",
            common: "Zimbabwe"
          }
        }
      },
      altSpellings: ["ZW", "Republic of Zimbabwe"]
    },
    {
      name: {
        common: "Lesotho",
        official: "Kingdom of Lesotho",
        nativeName: {
          eng: {
            official: "Kingdom of Lesotho",
            common: "Lesotho"
          },
          sot: {
            official: "Kingdom of Lesotho",
            common: "Lesotho"
          }
        }
      },
      altSpellings: ["LS", "Kingdom of Lesotho", "Muso oa Lesotho"]
    },
    {
      name: {
        common: "Slovenia",
        official: "Republic of Slovenia",
        nativeName: {
          slv: {
            official: "Republika Slovenija",
            common: "Slovenija"
          }
        }
      },
      altSpellings: ["SI", "Republic of Slovenia", "Republika Slovenija"]
    },
    {
      name: {
        common: "Argentina",
        official: "Argentine Republic",
        nativeName: {
          grn: {
            official: "Argentine Republic",
            common: "Argentina"
          },
          spa: {
            official: "Rep\xFAblica Argentina",
            common: "Argentina"
          }
        }
      },
      altSpellings: ["AR", "Argentine Republic", "Rep\xFAblica Argentina"]
    },
    {
      name: {
        common: "Burkina Faso",
        official: "Burkina Faso",
        nativeName: {
          fra: {
            official: "R\xE9publique du Burkina",
            common: "Burkina Faso"
          }
        }
      },
      altSpellings: ["BF"]
    },
    {
      name: {
        common: "Yemen",
        official: "Republic of Yemen",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u064A\u0645\u0646\u064A\u0629",
            common: "\u0627\u0644\u064A\u064E\u0645\u064E\u0646"
          }
        }
      },
      altSpellings: [
        "YE",
        "Yemeni Republic",
        "al-Jumh\u016Briyyah al-Yamaniyyah"
      ]
    },
    {
      name: {
        common: "DR Congo",
        official: "Democratic Republic of the Congo",
        nativeName: {
          fra: {
            official: "R\xE9publique d\xE9mocratique du Congo",
            common: "RD Congo"
          },
          kon: {
            official: "Repubilika ya Kongo Demokratiki",
            common: "Repubilika ya Kongo Demokratiki"
          },
          lin: {
            official: "Republiki ya Kong\xF3 Demokratiki",
            common: "Republiki ya Kong\xF3 Demokratiki"
          },
          lua: {
            official: "Ditunga dia Kongu wa Mungalaata",
            common: "Ditunga dia Kongu wa Mungalaata"
          },
          swa: {
            official: "Jamhuri ya Kidemokrasia ya Kongo",
            common: "Jamhuri ya Kidemokrasia ya Kongo"
          }
        }
      },
      altSpellings: [
        "CD",
        "DR Congo",
        "Congo-Kinshasa",
        "Congo, the Democratic Republic of the",
        "DRC"
      ]
    },
    {
      name: {
        common: "Oman",
        official: "Sultanate of Oman",
        nativeName: {
          ara: {
            official: "\u0633\u0644\u0637\u0646\u0629 \u0639\u0645\u0627\u0646",
            common: "\u0639\u0645\u0627\u0646"
          }
        }
      },
      altSpellings: ["OM", "Sultanate of Oman", "Sal\u1E6Danat \u02BBUm\u0101n"]
    },
    {
      name: {
        common: "Indonesia",
        official: "Republic of Indonesia",
        nativeName: {
          ind: {
            official: "Republik Indonesia",
            common: "Indonesia"
          }
        }
      },
      altSpellings: ["ID", "Republic of Indonesia", "Republik Indonesia"]
    },
    {
      name: {
        common: "Nauru",
        official: "Republic of Nauru",
        nativeName: {
          eng: {
            official: "Republic of Nauru",
            common: "Nauru"
          },
          nau: {
            official: "Republic of Nauru",
            common: "Nauru"
          }
        }
      },
      altSpellings: [
        "NR",
        "Naoero",
        "Pleasant Island",
        "Republic of Nauru",
        "Ripublik Naoero"
      ]
    },
    {
      name: {
        common: "Rwanda",
        official: "Republic of Rwanda",
        nativeName: {
          eng: {
            official: "Republic of Rwanda",
            common: "Rwanda"
          },
          fra: {
            official: "R\xE9publique rwandaise",
            common: "Rwanda"
          },
          kin: {
            official: "Repubulika y'u Rwanda",
            common: "Rwanda"
          }
        }
      },
      altSpellings: [
        "RW",
        "Republic of Rwanda",
        "Repubulika y'u Rwanda",
        "R\xE9publique du Rwanda"
      ]
    },
    {
      name: {
        common: "North Macedonia",
        official: "Republic of North Macedonia",
        nativeName: {
          mkd: {
            official: "\u0420\u0435\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0421\u0435\u0432\u0435\u0440\u043D\u0430 \u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0438\u0458\u0430",
            common: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0438\u0458\u0430"
          }
        }
      },
      altSpellings: [
        "MK",
        "The former Yugoslav Republic of Macedonia",
        "Republic of North Macedonia",
        "Macedonia, The Former Yugoslav Republic of",
        "\u0420\u0435\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u0421\u0435\u0432\u0435\u0440\u043D\u0430 \u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0438\u0458\u0430"
      ]
    },
    {
      name: {
        common: "Kosovo",
        official: "Republic of Kosovo",
        nativeName: {
          sqi: {
            official: "Republika e Kosov\xEBs",
            common: "Kosova"
          },
          srp: {
            official: "\u0420\u0435\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u041A\u043E\u0441\u043E\u0432\u043E",
            common: "\u041A\u043E\u0441\u043E\u0432\u043E"
          }
        }
      },
      altSpellings: ["XK", "\u0420\u0435\u043F\u0443\u0431\u043B\u0438\u043A\u0430 \u041A\u043E\u0441\u043E\u0432\u043E"]
    },
    {
      name: {
        common: "Netherlands",
        official: "Kingdom of the Netherlands",
        nativeName: {
          nld: {
            official: "Koninkrijk der Nederlanden",
            common: "Nederland"
          }
        }
      },
      altSpellings: ["NL", "Holland", "Nederland", "The Netherlands"]
    },
    {
      name: {
        common: "Tunisia",
        official: "Tunisian Republic",
        nativeName: {
          ara: {
            official: "\u0627\u0644\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u062A\u0648\u0646\u0633\u064A\u0629",
            common: "\u062A\u0648\u0646\u0633"
          }
        }
      },
      altSpellings: [
        "TN",
        "Republic of Tunisia",
        "al-Jumh\u016Briyyah at-T\u016Bnisiyyah"
      ]
    },
    {
      name: {
        common: "South Sudan",
        official: "Republic of South Sudan",
        nativeName: {
          eng: {
            official: "Republic of South Sudan",
            common: "South Sudan"
          }
        }
      },
      altSpellings: ["SS"]
    },
    {
      name: {
        common: "Honduras",
        official: "Republic of Honduras",
        nativeName: {
          spa: {
            official: "Rep\xFAblica de Honduras",
            common: "Honduras"
          }
        }
      },
      altSpellings: [
        "HN",
        "Republic of Honduras",
        "Rep\xFAblica de Honduras"
      ]
    },
    {
      name: {
        common: "Saint Vincent and the Grenadines",
        official: "Saint Vincent and the Grenadines",
        nativeName: {
          eng: {
            official: "Saint Vincent and the Grenadines",
            common: "Saint Vincent and the Grenadines"
          }
        }
      },
      altSpellings: ["VC"]
    },
    {
      name: {
        common: "Sri Lanka",
        official: "Democratic Socialist Republic of Sri Lanka",
        nativeName: {
          sin: {
            official: "\u0DC1\u0DCA\u200D\u0DBB\u0DD3 \u0DBD\u0D82\u0D9A\u0DCF \u0DB4\u0DCA\u200D\u0DBB\u0DA2\u0DCF\u0DAD\u0DCF\u0DB1\u0DCA\u0DAD\u0DCA\u200D\u0DBB\u0DD2\u0D9A \u0DC3\u0DB8\u0DCF\u0DA2\u0DC0\u0DCF\u0DAF\u0DD3 \u0DA2\u0DB1\u0DBB\u0DA2\u0DBA",
            common: "\u0DC1\u0DCA\u200D\u0DBB\u0DD3 \u0DBD\u0D82\u0D9A\u0DCF\u0DC0"
          },
          tam: {
            official: "\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8 \u0B9A\u0BA9\u0BA8\u0BBE\u0BAF\u0B95 \u0B9A\u0BCB\u0B9A\u0BB2\u0BBF\u0B9A\u0B95\u0BCD \u0B95\u0BC1\u0B9F\u0BBF\u0BAF\u0BB0\u0B9A\u0BC1",
            common: "\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8"
          }
        }
      },
      altSpellings: [
        "LK",
        "ila\u1E45kai",
        "Democratic Socialist Republic of Sri Lanka"
      ]
    },
    {
      name: {
        common: "Hong Kong",
        official: "Hong Kong Special Administrative Region of the People's Republic of China",
        nativeName: {
          eng: {
            official: "Hong Kong Special Administrative Region of the People's Republic of China",
            common: "Hong Kong"
          },
          zho: {
            official: "\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u9999\u6E2F\u7279\u522B\u884C\u653F\u533A",
            common: "\u9999\u6E2F"
          }
        }
      },
      altSpellings: ["HK"]
    }
  ].sort((a, b) => a.name.common.localeCompare(b.name.common));
  const findCountryByAltSpellings = (altSpelling) => {
    for (let country2 of countries.value) {
      if (country2.altSpellings.includes(altSpelling)) {
        return country2;
      }
    }
    return countries.value[0];
  };
  const setCountry = () => {
    axios.request({
      url: "https://api.ip2location.io",
      method: "GET"
    }).then((res) => {
      country.value = findCountryByAltSpellings(
        res.data.country_code
      );
    }).catch((e) => console.log("Data: ", e));
  };
  return {
    countries,
    country,
    setCountry
  };
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LoginMenu",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const appResource = useAppResource();
    const userCountry = appResource.country;
    const countries = appResource.countries;
    try {
      const rInterval = setInterval(() => {
        if (rForm.value.country) {
          clearInterval(rInterval);
        } else {
          try {
            if (userCountry.value.name)
              rForm.value.country = userCountry.value.name.common;
          } catch (error) {
          }
        }
      }, 2e3);
    } catch (error) {
    }
    const form = ref({
      email: "",
      password: ""
    });
    const rForm = ref({
      name: "",
      email: "",
      imgUrl: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      // dob: "",
      password: ""
    });
    const authAction = useState("authAction", () => "login");
    ref();
    ref();
    ref();
    const isInvalidCredentials = ref(null);
    const passwordType = ref("password");
    const invalidMessage = ref("");
    const loading = ref(false);
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    const validPassword = () => {
      const password = form.value.password;
      const minLength = 6;
      const upperCaseRegex = /[A-Z]/;
      const lowerCaseRegex = /[a-z]/;
      const digitRegex = /[0-9]/;
      const specialCharRegex = /[^A-Za-z0-9]/;
      if (password.length < minLength) {
        invalidMessage.value = "Password is too short";
        return false;
      } else if (!upperCaseRegex.test(password)) {
        invalidMessage.value = "Password must contain at least one uppercase letter";
        return false;
      } else if (!lowerCaseRegex.test(password)) {
        invalidMessage.value = "Password must contain at least one lowercase letter";
        return false;
      } else if (!digitRegex.test(password)) {
        invalidMessage.value = "Password must contain at least one digit";
        return false;
      } else if (!specialCharRegex.test(password)) {
        invalidMessage.value = "Password must contain at least one special character";
        return false;
      }
      invalidMessage.value = "Password is strong";
      return true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NFTexLogoMini = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "modal fade",
        tabindex: "-1",
        id: "kt_modal_login"
      }, _attrs))} data-v-b756d576><div class="modal-dialog modal-dialog-centered" data-v-b756d576><div class="modal-content w-300px mx-auto w-lg-450px" data-v-b756d576><div class="modal-header border-0 position-relative mb-0 pb-0" data-v-b756d576><div class="d-flex flex-column modal-title w-100" data-v-b756d576><div class="fw-bold position-relative d-flex align-items-center justify-content-center fs-5" data-v-b756d576>`);
      _push(ssrRenderComponent(_component_NFTexLogoMini, { classes: "h-50px" }, null, _parent));
      _push(`<span class="badge d-none badge-light-success fw-bold fs-8 px-2 py-1 ms-20 mb-5 position-absolute bottom-0" data-v-b756d576>Pro</span></div><a role="btn" class="fw-bold text-white text-center anta-regular text-hover-primary fs-4 mt-2" data-v-b756d576>${ssrInterpolate(_ctx.$config.public.APP)}</a></div><div class="btn btn-icon btn-icon-danger btn-sm btn-active-light-primary ms-2 end-0 position-absolute top-0 m-4" data-bs-dismiss="modal" aria-label="Close" data-v-b756d576><i class="ki-duotone ki-cross fs-3x" data-v-b756d576><span class="path1" data-v-b756d576></span><span class="path2" data-v-b756d576></span></i></div></div><div class="modal-body mt-lg-3 pt-0" data-v-b756d576>`);
      if (unref(authAction) === "login") {
        _push(`<form data-v-b756d576><div class="d-flex flex-column justify-content-center align-items-center" data-v-b756d576><div class="fs-2" data-v-b756d576>Sign In</div><div class="fs-6 text-muted mb-5 text-center fw-bold" data-v-b756d576> Welcome back </div></div><div class="px-5 menu-item mb-3" data-v-b756d576><label for="" class="form-label" data-v-b756d576>Email</label><input type="email" class="form-control form-control-solid"${ssrRenderAttr("value", unref(form).email)} name="email" data-v-b756d576></div><div class="px-5 menu-item mb-2" data-v-b756d576><label for="" class="form-label" data-v-b756d576>Password</label><div class="d-flex align-items-center justify-content-center flex-column position-relative" bis_skin_checked="1" data-v-b756d576><input class="${ssrRenderClass([
          unref(isInvalidCredentials) ? "is-invalid" : "",
          "form-control form-control-solid pe-10 w-100"
        ])}"${ssrRenderAttr("type", unref(passwordType))} placeholder="password"${ssrRenderDynamicModel(unref(passwordType), unref(form).password, null)} data-v-b756d576><div class="invalid-feedback" data-v-b756d576>${ssrInterpolate(unref(invalidMessage))}</div><button type="button" class="btn position-absolute btn-active-icon-danger me-3 bg-transparent p-0 top-0 mt-3 end-0" data-v-b756d576>`);
        if (unref(passwordType) == "password") {
          _push(`<i class="ki-outline ki-eye fs-3 hover-scale" data-v-b756d576></i>`);
        } else {
          _push(`<i class="ki-outline ki-eye-slash fs-3 hover-scale" data-v-b756d576></i>`);
        }
        _push(`</button></div></div><div class="mx-5 menu-item mb-3 text-end" data-v-b756d576><div role="button" class="text-primaryi fw-bold" data-v-b756d576> Forgot password? </div></div><div class="menu-item px-5" data-v-b756d576><button class="${ssrRenderClass([unref(loading) ? "disabled" : "", "btn btn-secondary w-100 mb-5"])}" data-v-b756d576><span class="indicator-label" data-v-b756d576> Login </span><span class="indicator-progress" data-v-b756d576> Please wait... <span class="spinner-border align-middle ms-2" data-v-b756d576></span></span></button><div class="text-center" data-v-b756d576> New here? <a role="button" class="btn-link" data-v-b756d576> Create account</a></div></div></form>`);
      } else if (unref(authAction) === "register") {
        _push(`<form class="needs-validation" novalidate data-v-b756d576><div class="d-flex justify-content-center align-items-center" data-v-b756d576><div data-v-b756d576><div class="fs-2" data-v-b756d576>Create New Account</div><div class="fs-6 text-muted mb-5 text-center fw-bold" data-v-b756d576> Enjoy endless possibilities. </div></div></div><div class="px-5 menu-item mb-3" data-v-b756d576><label for="" class="form-label" data-v-b756d576>Name</label><input required type="name" class="form-control form-control-solid"${ssrRenderAttr("value", unref(rForm).name)} name="name" data-v-b756d576><div class="invalid-feedback" data-v-b756d576>Name is required</div></div><div class="px-5 menu-item mb-3" data-v-b756d576><label for="" class="form-label" data-v-b756d576>Email</label><input required type="email"${ssrRenderAttr("value", unref(rForm).email)} name="email" class="${ssrRenderClass([
          !validateEmail(unref(rForm).email) && unref(rForm).email ? "is-invalid" : "",
          "form-control form-control-solid"
        ])}" data-v-b756d576><div class="invalid-feedback" data-v-b756d576> Invalid email address </div></div><div class="px-5 menu-item mb-3" data-v-b756d576><label for="" class="form-label" data-v-b756d576>Country</label><select class="form-control" data-v-b756d576><!--[-->`);
        ssrRenderList(unref(countries), (country) => {
          _push(`<option${ssrRenderAttr("value", country.name.common)} data-v-b756d576>${ssrInterpolate(country.name.common)}</option>`);
        });
        _push(`<!--]--></select><div class="invalid-feedback" data-v-b756d576> Country is required </div></div><div class="px-5 menu-item mb-3" data-v-b756d576><label for="" class="form-label" data-v-b756d576>Password</label><div class="d-flex align-items-center justify-content-center flex-column position-relative" bis_skin_checked="1" data-v-b756d576><input required class="${ssrRenderClass([
          validPassword() === false ? "is-invalid" : "",
          "form-control form-control-solid pe-10 w-100"
        ])}"${ssrRenderAttr("type", unref(passwordType))} placeholder="password"${ssrRenderDynamicModel(unref(passwordType), unref(form).password, null)} data-v-b756d576><div class="invalid-feedback" data-v-b756d576>${ssrInterpolate(unref(invalidMessage))}</div><button type="button" class="btn position-absolute btn-active-icon-danger me-3 bg-transparent p-0 top-0 mt-3 end-0" data-v-b756d576>`);
        if (unref(passwordType) == "password") {
          _push(`<i class="ki-outline ki-eye fs-3 hover-scale" data-v-b756d576></i>`);
        } else {
          _push(`<i class="ki-outline ki-eye-slash fs-3 hover-scale" data-v-b756d576></i>`);
        }
        _push(`</button></div></div><div class="menu-item px-5" data-v-b756d576><button${ssrIncludeBooleanAttr(
          !validPassword() || !validateEmail(unref(rForm).email)
        ) ? " disabled" : ""} class="${ssrRenderClass([unref(loading) ? "disabled" : "", "btn btn-secondary w-100"])}" data-v-b756d576><span class="indicator-label" data-v-b756d576> Create account </span><span class="indicator-progress" data-v-b756d576> Please wait... <span class="spinner-border align-middle ms-2" data-v-b756d576></span></span></button></div><div class="mx-5 mt-3 text-center" data-v-b756d576> Have account? <a role="button" class="btn-link border-bottom border-4 fw-bold" data-v-b756d576> Sign in</a></div></form>`);
      } else if (unref(authAction) === "forgot") {
        _push(`<form data-v-b756d576><div class="d-flex justify-content-center align-items-center" data-v-b756d576><div data-v-b756d576><div class="fs-2" data-v-b756d576>Forgot password?</div><div class="fs-6 text-muted mb-5 text-center fw-bold" data-v-b756d576> Recover your password. </div></div></div><div class="px-5 menu-item mb-3" data-v-b756d576><label for="" class="form-label" data-v-b756d576>Email</label><input type="email"${ssrRenderAttr("value", unref(form).email)} name="email" class="${ssrRenderClass([
          !validateEmail(unref(form).email) && unref(form).email ? "is-invalid" : "",
          "form-control form-control-solid"
        ])}" data-v-b756d576><div class="invalid-feedback" data-v-b756d576> Invalid email address </div></div><div class="menu-item px-5" data-v-b756d576><button class="${ssrRenderClass([unref(loading) ? "disabled" : "", "btn btn-secondary w-100"])}" data-v-b756d576><span class="indicator-label" data-v-b756d576> Recover password </span><span class="indicator-progress" data-v-b756d576> Please wait... <span class="spinner-border align-middle ms-2" data-v-b756d576></span></span></button></div><div class="mx-5 mt-3 text-center" data-v-b756d576> Have account? <a role="button" class="btn-link border-bottom border-4 fw-bold" data-v-b756d576> Sign in </a></div></form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoginMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b756d576"]]);
const _sfc_main$1 = {
  __name: "MainMobileNav",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    ref(route.path);
    const config = useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NFTexLogoMini = _sfc_main$6;
      const _component_NuxtLink = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "app-wrapper flex-column flex-row-fluid",
        id: "kt_app_wrapper"
      }, _attrs))}><div id="kt_app_sidebar" class="app-sidebar flex-column" data-kt-drawer="true" data-kt-drawer-name="app-sidebar" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="250px" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"><div class="app-sidebar-logo mx-auto pt-7 pt-xl-18 mb-xl-9" id="kt_app_sidebar_logo">`);
      _push(ssrRenderComponent(_component_NFTexLogoMini, { classes: "h-60px" }, null, _parent));
      _push(`</div><div class="app-sidebar-menu overflow-hidden flex-column-fluid"><div id="kt_app_sidebar_menu_wrapper" class="app-sidebar-wrapper hover-scroll-y my-5 mx-3 mx-xl-11" data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer" data-kt-scroll-wrappers="#kt_app_sidebar_menu" data-kt-scroll-offset="5px"><div class="menu menu-column menu-rounded menu-sub-indention menu-active-bg menu- px-3" id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">`);
      if (("useAuth" in _ctx ? _ctx.useAuth : unref(useAuth))().isAuthenticated()) {
        _push(`<a href="/app" class="menu-item menu-accordion"><span class="menu-link"><span class="menu-icon"><i class="ki-solid fs-2 ki-user"></i></span><span class="menu-title">Profile</span></span></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div role="button" data-bs-toggle="modal" data-bs-target="#kt_modal_login" class="menu-item menu-accordion"><span class="menu-link"><span class="menu-icon"><i class="ki-solid fs-2 ki-user-edit"></i></span><span class="menu-title">Sign up</span></span></div><div data-kt-menu-trigger="click" class="menu-item menu-accordion"><span class="menu-link"><span class="menu-icon"><i class="ki-solid fs-2 ki-book"></i></span><span class="menu-title">Resources</span></span><div class="menu-sub menu-sub-accordion">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/resources/about-us",
        class: "menu-item menu-accordion"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="menu-link"${_scopeId}><span class="menu-bullet"${_scopeId}><span class="bullet bullet-dot"${_scopeId}></span></span><span class="menu-title"${_scopeId}> About ${ssrInterpolate(unref(config).app)}</span></span>`);
          } else {
            return [
              createVNode("span", { class: "menu-link" }, [
                createVNode("span", { class: "menu-bullet" }, [
                  createVNode("span", { class: "bullet bullet-dot" })
                ]),
                createVNode("span", { class: "menu-title" }, " About " + toDisplayString(unref(config).app), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/resources/contact-us",
        class: "menu-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="menu-link"${_scopeId}><span class="menu-bullet"${_scopeId}><span class="bullet bullet-dot"${_scopeId}></span></span><span class="menu-title"${_scopeId}>Contact Us</span></span>`);
          } else {
            return [
              createVNode("span", { class: "menu-link" }, [
                createVNode("span", { class: "menu-bullet" }, [
                  createVNode("span", { class: "bullet bullet-dot" })
                ]),
                createVNode("span", { class: "menu-title" }, "Contact Us")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div data-kt-menu-trigger="click" class="menu-item menu-accordion"><span class="menu-link"><span class="menu-icon"><i class="ki-duotone fs-2 ki-note"><span class="path1"></span><span class="path2"></span></i></span><span class="menu-title">Languages</span></span><div class="menu-sub menu-sub-accordion"><div data-kt-menu-trigger="click" class="menu-item menu-accordion"><span class="menu-link"><span class="menu-bullet"><span class="bullet bullet-dot"></span></span><span class="menu-title">English</span></span></div><div data-kt-menu-trigger="click" class="menu-item menu-accordion"><span class="menu-link"><span class="menu-bullet"><span class="bullet bullet-dot"></span></span><span class="menu-title">French</span></span></div></div></div></div></div></div><div class="app-sidebar-footer overflow-hidden flex-column-auto m-9" id="kt_app_sidebar_footer"><button class="btn btn-light-primary w-100 mb-7" data-bs-toggle="modal" data-bs-target="#kt_modal_login"> Sign in </button><div class="d-flex justify-content-center w-100">`);
      _push(ssrRenderComponent(_component_NFTexLogoMini, {
        classes: "h-20px",
        "app-class": "fs-8"
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MainMobileNav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MainMobileNav = _sfc_main$1;
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useRuntimeConfig().public;
    useRoute();
    console.log();
    userData().data;
    ref("all");
    const loaded = useCookie("reload", { maxAge: 60 * 60 * 24 });
    loaded.value = false;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$4;
      const _component_Footer = __nuxt_component_1;
      const _component_LoginMenu = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "kt_app_body",
        "data-kt-app-header-fixed-mobile": "true",
        "data-kt-app-sidebar-enabled": "true",
        "data-kt-app-sidebar-push-header": "true",
        "data-kt-app-sidebar-push-toolbar": "true",
        "data-kt-app-sidebar-push-footer": "true",
        class: "app-default w-100 overflow-hidden"
      }, _attrs))} data-v-f5f2f035><div class="d-flex flex-column flex-root app-root" id="kt_app_root" data-v-f5f2f035><div class="app-page flex-column flex-column-fluid" id="kt_app_page" data-v-f5f2f035>`);
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      _push(`<div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper" data-v-f5f2f035><div class="app-main flex-column flex-row-fluid" id="kt_app_main" data-v-f5f2f035><div class="d-flex flex-column flex-column-fluid" data-v-f5f2f035><div id="kt_app_content" class="app-content flex-column-fluid" data-v-f5f2f035><div style="${ssrRenderStyle({ "position": "relative" })}" id="kt_app_content_container" class="app-container position-relative" data-v-f5f2f035>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_Footer, { class: "mb-n10" }, null, _parent));
      _push(`</div></div></div></div></div><div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true" data-v-f5f2f035><i class="ki-outline ki-arrow-up" data-v-f5f2f035></i></div>`);
      _push(ssrRenderComponent(_component_LoginMenu, null, null, _parent));
      _push(ssrRenderComponent(MainMobileNav, { class: "d-lg-none" }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f5f2f035"]]);

export { _default as default };
//# sourceMappingURL=default-a0532f48.mjs.map
