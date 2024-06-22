import { ref, useSSRContext, defineComponent, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import moment from 'moment';
import { N as NotificationStatus, u as userData } from './userData-981e93ad.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const navs = ref([
  {
    name: "Home",
    dir: "/app",
    icon: "ki-solid ki-home-3",
    paths: []
  },
  {
    name: "Account Info",
    dir: "/app/account-info",
    icon: "ki-duotone ki-grid-frame",
    paths: ["path1", "path2", "path3"]
  },
  {
    name: "Transfer",
    dir: "/app/transfer",
    icon: "ki-solid ki-send",
    paths: []
  },
  {
    name: "Transactions",
    dir: "/app/transactions",
    icon: "ki-solid ki-arrows-loop",
    paths: []
  },
  {
    name: "Settings",
    dir: "/app/settings",
    icon: "ki-solid ki-gear",
    //app/ki-outline
    paths: []
  }
]);
const adminNavs = ref([
  {
    name: "Dashboard",
    dir: "/admin",
    icon: "ki-duotone ki-element-equal",
    paths: ["path1", "path2", "path3", "path4"]
  },
  {
    name: "Users",
    dir: "/admin/users",
    icon: "ki-duotone ki-profile-user",
    paths: ["path1", "path2", "path3", "path4"]
  },
  // {
  // 	name: "Transfer",
  // 	dir: "/admin/transfer",
  // 	icon: "ki-solid ki-send",
  // 	paths: [],
  // },
  {
    name: "Settings",
    dir: "/admin/settings",
    icon: "ki-outline ki-gear",
    //app/ki-outline
    paths: []
  }
]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Entry",
  __ssrInlineRender: true,
  props: {
    notification: {}
  },
  setup(__props) {
    const props = __props;
    const nDate = () => {
      return moment(props.notification.createdAt).format(
        "DD/MM/YYYY hh:mm A"
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card-custom-2 bg-light mb-8 mb-lg-8 p-0 border-0" }, _attrs))}><div class="${ssrRenderClass([
        _ctx.notification.status === unref(NotificationStatus).UNREAD ? "bg-light-primary" : "",
        "card-body p-5 mb-0 rounded"
      ])}"><div class="card-title"><span class="widget-title fw-bold fs-4 d-flex align-items-center"><i class="${ssrRenderClass([
        _ctx.notification.status === unref(NotificationStatus).UNREAD ? "text-success" : "text-muted",
        "ki-outline ki-notification-status fs-1 me-2"
      ])}"></i> ${ssrInterpolate(_ctx.notification.title)} </span></div><div class="px-2 my-2">${ssrInterpolate(_ctx.notification.message)}</div><div class="d-flex m-0 align-items-center justify-content-between px-2"><span class="text-muted">${ssrInterpolate(nDate())}</span><a role="button" class="btn btn-bg-body text-primary d-none">view</a></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/notification/Entry.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Notifications",
  __ssrInlineRender: true,
  setup(__props) {
    const notifications = userData().notifications;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppNotificationEntry = _sfc_main$1;
      _push(`<!--[--><div id="kt_docs_toast_stack_container" class="toast-container position-fixed top-0 end-0 p-3 z-index-3" data-v-7263f4ab><div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-kt-docs-toast="stack" data-v-7263f4ab><div class="toast-header" data-v-7263f4ab><i class="ki-duotone ki-abstract-23 fs-2 text-success me-3" data-v-7263f4ab><span class="path1" data-v-7263f4ab></span><span class="path2" data-v-7263f4ab></span></i><strong class="me-auto" data-v-7263f4ab>Keenthemes</strong><small data-v-7263f4ab>11 mins ago</small><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" data-v-7263f4ab></button></div><div class="toast-body" data-v-7263f4ab>Hello, world! This is a toast message.</div></div></div><div id="kt_activities" class="bg-body mobile-aside" data-kt-drawer="true" data-kt-drawer-name="activities" data-kt-drawer-activate="true" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:&#39;300px&#39;, &#39;lg&#39;: &#39;500px&#39;}" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_activities_toggle" data-kt-drawer-close="#kt_activities_close" data-v-7263f4ab><div class="card shadow-none border-0 rounded-0 w-100 mobile-bottom" data-v-7263f4ab><div class="card-header" id="kt_activities_header" data-v-7263f4ab><h3 class="card-title fw-bold text-dark" data-v-7263f4ab>Notifications</h3><div class="card-toolbar" data-v-7263f4ab><button type="button" class="btn btn-sm btn-icon btn-active-light-primary me-n5" id="kt_activities_close" data-v-7263f4ab><i class="ki-outline ki-cross fs-1" data-v-7263f4ab></i></button></div></div><div class="card-body position-relative" id="kt_activities_body" data-v-7263f4ab><div id="kt_activities_scroll" class="position-relative scroll-y me-n1 pe-1 ps-0" data-kt-scroll="true" data-kt-scroll-height="auto" data-kt-scroll-wrappers="#kt_activities_body" data-kt-scroll-dependencies="#kt_activities_header, #kt_activities_footer" data-kt-scroll-offset="5px" data-v-7263f4ab>`);
      if (unref(notifications).length === 0) {
        _push(`<div class="text-center text-muted fw-bold" data-v-7263f4ab> No notification </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(notifications), (notify) => {
        _push(ssrRenderComponent(_component_AppNotificationEntry, { notification: notify }, null, _parent));
      });
      _push(`<!--]--></div></div><div class="card-footer py-0 py-lg-5 text-center mt-n8 mt-lg-0" id="kt_activities_footer" data-v-7263f4ab><a role="button" class="btn btn-bg-body text-primary" data-v-7263f4ab><i class="ki-outline ki-arrows-circle fs-5 text-primary" data-v-7263f4ab></i> more... </a></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/Notifications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7263f4ab"]]);

export { __nuxt_component_5 as _, adminNavs as a, navs as n };
//# sourceMappingURL=Notifications-f37cb4c7.mjs.map
