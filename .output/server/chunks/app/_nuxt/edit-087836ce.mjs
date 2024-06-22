import { u as userData } from './userData-981e93ad.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "edit",
  __ssrInlineRender: true,
  setup(__props) {
    const user = userData().data;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "kt_account_settings_profile_details",
        class: "collapse show"
      }, _attrs))}><form id="kt_account_profile_details_form" class="form fv-plugins-bootstrap5 fv-plugins-framework" novalidate><div class="row mb-6 justify-content-center align-items-center"><label class="col-lg-4 col-form-label fw-semibold fs-6">Avatar</label><div class="col-lg-8"><div class="image-input image-input-outline image-input-empty" data-kt-image-input="true" style="${ssrRenderStyle(`background-image: ${unref(user).imgUrl};`)}"><div class="image-input-wrapper w-125px h-125px" style="${ssrRenderStyle({ "background-image": "none" })}"></div><label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" aria-label="Change avatar" data-bs-original-title="Change avatar" data-kt-initialized="1"><i class="ki-outline ki-pencil fs-7"></i><input type="file" name="avatar" accept=".png, .jpg, .jpeg"><input type="hidden" name="avatar_remove" value="1"></label><span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" aria-label="Cancel avatar" data-bs-original-title="Cancel avatar" data-kt-initialized="1"><i class="ki-outline ki-cross fs-2"></i></span><span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" aria-label="Remove avatar" data-bs-original-title="Remove avatar" data-kt-initialized="1"><i class="ki-outline ki-cross fs-2"></i></span></div><div class="form-text"> Allowed file types: png, jpg, jpeg. </div></div></div><div class="row mb-6"><label class="col-lg-4 col-form-label required fw-semibold fs-6">Full Name</label><div class="col-lg-8"><div class="row"><div class="col fv-row fv-plugins-icon-container"><input type="text" name="name" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Full name"${ssrRenderAttr("value", unref(user).name)}><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div></div></div></div><div class="row mb-6"><label class="col-lg-4 col-form-label fw-semibold fs-6"><span class="required">Contact Phone</span><span class="ms-1" data-bs-toggle="tooltip" aria-label="Phone number must be active" data-bs-original-title="Phone number must be active" data-kt-initialized="1"><i class="ki-outline ki-information-5 text-gray-500 fs-6"></i></span></label><div class="col-lg-8 fv-row fv-plugins-icon-container"><input type="tel" name="phone" class="form-control form-control-lg form-control-solid" placeholder="Phone number"${ssrRenderAttr("value", unref(user).phone)}><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div></div><div class="row mb-6"><label class="col-lg-4 col-form-label required fw-semibold fs-6">Address</label><div class="col-lg-8 fv-row fv-plugins-icon-container"><input type="text" name="address" class="form-control form-control-lg form-control-solid" placeholder="Address"${ssrRenderAttr("value", unref(user).address)}><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div></div><div class="row mb-6"><label class="col-lg-4 col-form-label fw-semibold fs-6">City</label><div class="col-lg-8 fv-row"><input type="text" name="city" class="form-control form-control-lg form-control-solid" placeholder="City"${ssrRenderAttr("value", unref(user).city)}></div></div><div class="row mb-6"><label class="col-lg-4 col-form-label fw-semibold fs-6"><span class="required">Country</span><span class="ms-1" data-bs-toggle="tooltip" aria-label="Country of origination" data-bs-original-title="Country of origination" data-kt-initialized="1"><i class="ki-outline ki-information-5 text-gray-500 fs-6"></i></span></label><div class="col-lg-8 fv-row fv-plugins-icon-container"><input type="text" name="country" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Country"${ssrRenderAttr("value", unref(user).country)}><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div></div><div class="row mb-6"><label class="col-lg-4 col-form-label required fw-semibold fs-6">Communication</label><div class="col-lg-8 fv-row fv-plugins-icon-container"><div class="d-flex align-items-center mt-3"><label class="form-check form-check-custom form-check-inline form-check-solid me-5"><input class="form-check-input" name="communication[]" type="checkbox" value="1"><span class="fw-semibold ps-2 fs-6"> Email </span></label><label class="form-check form-check-custom form-check-inline form-check-solid"><input class="form-check-input" name="communication[]" type="checkbox" value="2"><span class="fw-semibold ps-2 fs-6"> Phone </span></label></div><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div></div><div class="row mb-0"><label class="col-lg-4 col-form-label fw-semibold fs-6"> Receive Notifications </label><div class="col-lg-8 d-flex align-items-center"><div class="form-check form-check-solid form-switch form-check-custom fv-row"><input class="form-check-input w-45px h-30px" type="checkbox" id="allowmarketing" checked><label class="form-check-label" for="allowmarketing"></label></div></div></div><div class="d-flex justify-content-end py-6 px-9"><button type="reset" class="btn btn-light btn-active-light-primary me-2"> Discard </button><button type="submit" class="btn btn-primary" id="kt_account_profile_details_submit"> Save Changes </button></div><input type="hidden"></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/profile/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=edit-087836ce.mjs.map
