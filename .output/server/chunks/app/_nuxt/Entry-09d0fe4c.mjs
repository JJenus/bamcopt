import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { u as useRuntimeConfig } from '../server.mjs';
import { u as userData, a as useAuth } from './userData-981e93ad.mjs';
import Swal from 'sweetalert2';
import { ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import axios from 'axios';
import moment from 'moment';

const infoAlert = (text) => {
  return Swal.fire({
    text,
    icon: "info",
    buttonsStyling: false,
    confirmButtonText: "Ok, got it!",
    customClass: {
      confirmButton: "btn btn-primary"
    }
  });
};
const _imports_0 = "" + publicAssetsURL("assets/media/avatars/300-2.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Entry",
  __ssrInlineRender: true,
  props: {
    showDetails: {
      type: Boolean,
      required: false,
      default: false
    },
    transaction: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const user = ref({
      name: ""
    });
    const appConfig = /* @__PURE__ */ useRuntimeConfig();
    const getUserData = () => {
      var _a;
      if (!useAuth().userData.value) {
        useAuth().logout();
        infoAlert("Session expired, please login.");
      }
      const axiosConfig = {
        method: "get",
        url: `${appConfig.public.BE_API}/users/${props.transaction.receiverId}`,
        timeout: 15e3,
        headers: {
          Authorization: "Bearer " + ((_a = useAuth().userData.value) == null ? void 0 : _a.token)
        }
      };
      axios.request(axiosConfig).then((response) => {
        user.value = response.data;
      }).catch((error) => {
        const data = error.response.data;
        if (data.message.includes("Access denied") || error.response.status === 401) {
          console.log("Access denied");
          useAuth().logout();
        }
      });
    };
    const show = ref(false);
    const getType = () => {
      if (props.transaction.receiverId === userData().data.value.id) {
        getUserData();
        return "Received";
      }
      user.value.name = props.transaction.beneficiary.name;
      return "Sent";
    };
    const statusColor = (val) => {
      if (props.transaction.status === "pending") {
        return val + "-warning";
      } else if (props.transaction.status === "failed") {
        return val + "-danger";
      }
      return val + "-success";
    };
    const statusIcon = () => {
      if (props.transaction.status === "pending") {
        return "ki-information-5 text-warning";
      } else if (props.transaction.status === "failed") {
        return "ki-cross-circle text-danger";
      } else
        return "ki-check-circle text-success";
    };
    const time = () => {
      const now = moment();
      const inputTime = moment(props.transaction.createdAt);
      if (now.diff(inputTime, "hours") <= 1) {
        return inputTime.fromNow();
      } else if (now.isSame(inputTime, "day")) {
        return inputTime.format("hh:mm A");
      } else {
        return inputTime.format("DD/MM/YYYY hh:mm A");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div></div><div class="d-flex flex-stack mb-6"><div class="symbol symbol-circle symbol-45px me-4"><img${ssrRenderAttr("src", _imports_0)} class="d-none" alt=""><i class="${ssrRenderClass([statusIcon(), "ki-outline fs-1"])}"></i></div><div class="d-flex align-items-center flex-row-fluid flex-wrap"><div class="flex-grow-1 me-2"><a role="button" class="text-hover-primary text-gray-800 fs-5 fw-bolder" style="${ssrRenderStyle({ "color": "#28346c" })}">${ssrInterpolate(unref(user).name)}</a><span class="text-gray-400 fw-semibold d-block fs-n6"><span class="text-primary me-2">${ssrInterpolate(getType())}</span> ${ssrInterpolate(time())}</span></div><div class="d-flex flex-column text-end"><span class="text-gray-800 fw-bold fs-6">$${ssrInterpolate(__props.transaction.amount)}</span><div class="text-gray-400 text-truncate w-80px">${ssrInterpolate(__props.transaction.beneficiary.bank)}</div></div>`);
      if (__props.showDetails) {
        _push(`<div class="ms-2"><i class="${ssrRenderClass([unref(show) ? "ki-up-square" : "ki-down-square", "ki-outline mt-5 mt-lg-1 text-primary fs-2x"])}"></i></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(show)) {
        _push(`<div class="mb-10 px-8 rounded-2 border-dashed pt-4 border-2 border-gray-500 px-md-15 px-lg-20"><div class="table-responsive w-100"><table class="table fs-6"><tbody><tr><td class="fw-semibold">Bank</td><td class="text-end">${ssrInterpolate(unref(user).name)}</td></tr><tr><td class="fw-semibold">Name</td><td class="text-end">${ssrInterpolate(__props.transaction.beneficiary.name)}</td></tr><tr><td class="fw-semibold">Account</td><td class="text-end">${ssrInterpolate(__props.transaction.beneficiary.destinationAccount)}</td></tr><tr><td><span class="${ssrRenderClass([statusColor("bg"), "badge fw-bold pt-1"])}">Status</span></td><td class="${ssrRenderClass([statusColor("text"), "text-end"])}">${ssrInterpolate(__props.transaction.status)}</td></tr><tr><td class="fw-semibold">transactionId</td><td class="text-end">${ssrInterpolate(__props.transaction.transactionId)}</td></tr><tr><td class="fw-semibold">Time</td><td class="text-end">${ssrInterpolate(time())}</td></tr></tbody></table></div><div class="my-3"><a${ssrRenderAttr("href", `/track/transaction?id=${__props.transaction.transactionId}`)} class="btn btn-outline btn-bg-light-info btn-color-info btn-active-light-success w-100">Track process</a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/transaction/Entry.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Entry-09d0fe4c.mjs.map
