import { u as userData, a as useAuth } from './userData-981e93ad.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import currency from 'currency.js';
import { u as useRuntimeConfig } from '../server.mjs';
import moment from 'moment';
import { u as useAppSettings } from './appSettings-112ed972.mjs';
import axios from 'axios';
import './cookie-8c768185.mjs';
import 'cookie-es';
import 'h3';
import 'destr';
import 'ohash';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'ufo';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';
import 'http-graceful-shutdown';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "User",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  setup(__props) {
    const props = __props;
    userData().active;
    const balance = () => {
      let cAmount = props.user.account.amount;
      if (!cAmount) {
        cAmount = 0;
      }
      const amount = currency(cAmount, {
        symbol: ""
      }).format();
      return amount;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "card user",
        bis_skin_checked: "1"
      }, _attrs))}><div class="card-body d-flex flex-center flex-column py-9 px-5" bis_skin_checked="1"><div class="symbol symbol-65px symbol-circle mb-5" bis_skin_checked="1"><img${ssrRenderAttr("src", _ctx.user.imgUrl || "/assets/media/svg/avatars/blank.svg")} alt="image"><div class="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3" bis_skin_checked="1"></div></div><a role="button" class="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">${ssrInterpolate(_ctx.user.name)}</a><div class="fw-semibold text-gray-400 mb-6" bis_skin_checked="1">${ssrInterpolate(_ctx.user.email)}</div><div class="d-flex flex-center flex-wrap mb-0" bis_skin_checked="1"><div class="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3" bis_skin_checked="1"><div class="fs-6 fw-bold text-gray-700" bis_skin_checked="1"> $${ssrInterpolate(balance())}</div><div class="fw-semibold text-gray-400" bis_skin_checked="1"> Balance </div></div><button type="button" class="btn btn-sm btn-light-primary btn-flex btn-center" data-kt-follow-btn="true"><i class="ki-duotone ki-user-square"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i><span class="mt-0">View</span></button></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/users/User.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Notify",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  setup(__props) {
    const props = __props;
    const form = ref({
      title: "",
      userId: props.user.id,
      message: "",
      type: "info",
      status: "unread"
    });
    ref();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "card mb-5 mb-xl-10",
        bis_skin_checked: "1"
      }, _attrs))}><div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details" bis_skin_checked="1"><div class="card-title m-0" bis_skin_checked="1"><h3 class="fw-bold m-0">Send Notification</h3></div></div><div id="kt_account_settings_profile_details" class="collapse show" bis_skin_checked="1"><form class="form fv-plugins-bootstrap5 fv-plugins-framework" novalidate><div class="card-body border-top p-9" bis_skin_checked="1"><div class="row mb-6" bis_skin_checked="1"><label class="col-lg-4 col-form-label required fw-semibold fs-6">Title</label><div class="col-lg-8 fv-row fv-plugins-icon-container" bis_skin_checked="1"><input type="text" name="title" class="form-control form-control-lg form-control-solid" placeholder="Title" required${ssrRenderAttr("value", unref(form).title)}><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" bis_skin_checked="1"></div></div></div><div class="row mb-6" bis_skin_checked="1"><label class="col-lg-4 col-form-label fw-semibold fs-6"><span class="required">Message</span><span class="ms-1" data-bs-toggle="tooltip" aria-label="message is required" data-bs-original-title="message is required" data-kt-initialized="1"><i class="ki-outline ki-information-5 text-gray-500 fs-6"></i></span></label><div class="col-lg-8 fv-row fv-plugins-icon-container" bis_skin_checked="1"><textarea class="form-control form-control-lg form-control-solid" rows="4" placeholder="Type a message" required>${ssrInterpolate(unref(form).message)}</textarea><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" bis_skin_checked="1"></div></div></div></div><div class="card-footer d-flex justify-content-end py-6 px-9" bis_skin_checked="1"><button type="reset" class="btn btn-light btn-active-light-primary me-2"> Discard </button><button type="submit" class="btn btn-primary"><span class="indicator-label"><i class="ki-duotone ki-user-tick fs-3"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i> Send </span><span class="indicator-progress"> Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span></button></div><input type="hidden"></form></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/user/Notify.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Transaction",
  __ssrInlineRender: true,
  props: {
    transaction: {}
  },
  setup(__props) {
    const props = __props;
    useRuntimeConfig().public;
    const trans = ref({ ...props.transaction });
    console.log("Trans", trans.value);
    const edit = ref(false);
    const loading = ref(false);
    const money = (amount) => {
      return currency(amount, { symbol: "" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card transaction" }, _attrs))}><div class="card-body d-flex flex-column align-items-center justify-content-center"><div class="fs-2"> To ${ssrInterpolate(_ctx.transaction.beneficiary.name)} <button class="ms-3 btn btn-light-danger p-2">`);
      if (unref(edit)) {
        _push(`<i class="ki-solid ki-cross fs-2 pe-0"></i>`);
      } else {
        _push(`<i class="ki-solid ki-pencil fs-2 pe-0"></i>`);
      }
      _push(`</button></div><div class="fs-3x fw-bold mb-5"> $${ssrInterpolate(money(_ctx.transaction.amount))}</div><div class="mb-5 fs-2">Status: ${ssrInterpolate(unref(trans).status)}</div><div class="card bg-gray-100 mb-4"><div class="card-body pb-4 fw-bold">`);
      if (unref(edit)) {
        _push(`<div><form><div class="mb-4"><select class="form-control"><option value="processing"> Processing </option><option value="awaiting">Awaiting</option><option value="awaiting">Completed</option></select></div><textarea class="form-control mb-4" cols="30" rows="10">${ssrInterpolate(unref(trans).notes)}</textarea>`);
        if (unref(edit)) {
          _push(`<button class="btn btn-primary w-100">`);
          if (unref(loading)) {
            _push(`<span class="spinner-border spinner-border-sm"></span>`);
          } else {
            _push(`<span>Save</span>`);
          }
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div>`);
      } else {
        _push(`<p>${ssrInterpolate(_ctx.transaction.notes)}</p>`);
      }
      _push(`</div></div>`);
      if (!unref(edit)) {
        _push(`<div class="table-responsive"><table class="table table-borderless"><tbody><tr><td class="fw-bold text-muted">Recipient Name</td><td class="fw-bold text-end">${ssrInterpolate(unref(trans).beneficiary.name)}</td></tr><tr><td class="fw-bold text-muted">Bank</td><td class="fw-bold text-end">${ssrInterpolate(unref(trans).beneficiary.bank)}</td></tr><tr><td class="fw-bold text-muted">Account ID</td><td class="fw-bold text-end">${ssrInterpolate(unref(trans).beneficiary.destinationAccount)}</td></tr><tr><td class="fw-bold text-muted">Transaction ID</td><td class="fw-bold text-end">${ssrInterpolate(unref(trans).transactionId)}</td></tr><tr><td colspan="2" class="text-center">${ssrInterpolate(unref(moment)(unref(trans).createdAt).format("lll"))}</td></tr></tbody></table></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(edit)) {
        _push(`<div class="w-100"><a${ssrRenderAttr("href", `/track/transaction?id=${_ctx.transaction.transactionId}`)} class="btn btn-primary w-100" target="_blank">Track</a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/user/Transaction.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  setup(__props) {
    const props = __props;
    const tiers = useAppSettings().accountLevels;
    const appConfig = /* @__PURE__ */ useRuntimeConfig();
    ref();
    ref({ newLevel: props.user.account.accountLevel });
    const loading = ref(false);
    const transactions = ref([]);
    const searchText = ref("");
    const fetchTransactions = () => {
      var _a;
      const axiosConfig = {
        method: "get",
        url: `${appConfig.public.BE_API}/transactions/${props.user.id}`,
        timeout: 15e3,
        headers: {
          Authorization: "Bearer " + ((_a = useAuth().userData.value) == null ? void 0 : _a.token)
        }
      };
      axios.request(axiosConfig).then((response) => {
        const data = response.data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        transactions.value = data;
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    };
    fetchTransactions();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const _component_AdminUserTransaction = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="card mb-5 mb-xl-10" id="kt_profile_details_view" bis_skin_checked="1"><div class="card-header cursor-pointer align-items-center" bis_skin_checked="1"><div class="card-title m-0" bis_skin_checked="1"><h3 class="fw-bold m-0">Profile Details</h3></div>`);
      if (!((_a = _ctx.user) == null ? void 0 : _a.verified)) {
        _push(`<button class="btn btn-light-primary"><span class="indicator-label"><i class="ki-duotone ki-user-tick fs-3"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i> Verify </span><span class="indicator-progress"> Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span></button>`);
      } else {
        _push(`<div><span class="bullet bullet-dot h-5px w-5px bg-gray-400"></span><span class="bullet bullet-dot h-5px w-5px bg-gray-400 mx-2"></span><span class="bullet bullet-dot h-5px w-5px bg-gray-400"></span></div>`);
      }
      _push(`</div><div class="card-body p-9" bis_skin_checked="1"><div class="row mb-7 g-5" bis_skin_checked="1"><label class="col-lg-4 fw-semibold text-muted">Update Level</label><div class="col-lg-8 d-flex" bis_skin_checked="1"><select class="form-control"><!--[-->`);
      ssrRenderList(unref(tiers), (tier) => {
        _push(`<option${ssrRenderAttr("value", tier.accountLevel)}>${ssrInterpolate(tier.title)}</option>`);
      });
      _push(`<!--]--></select><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="btn btn-primary ms-3">`);
      if (!unref(loading)) {
        _push(`<span>Save</span>`);
      } else {
        _push(`<span class="spinner-border spinner-border-sm"></span>`);
      }
      _push(`</button></div></div><div class="row mb-7" bis_skin_checked="1"><label class="col-lg-4 fw-semibold text-muted">Full Name</label><div class="col-lg-8" bis_skin_checked="1"><span class="fw-bold fs-6 text-gray-800">${ssrInterpolate((_b = _ctx.user) == null ? void 0 : _b.name)}</span></div></div><div class="row mb-7" bis_skin_checked="1"><label class="col-5 col-lg-4 fw-semibold text-muted">Account Level</label><!--[-->`);
      ssrRenderList(unref(tiers), (tier) => {
        _push(`<div bis_skin_checked="1" class="${ssrRenderClass([
          tier.accountLevel !== _ctx.user.account.accountLevel ? "d-none" : "",
          "col-6 col-lg-8"
        ])}"><span class="badge bg-secondary p-2 px-4 fs-6">${ssrInterpolate(tier.title)}</span></div>`);
      });
      _push(`<!--]--></div><div class="row mb-7" bis_skin_checked="1"><label class="col-5 col-lg-4 fw-semibold text-muted"> Email </label><div class="col-7 col-lg-8 d-flex align-items-center flex-wrap" bis_skin_checked="1"><span class="fw-semibold text-gray-800 fs-6 me-2">${ssrInterpolate((_c = _ctx.user) == null ? void 0 : _c.email)}</span>`);
      if ((_d = _ctx.user) == null ? void 0 : _d.emailVerified) {
        _push(`<span class="badge badge-success">Verified</span>`);
      } else {
        _push(`<span class="badge badge-danger">Not verified</span>`);
      }
      _push(`</div></div><div class="row mb-7" bis_skin_checked="1"><label class="col-5 col-lg-4 fw-semibold text-muted"> Contact Phone <span class="ms-1" data-bs-toggle="tooltip" aria-label="Phone number must be active" data-bs-original-title="Phone number must be active" data-kt-initialized="1"><i class="ki-outline ki-information fs-7"></i></span></label><div class="col-7 col-lg-8 fv-row" bis_skin_checked="1"><span class="fw-bold fs-6 text-gray-800 me-2">${ssrInterpolate((_e = _ctx.user) == null ? void 0 : _e.phone)}</span></div></div><div class="row mb-7" bis_skin_checked="1"><label class="col-5 col-lg-4 fw-semibold text-muted">Address</label><div class="col-7 col-lg-8" bis_skin_checked="1"><a role="button" class="fw-semibold fs-6 text-gray-800 text-hover-primary">${ssrInterpolate((_f = _ctx.user) == null ? void 0 : _f.address)}</a></div></div><div class="row mb-7" bis_skin_checked="1"><label class="col-5 col-lg-4 fw-semibold text-muted"> City <span class="ms-1" data-bs-toggle="tooltip" aria-label="Country of origination" data-bs-original-title="Country of origination" data-kt-initialized="1"><i class="ki-outline ki-information fs-7"></i></span></label><div class="col-7 col-lg-8" bis_skin_checked="1"><span class="fw-bold fs-6 text-gray-800">${ssrInterpolate((_g = _ctx.user) == null ? void 0 : _g.city)}</span></div></div><div class="row mb-7" bis_skin_checked="1"><label class="col-5 col-lg-4 fw-semibold text-muted"> Country <span class="ms-1" data-bs-toggle="tooltip" aria-label="Country of origination" data-bs-original-title="Country of origination" data-kt-initialized="1"><i class="ki-outline ki-information fs-7"></i></span></label><div class="col-7 col-lg-8" bis_skin_checked="1"><span class="fw-bold fs-6 text-gray-800">${ssrInterpolate((_h = _ctx.user) == null ? void 0 : _h.country)}</span></div></div><div class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6" bis_skin_checked="1"><i class="ki-outline ki-information fs-2tx text-warning me-4"></i>`);
      if (!((_i = _ctx.user) == null ? void 0 : _i.emailVerified) || !((_j = _ctx.user) == null ? void 0 : _j.verified)) {
        _push(`<div class="d-flex flex-stack flex-grow-1" bis_skin_checked="1"><div class="fw-semibold" bis_skin_checked="1"><h4 class="text-gray-900 fw-bold"> We need your attention! </h4><div class="fs-6 text-gray-700" bis_skin_checked="1">`);
        if (!((_k = _ctx.user) == null ? void 0 : _k.emailVerified)) {
          _push(`<span>Email is not verified. <br></span>`);
        } else {
          _push(`<!---->`);
        }
        if (!((_l = _ctx.user) == null ? void 0 : _l.verified)) {
          _push(`<span>Account not verified.</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="card mb-5"><div class="card-header cursor-pointer align-items-center" bis_skin_checked="1"><div class="d-flex align-items-center justify-content-center"><h3 class="fw-bold m-0">Transactions</h3><div class="position-relative my-1 ms-5"><i class="ki-outline ki-magnifier fs-2 position-absolute top-50 translate-middle-y ms-4"></i><input type="text" class="form-control w-150px fs-7 ps-12" placeholder="Search"${ssrRenderAttr("value", unref(searchText))}></div></div></div></div><div class="row g-8"><!--[-->`);
      ssrRenderList(unref(transactions), (transact) => {
        _push(`<div class="col col-12 col-md-6 col-lg-12">`);
        _push(ssrRenderComponent(_component_AdminUserTransaction, { transaction: transact }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(transactions).length < 1) {
        _push(`<span class="fs-2 text-muted"> No transactions found </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/user/Profile.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "User",
  __ssrInlineRender: true,
  setup(__props) {
    ref("");
    const user = userData().active;
    const notify = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_AdminUserNotify = _sfc_main$4;
      const _component_AdminUserProfile = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="card card-flush mb-9" id="kt_user_profile_panel" bis_skin_checked="1"><div class="card-header rounded-top bgi-size-cover h-200px" style="${ssrRenderStyle({ "background-position": "100% 50%", "background-image": "url('/assets/media/misc/pattern-4.jpg')" })}" bis_skin_checked="1"></div><div class="card-body mt-n19" bis_skin_checked="1"><div class="m-0" bis_skin_checked="1"><div class="d-flex flex-stack align-items-end pb-4 mt-n19" bis_skin_checked="1"><div class="symbol symbol-125px symbol-lg-150px symbol-fixed position-relative mt-n3" bis_skin_checked="1"><img${ssrRenderAttr(
        "src",
        ((_a = unref(user)) == null ? void 0 : _a.imgUrl) || "/assets/media/svg/avatars/blank.svg"
      )} alt="image" class="border border-white border-4" style="${ssrRenderStyle({ "border-radius": "20px" })}"><div class="position-absolute translate-middle bottom-0 start-100 ms-n1 mb-9 bg-success rounded-circle h-15px w-15px" bis_skin_checked="1"></div></div></div><div class="d-flex flex-stack flex-wrap align-items-end" bis_skin_checked="1"><div class="d-flex flex-column" bis_skin_checked="1"><div class="d-flex align-items-center mb-2" bis_skin_checked="1"><a role="button" class="text-gray-800 text-hover-primary fs-2 fw-bolder me-1">${ssrInterpolate((_b = unref(user)) == null ? void 0 : _b.name)}</a><a role="button" class="" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Account is verified" data-bs-original-title="Account is verified" data-kt-initialized="1">`);
      if ((_c = unref(user)) == null ? void 0 : _c.verified) {
        _push(`<i class="ki-outline ki-verify fs-1 text-primary"></i>`);
      } else {
        _push(`<i tooltip="Not verified" class="ki-outline ki-information fs-1 text-danger"></i>`);
      }
      _push(`</a></div><div class="d-flex align-items-center flex-wrap fw-semibold mb-5 mb-lg-0 fs-7 pe-2" bis_skin_checked="1"><a href="#" class="d-flex align-items-center text-gray-400 text-hover-primary">${ssrInterpolate((_d = unref(user)) == null ? void 0 : _d.city)}</a><span class="bullet bullet-dot h-5px w-5px bg-gray-400 mx-3"></span><a href="#" class="d-flex align-items-center text-gray-400 text-hover-primary">${ssrInterpolate((_e = unref(user)) == null ? void 0 : _e.country)}</a><span class="bullet bullet-dot h-5px w-5px bg-gray-400 mx-3"></span></div></div><div class="d-flex" bis_skin_checked="1">`);
      if (!unref(notify)) {
        _push(`<a role="button" class="btn btn-sm btn-light me-3"> Send Notification </a>`);
      } else {
        _push(`<a role="button" class="btn btn-sm btn-light me-3"> Profile </a>`);
      }
      _push(`<button class="btn btn-sm btn-primary"><i class="ki-outline ki-check fs-2 d-none"></i><span class="indicator-label"> Back</span></button></div></div></div></div></div>`);
      if (unref(notify)) {
        _push(ssrRenderComponent(_component_AdminUserNotify, {
          user: unref(user)
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_AdminUserProfile, {
          user: unref(user)
        }, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/User.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    const searchText = ref("");
    const active = userData().active;
    const foundUsers = ref(userData().users.value.length);
    if (userData().users.value.length === 0) {
      userData().getUsers();
    }
    function filterUsers(searchString) {
      if (!searchString) {
        return userData().users.value;
      }
      searchString = searchString.toLowerCase();
      const users = userData().users.value.filter((user) => {
        const a = user.id && user.id.toLowerCase().includes(searchString) || user.name && user.name.toLowerCase().includes(searchString) || user.email && user.email.toLowerCase().includes(searchString) || user.phone && user.phone.toLowerCase().includes(searchString) || user.imgUrl && user.imgUrl.toLowerCase().includes(searchString) || user.address && user.address.toLowerCase().includes(searchString) || user.city && user.city.toLowerCase().includes(searchString) || user.country && user.country.toLowerCase().includes(searchString) || user.dob && user.dob.toLowerCase().includes(searchString) || user.account.currencyId && user.account.currencyId.toLowerCase().includes(searchString) || user.account.amount !== null && user.account.amount.toString().toLowerCase().includes(searchString) || user.account.status && user.account.status.toLowerCase().includes(searchString);
        return a;
      });
      foundUsers.value = users.length;
      return users;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminUsersUser = _sfc_main$5;
      const _component_AdminUser = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-md-100" }, _attrs))}>`);
      if (!unref(active)) {
        _push(`<div class=""><div class="card card-flush card-custom border-0 h-md-100 mb-5 mb-lg-10"><div class="card-body"><div class="d-block d-flex flex-column align-items-center justify-content-center"><h1 class="text-center h2 pb-2 fw-bold"> Users (${ssrInterpolate(unref(foundUsers))}) </h1><div class="position-relative my-1" bis_skin_checked="1"><i class="ki-outline ki-magnifier fs-2 position-absolute top-50 translate-middle-y ms-4"></i><input type="text" data-kt-table-widget-4="search" class="form-control w-150px fs-7 ps-12" placeholder="Search"${ssrRenderAttr("value", unref(searchText))}></div></div></div></div><div class="row g-6 mb-6 g-xl-9 mb-xl-9"><!--[-->`);
        ssrRenderList(filterUsers(unref(searchText)), (user) => {
          _push(`<div class="col-md-6" bis_skin_checked="1">`);
          _push(ssrRenderComponent(_component_AdminUsersUser, { user }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(ssrRenderComponent(_component_AdminUser, null, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=users-25833da2.mjs.map
