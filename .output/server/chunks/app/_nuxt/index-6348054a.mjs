import { Swiper, SwiperSlide } from 'swiper/vue';
import { mergeProps, unref, useSSRContext, ref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList } from 'vue';
import { Autoplay } from 'swiper/modules';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './NFTexLogo-b1aa70f7.mjs';
import { u as useRuntimeConfig } from '../server.mjs';
import { u as useSeoMeta } from './index-2fc80598.mjs';
import { _ as _imports_0 } from './17-dark-b0378306.mjs';
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
import './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';

const _sfc_main$1 = {
  __name: "MainSlide",
  __ssrInlineRender: true,
  setup(__props) {
    const NFTs = ref([
      { image: "/assets/media/fx/forex-14-2651231641.jpg" },
      {
        image: "/assets/media/banking/business-people-analyzing-stock-market_53876-96070.jpg"
      },
      {
        name: "Again",
        floor: "20.23 ETH",
        volume: "12,21",
        image: "/assets/media/banking/flat-lay-business-concept_53876-24738.jpg"
      },
      {
        name: "Maldiva",
        floor: "1.23 Matic",
        volume: "11,420",
        image: "/assets/media/banking/green-arrow-is-going-up-stacks-coins-arranged-bar-graph_35913-3151.jpg"
      },
      {
        name: "Greener",
        floor: "91.23 Matic",
        volume: "11,420",
        image: "/assets/media/banking/man-hand-holding-virtual-world-with-internet-connection-metaverse-global-business-marketing-banking-financial-pass-thru-application-technology-concept_616485-32.jpg"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Swiper = Swiper;
      const _component_SwiperSlide = SwiperSlide;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-100" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Swiper, {
        modules: ["SwiperAutoplay" in _ctx ? _ctx.SwiperAutoplay : unref(Autoplay)],
        "space-between": 10,
        loop: true,
        autoplay: {
          delay: 3e3,
          disableOnInteraction: true
        },
        class: "rounded-3 bg-transparent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(NFTs), (nft, i) => {
              _push2(ssrRenderComponent(_component_SwiperSlide, {
                key: i,
                class: "rounded-3 bg-transparent"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", nft.image)} alt="" class="h-250px h-md-300px h-lg-450px w-500px w-lg-900px rounded-3"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: nft.image,
                        alt: "",
                        class: "h-250px h-md-300px h-lg-450px w-500px w-lg-900px rounded-3"
                      }, null, 8, ["src"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(NFTs), (nft, i) => {
                return openBlock(), createBlock(_component_SwiperSlide, {
                  key: i,
                  class: "rounded-3 bg-transparent"
                }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src: nft.image,
                      alt: "",
                      class: "h-250px h-md-300px h-lg-450px w-500px w-lg-900px rounded-3"
                    }, null, 8, ["src"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/swiper/MainSlide.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$1;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const CONFIG = useRuntimeConfig().public;
    useSeoMeta({
      title: `${CONFIG.APP}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SwiperMainSlide = __nuxt_component_0;
      const _component_NFTexLogo = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-fluid" }, _attrs))}><div class="card border-0 bg-transparent"><div class="card-body p-0"><div class="row row-cols-1 row-cols-lg-2 justify-content-between align-items-center mb-5"><div class="col"><div class="mw-450px ms-md-4i ms-xl-1"><h1 class="display-4"> Banking made simple, secure, and seamless. That&#39;s the <span class="text-danger">${ssrInterpolate(unref(CONFIG).APP)}</span> promise. </h1><h6 class="text-muted mb-10"> Secure, Seamless, and Smart Banking Solutions Await You! </h6></div></div><div class="col"><div class="mx-n16 rounded me-lg-0">`);
      _push(ssrRenderComponent(_component_SwiperMainSlide, null, null, _parent));
      _push(`</div></div></div><div class="card border-transparent my-12" data-bs-theme="light" style="${ssrRenderStyle({ "background-color": "#1c325e" })}"><div class="card-body d-flex ps-xl-15"><div class="m-0"><div class="position-relative mb-5 fs-1 z-index-2 fw-bold text-white mb-7"><span class="me-2"> We here for <span class="position-relative d-inline-block text-success"><a role="button" class="text-success opacity-75-hover"> you </a>! <span class="position-absolute opacity-50 bottom-0 start-0 border-4 border-success border-bottom w-100"></span></span></span><br><span class="fs-3x"> What to expect </span></div><div class="mb-3 position-relative mt-8" style="${ssrRenderStyle({ "z-index": "2" })}"><a role="button" class="btn btn-success fw-semibold me-2" data-bs-toggle="modal" data-bs-target="#kt_modal_login"> Created Account </a><a data-bs-toggle="modal" data-bs-target="#kt_modal_login" role="button" class="btn btn-color-white bg-white bg-opacity-15 bg-hover-opacity-25 fw-semibold"> Sign in </a></div></div><img${ssrRenderAttr("src", _imports_0)} class="position-absolute me-3 bottom-0 end-0 h-200px" style="${ssrRenderStyle({ "z-index": "1" })}" alt=""></div></div><div class="card card-flush h-xl-100 mb-5"><div class="card-body py-9"><div class="row gx-9 h-100"><div class="col-sm-6 mb-10 mb-sm-0"><a class="d-block overlay h-100" role="button"><div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-200px h-100" style="${ssrRenderStyle({ "background-image": "url('https://t3.ftcdn.net/jpg/03/30/78/08/240_F_330780882_gUmEzkzPLQebQJclnvXxa0Bt1qE83acZ.jpg')" })}"></div><div class="overlay-layer card-rounded bg-dark bg-opacity-25">`);
      _push(ssrRenderComponent(_component_NFTexLogo, { classes: "h-30px" }, null, _parent));
      _push(`</div></a></div><div class="col-sm-6 card border-0"><div class="card-body d-flex flex-column justify-content-center h-lg-400px align-items-center"><div class="mb-0"><div class="text-centeri mb-7 mb-lg-10"><i class="ki-duotone d-md-none ki-send text-success fs-2 order-1o me-2"><span class="path1"></span><span class="path2"></span></i><a role="button" class="text-gray-800 text-hover-primary fs-3 fs-md-2x fw-bold">Seamless Transactions</a></div></div><div class="d-flex flex-column flex-md-row justify-content-between align-items-center"><i class="ki-duotone d-none d-md-block ki-send text-success fs-5x order-1o me-5"><span class="path1"></span><span class="path2"></span></i><div><span class="fw-bold text-gray-600i fs-4 pb-5">${ssrInterpolate(unref(CONFIG).APP)} ensures that your transactions are smooth and effortless. With our intuitive interface and streamlined processes, sending money, paying bills, and managing your finances is quick and easy.4</span></div></div></div></div></div></div></div><div class="card card-flush h-xl-100 mb-5"><div class="card-body py-9"><div class="row gx-9 h-100"><div class="col-sm-6 mb-10 mb-sm-0 order-1 order-lg-2"><a class="d-block overlay h-100" role="button"><div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-200px h-100" style="${ssrRenderStyle({ "background-image": "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rockwellautomation.com%2Fcontent%2Fdam%2Frockwell-automation%2Fsites%2Fimages%2Fsimple-content%2Fblogs%2FTailor-cybersecurity-to-OT-environments.jpg&f=1&nofb=1&ipt=303a1f2385dfc3986e20aa3cfc0e1edcfb19f54e9df0ec6d9b801458dc80f68f&ipo=images')" })}"></div><div class="overlay-layer card-rounded bg-dark bg-opacity-25">`);
      _push(ssrRenderComponent(_component_NFTexLogo, { classes: "h-30px" }, null, _parent));
      _push(`</div></a></div><div class="col-sm-6 card border-0 order-2 order-lg-1"><div class="card-body d-flex flex-column justify-content-center h-lg-400px align-items-center"><div class="mb-0"><div class="text-centeri mb-7 mb-lg-10"><i class="ki-solid d-md-none ki-lock-3 fs-2 text-danger me-2"></i><a role="button" class="text-gray-800 text-hover-primary fs-3 fs-md-2x fw-bold">Robust Security Measures</a></div></div><div class="d-flex flex-column flex-md-row justify-content-between align-items-center"><i class="ki-duotone ki-lock-3 fs-5x text-danger me-5"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i><div><span class="fw-bold text-gray-600i fs-4 pb-5">our security is our top priority. ${ssrInterpolate(unref(CONFIG).APP)} employs state-of-the-art encryption techniques and multi-factor authentication to safeguard your account and personal information. Rest assured, your data is protected against unauthorized access and cyber threats. </span></div></div></div></div></div></div></div><div class="card card-flush h-xl-100 mb-5"><div class="card-body py-9"><div class="row gx-9 h-100"><div class="col-sm-6 mb-10 mb-sm-0"><div class="d-block overlay h-100" role="button"><div class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-200px h-100" style="${ssrRenderStyle({ "background-image": "url('/assets/media/banking/All-Web-Banner-Banking-2426953948.jpg')" })}"></div><div class="overlay-layer card-rounded bg-dark bg-opacity-25">`);
      _push(ssrRenderComponent(_component_NFTexLogo, { classes: "h-30px" }, null, _parent));
      _push(`</div></div></div><div class="col-sm-6 card border-0"><div class="card-body d-flex flex-column justify-content-center h-lg-300px align-items-center"><div class="mb-0"><div class="text-centeri mb-7 mb-lg-10"><i class="ki-duotone ki-monitor-mobile fs-1 text-warning me-2 d-md-none"><span class="path1"></span><span class="path2"></span></i><a role="button" class="text-gray-800 text-hover-primary fs-3 fs-md-2x fw-bold">Hassle-Free Banking </a></div></div><div class="d-flex flex-column flex-md-row justify-content-between align-items-center"><i class="ki-duotone ki-monitor-mobile fs-5x text-warning me-5 d-none d-md-block"><span class="path1"></span><span class="path2"></span></i><div><span class="fw-bold text-gray-600i fs-4 pb-5">${ssrInterpolate(unref(CONFIG).APP)} ensures that your transactions are smooth and effortless. With our intuitive interface and streamlined processes, sending money, paying bills, and managing your finances is quick and easy.4</span></div></div></div></div></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-6348054a.mjs.map
