import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card mb-5 mb-xl-10" }, _attrs))}><div class="card-header"><div class="card-title"><h3>Login Sessions</h3></div><div class="card-toolbar"><div class="my-1 me-4"><select class="form-select form-select-sm form-select-solid w-125px select2-hidden-accessible" data-control="select2" data-placeholder="Select Hours" data-hide-search="true" data-select2-id="select2-data-1-mxj5" tabindex="-1" aria-hidden="true" data-kt-initialized="1"><option value="1" selected data-select2-id="select2-data-3-dbvs"> 1 Hours </option><option value="2">6 Hours</option><option value="3">12 Hours</option><option value="4">24 Hours</option></select><span class="select2 select2-container select2-container--bootstrap5" dir="ltr" data-select2-id="select2-data-2-mx2z" style="${ssrRenderStyle({ "width": "100%" })}"><span class="selection"><span class="select2-selection select2-selection--single form-select form-select-sm form-select-solid w-125px" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jiut-container" aria-controls="select2-jiut-container"><span class="select2-selection__rendered" id="select2-jiut-container" role="textbox" aria-readonly="true" title="1 Hours">1 Hours</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></div><a role="button" class="btn btn-sm btn-primary my-1"> View All </a></div></div><div class="card-body p-0"><div class="table-responsive"><table class="table align-middle table-row-bordered table-row-solid gy-4 gs-9"><thead class="border-gray-200 fs-5 fw-semibold bg-lighten"><tr><th class="min-w-250px">Location</th><th class="min-w-100px">Status</th><th class="min-w-150px">Device</th><th class="min-w-150px">IP Address</th><th class="min-w-150px">Time</th></tr></thead><tbody class="fw-6 fw-semibold text-gray-600"><tr class="d-none"><td><a href="#" class="text-hover-primary text-gray-600">USA(5)</a></td><td><span class="badge badge-light-success fs-7 fw-bold">OK</span></td><td>Chrome - Windows</td><td>236.125.56.78</td><td>2 mins ago</td></tr></tbody></table></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/settings/loginSessions.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_deactivate" aria-expanded="true" aria-controls="kt_account_deactivate"><div class="card-title m-0"><h3 class="fw-bold m-0">Deactivate Account</h3></div></div><div id="kt_account_settings_deactivate" class="collapse show"><form id="kt_account_deactivate_form" class="form fv-plugins-bootstrap5 fv-plugins-framework" novalidate><div class="card-body border-top p-9"><div class="notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6"><i class="ki-outline ki-information fs-2tx text-warning me-4"></i><div class="d-flex flex-stack flex-grow-1"><div class="fw-semibold"><h4 class="text-gray-900 fw-bold"> You Are Deactivating Your Account </h4><div class="fs-6 text-gray-700"> For extra security, this requires you to confirm your email or phone number when you reset yousignr password. <br><a class="fw-bold" href="#">Learn more</a></div></div></div></div><div class="form-check form-check-solid fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid"><input name="deactivate" class="form-check-input" type="checkbox" value="" id="deactivate"><label class="form-check-label fw-semibold ps-2 fs-6" for="deactivate">I confirm my account deactivation</label><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div></div><div class="card-footer d-flex justify-content-end py-6 px-9"><button id="kt_account_deactivate_account_submit" type="submit" class="btn btn-danger fw-semibold"> Deactivate Account </button></div><input type="hidden"></form></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/settings/deactivate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_0 as _, __nuxt_component_1 as a };
//# sourceMappingURL=deactivate-4a8a4a75.mjs.map
