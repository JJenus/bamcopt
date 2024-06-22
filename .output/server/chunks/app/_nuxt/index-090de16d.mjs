import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main$2 = {
  __name: "email",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card mb-5 mb-xl-10" }, _attrs))}><div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_email_preferences" aria-expanded="true" aria-controls="kt_account_email_preferences"><div class="card-title m-0"><h3 class="fw-bold m-0">Email Preferences</h3></div></div><div id="kt_account_settings_email_preferences" class="collapse show"><form class="form"><div class="card-body border-top px-9 py-9"><label class="form-check form-check-custom form-check-solid align-items-start"><input class="form-check-input me-3" type="checkbox" name="email-preferences[]" value="1"><span class="form-check-label d-flex flex-column align-items-start"><span class="fw-bold fs-5 mb-0">Successful Payments</span><span class="text-muted fs-6">Receive a notification for every successful payment.</span></span></label><div class="separator separator-dashed my-6"></div><label class="form-check form-check-custom form-check-solid align-items-start"><input class="form-check-input me-3" type="checkbox" name="email-preferences[]" checked value="1"><span class="form-check-label d-flex flex-column align-items-start"><span class="fw-bold fs-5 mb-0">Payouts</span><span class="text-muted fs-6">Receive a notification for every initiated payout.</span></span></label><div class="separator separator-dashed my-6"></div><label class="form-check form-check-custom form-check-solid align-items-start"><input class="form-check-input me-3" type="checkbox" name="email-preferences[]" value="1"><span class="form-check-label d-flex flex-column align-items-start"><span class="fw-bold fs-5 mb-0">Fee Collection</span><span class="text-muted fs-6">Receive a notification each time you collect a fee from sales</span></span></label><div class="separator separator-dashed my-6"></div><label class="form-check form-check-custom form-check-solid align-items-start"><input class="form-check-input me-3" type="checkbox" name="email-preferences[]" checked value="1"><span class="form-check-label d-flex flex-column align-items-start"><span class="fw-bold fs-5 mb-0">Customer Payment Dispute</span><span class="text-muted fs-6">Receive a notification if a payment is disputed by a customer and for dispute purposes.</span></span></label><div class="separator separator-dashed my-6"></div><label class="form-check form-check-custom form-check-solid align-items-start"><input class="form-check-input me-3" type="checkbox" name="email-preferences[]" value="1"><span class="form-check-label d-flex flex-column align-items-start"><span class="fw-bold fs-5 mb-0">Refund Alerts</span><span class="text-muted fs-6">Receive a notification if a payment is stated as risk by the Finance Department.</span></span></label><div class="separator separator-dashed my-6"></div><label class="form-check form-check-custom form-check-solid align-items-start"><input class="form-check-input me-3" type="checkbox" name="email-preferences[]" checked value="1"><span class="form-check-label d-flex flex-column align-items-start"><span class="fw-bold fs-5 mb-0">Invoice Payments</span><span class="text-muted fs-6">Receive a notification if a customer sends an incorrect amount to pay their invoice.</span></span></label></div><div class="card-footer d-flex justify-content-end py-6 px-9"><button class="btn btn-light btn-active-light-primary me-2"> Discard </button><button class="btn btn-primary px-6">Save Changes</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/settings/email.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "notification",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card mb-5 mb-xl-10" }, _attrs))}><div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_notifications" aria-expanded="true" aria-controls="kt_account_notifications"><div class="card-title m-0"><h3 class="fw-bold m-0">Notifications</h3></div></div><div id="kt_account_settings_notifications" class="collapse show"><form class="form"><div class="card-body border-top px-9 pt-3 pb-4"><div class="table-responsive"><table class="table table-row-dashed border-gray-300 align-middle gy-6"><tbody class="fs-6 fw-semibold"><tr><td class="min-w-250px fs-4 fw-bold"> Notifications </td><td class="w-125px"><div class="form-check form-check-custom form-check-solid"><input class="form-check-input" type="checkbox" value="" id="kt_settings_notification_email" checked data-kt-check="true" data-kt-check-target="[data-kt-settings-notification=email]"><label class="form-check-label ps-2" for="kt_settings_notification_email"> Email </label></div></td><td class="w-125px"><div class="form-check form-check-custom form-check-solid"><input class="form-check-input" type="checkbox" value="" id="kt_settings_notification_phone" checked data-kt-check="true" data-kt-check-target="[data-kt-settings-notification=phone]"><label class="form-check-label ps-2" for="kt_settings_notification_phone"> Phone </label></div></td></tr><tr><td>Billing Updates</td><td><div class="form-check form-check-custom form-check-solid"><input class="form-check-input" type="checkbox" value="1" id="billing1" checked data-kt-settings-notification="email"><label class="form-check-label ps-2" for="billing1"></label></div></td><td><div class="form-check form-check-custom form-check-solid"><input class="form-check-input" type="checkbox" value="" id="billing2" checked data-kt-settings-notification="phone"><label class="form-check-label ps-2" for="billing2"></label></div></td></tr><tr><td class="border-bottom-0">Newsletters</td><td class="border-bottom-0"><div class="form-check form-check-custom form-check-solid"><input class="form-check-input" type="checkbox" value="" id="newsletter1" data-kt-settings-notification="email"><label class="form-check-label ps-2" for="newsletter1"></label></div></td><td class="border-bottom-0"><div class="form-check form-check-custom form-check-solid"><input class="form-check-input" type="checkbox" value="" id="newsletter2" data-kt-settings-notification="phone"><label class="form-check-label ps-2" for="newsletter2"></label></div></td></tr></tbody></table></div></div><div class="card-footer d-flex justify-content-end py-6 px-9"><button class="btn btn-light btn-active-light-primary me-2"> Discard </button><button class="btn btn-primary px-6">Save Changes</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/settings/notification.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$1;
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppSettingsEmail = __nuxt_component_0;
  const _component_AppSettingsNotification = __nuxt_component_1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_AppSettingsEmail, null, null, _parent));
  _push(ssrRenderComponent(_component_AppSettingsNotification, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/app/settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-090de16d.mjs.map
