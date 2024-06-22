import { u as useRuntimeConfig } from '../server.mjs';
import { u as useSeoMeta } from './index-2fc80598.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0, b as _imports_1, a as _imports_2 } from './twitter-9237f9cf.mjs';
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
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';

const currentPage = "Contact Us";
const _sfc_main = {
  __name: "contact-us",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig().public;
    useSeoMeta({
      title: `${config.APP} - ${currentPage}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="page-title d-flex flex-column justify-content-center me-3 mb-10"><h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0"> Contact Us </h1><ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"><li class="breadcrumb-item text-muted"><a href="/" class="text-muted text-hover-primary"> Home </a></li><li class="breadcrumb-item"><span class="bullet bg-gray-400 w-5px h-2px"></span></li><li class="breadcrumb-item text-muted">Request</li><li class="breadcrumb-item"><span class="bullet bg-gray-400 w-5px h-2px"></span></li><li class="breadcrumb-item text-muted">Let&#39;s speak</li></ul></div><div class="d-flex flex-column flex-xl-row"><div class="card bg-body flex-row-fluid mb-9 mb-xl-0 me-xl-9"><div class="card-body"><form action="#" class="form mb-15" method="post" id="kt_contact_form"><div class="d-flex flex-column mb-9 fv-row"><h1 class="fw-bold text-dark mb-7"> Submit a Request </h1><span class="fs-4 fw-semibold text-gray-600 d-block"> Have a question about your account? Looking for a specific product? </span></div><div class="row mb-5"><div class="col-md-6 fv-row"><label class="fs-5 fw-semibold mb-2">Name</label><input type="text" class="form-control form-control-solid" placeholder="" name="name"></div><div class="col-md-6 fv-row"><label class="fs-5 fw-semibold mb-2">Email</label><input type="text" class="form-control form-control-solid" placeholder="" name="email"></div></div><div class="d-flex flex-column mb-5 fv-row"><label class="fs-5 fw-semibold mb-2">Subject</label><input class="form-control form-control-solid" placeholder="" name="subject"></div><div class="d-flex flex-column mb-10 fv-row"><label class="fs-6 fw-semibold mb-2">Message</label><textarea class="form-control form-control-solid" rows="6" name="message" placeholder="">
							</textarea></div><button type="submit" class="btn btn-primary" id="kt_contact_submit_button"><span class="indicator-label"> Send Feedback</span><span class="indicator-progress"> Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span></button></form><div id="kt_contact_map" class="w-100 rounded mb-2 mb-lg-0 mt-2" style="${ssrRenderStyle({ "height": "486px" })}"></div></div></div><div class="flex-column flex-lg-row-auto w-100 w-xl-350px"><div class="card card-flush bg-body mb-9"><div class="card-header"><h2 class="card-title fs-2 fw-bold text-dark"> Let\u2019s Speak </h2><div class="card-toolbar"><button type="button" class="btn btn-sm btn-icon btn-color-primary"><i class="ki-outline ki-phone fs-1"></i></button></div></div><div class="card-body pt-2"><div class="mb-5"><div class="d-flex flex-stack mb-5"><span class="text-gray-400 fs-4 fw-bold">WhatsApp</span><span class="text-gray-700 fs-4 fw-bold">${ssrInterpolate(_ctx.$config.public.MOBILE)}</span></div><div class="d-flex flex-stack mb-5 d-none"><span class="text-gray-400 fs-4 fw-bold">Amsterdam</span><span class="text-gray-700 fs-4 fw-bold">(671) 555-0110</span></div></div><span class="text-gray-800 fs-6 fw-semibold d-block mb-9"> We&#39;re available anytime you need us. <br> Contact us on any of these channels. </span><div class="d-flex flex-stack mb-6"><h2 class="card-title fs-2 fw-bold text-dark"> Let\u2019s Read </h2><div class="card-toolbar"><button type="button" class="btn btn-sm btn-icon btn-color-primary"><i class="ki-outline ki-sms fs-2hx"></i></button></div></div><div class="mb-4"><div class="d-flex flex-stack"><span class="text-gray-400 fs-4 fw-bold">Support</span><a${ssrRenderAttr("href", `mailto:support@${_ctx.$config.public.APP}.com`)} class="text-gray-700 text-hover-primary fs-4 fw-bold">support@${ssrInterpolate(_ctx.$config.public.APP)}.com</a></div></div></div></div><div class="card card-flush bg-body"><div class="card-header"><h4 class="card-title fw-bold text-">Stay Connected</h4></div><div class="card-body pt-2"><div class="mb-6"><a href="#" class="mb-6"><img${ssrRenderAttr("src", _imports_0)} class="h-20px me-2" alt=""><span class="text-gray-700 text-hover-primary fs-5 mb-6">Facebook</span></a></div><div class="mb-6"><a href="#" class="mb-6"><img${ssrRenderAttr("src", _imports_1)} class="h-20px me-2" alt=""><span class="text-gray-700 text-hover-primary fs-5 mb-6">Twitter</span></a></div><div class=""><a href="#" class="mb-6"><img${ssrRenderAttr("src", _imports_2)} class="h-20px me-2" alt=""><span class="text-gray-700 text-hover-primary fs-5 mb-6">Instagram</span></a></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/resources/contact-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-us-bebbdd58.mjs.map
