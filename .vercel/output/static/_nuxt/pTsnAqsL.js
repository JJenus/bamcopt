const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./NQbq3iyO.js","./D_kPoFKT.js","./92L2RCN-.js","./C1v_YKik.js","./swiper-vue.Bs3d9ZnH.css","./entry.BlWWBMnL.css","./CGGBS1J1.js","./BR2hkClM.js","./CgRmDqS1.js","./GrJGcKcs.js","./D15uM1gO.js","./DlAUqK2U.js","./Notifications.DmRdUFso.css","./Bp_yQtq-.js"])))=>i.map(i=>d[i]);
import{a as b,u as T}from"./CGGBS1J1.js";import{s as L}from"./CH_aCnd1.js";import{h as A}from"./D15uM1gO.js";import{c as E,w as z,J as V,o as a,l as i,y as t,d as $,q as u,u as d,L as f,R as B,F as h,Q as g,A as N,x as C,E as P,G as k,a9 as R,P as j,H as M,a8 as F}from"./C1v_YKik.js";import{_ as q}from"./C5I16zcb.js";import{_ as S}from"./D_kPoFKT.js";import{t as H,a as O,p as D}from"./92L2RCN-.js";import{n as I,c as y,_ as U}from"./GrJGcKcs.js";import{_ as Y}from"./MfKubP2M.js";import{_ as G}from"./BFpSPAMJ.js";import{u as W}from"./DSvAVT1f.js";import{u as J}from"./BiM5rvw0.js";import"./BR2hkClM.js";import"./CgRmDqS1.js";import"./D1pW-EBp.js";import"./DlAUqK2U.js";import"./CQQ8cjCY.js";import"./9OAR_aOO.js";const Q={id:"kt_docs_toast_stack_container",class:"toast-container position-fixed top-0 end-0 p-3 z-index-3 pt-10 pt-lg-5 w-75 w-md-300px me-3",style:{"z-index":"60000"}},K=t("div",{class:"toast",role:"alert","aria-live":"assertive","aria-atomic":"true","data-kt-docs-toast":"stack"},[t("div",{class:"toast-header"},[t("i",{class:"ki-duotone ki-message-notif fs-2 text-info me-3"},[t("span",{class:"path1"}),t("span",{class:"path2"}),t("span",{class:"path3"}),t("span",{class:"path4"}),t("span",{class:"path5"})]),t("strong",{class:"me-auto"},"Bancopt"),t("small",null,"11 mins ago"),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"toast","aria-label":"Close"})]),t("div",{class:"toast-body"},"Hello, world! This is a toast message.")],-1),X=[K],Z={__name:"Toast",setup(_){b().getNotifications();const l=b().newNotifications;let o,r;const n=E({title:"Great",status:"READ",createdAt:new Date,message:"Something splendid"}),m=e=>{const c=A(),p=A(e);return c.diff(p,"hours")<=1?p.fromNow():c.isSame(p,"day")?p.format("hh:mm A"):p.format("DD/MM/YYYY hh:mm A")},s=()=>{const e=o.cloneNode(!0),c=e.querySelector(".toast-header"),p=c.querySelector("strong"),x=c.querySelector("small"),w=e.querySelector(".toast-body");p.textContent=n.value.title,x.textContent=m(n.value.createdAt),w.textContent=n.value.message,r.append(e),bootstrap.Toast.getOrCreateInstance(e).show()};return r=document.getElementById("kt_docs_toast_stack_container"),o=document.querySelector('[data-kt-docs-toast="stack"]'),o.parentNode.removeChild(o),z(l,(e,c)=>{console.log("NEW POINTS....",e),e.forEach(p=>{n.value=p,console.log("NEW POINT",p.message),s()}),l.value=[]}),V(()=>{{const e=L(()=>{T().isAuthenticated()?b().getNotifications():clearInterval(e)},1e4)}}),(e,c)=>(a(),i("div",Q,X))}},tt={id:"kt_app_header",class:"app-header d-flex d-lg-none","data-kt-sticky":"true","data-kt-sticky-name":"app-header-sticky","data-kt-sticky-offset":"{default: 'false', lg: '300px'}"},et={class:"app-container container-fluid d-flex align-items-stretch justify-content-between",id:"kt_app_header_container"},at={class:"d-flex align-items-center me-auto position-relative"},st={class:"d-flex align-items-center ms-2 me-n3",title:"Show header menu"},ot={class:"app-navbar-item d-flex justify-content-end flex-grow-1 me-1 d-lg-none"},nt={key:0,class:"ki-outline ki-notification-on fs-2x"},it={key:1,class:"ki-outline ki-notification-bing fs-2x"},lt={key:2,class:"bg-danger blink position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3",bis_skin_checked:"1"},rt=t("div",{class:"btn btn-icon btn-active-color-primary w-35px h-35px",id:"kt_app_aside_mobile_toggle"},[t("i",{class:"ki-outline ki-text-align-left fs-2 fw-bold"})],-1),dt=$({__name:"Header",setup(_){const l=b().isNewNotification;return V(()=>{}),(o,r)=>{const n=q;return a(),i("div",tt,[t("div",et,[t("div",at,[u(n,{classes:"h-30px"})]),t("div",st,[t("div",ot,[t("div",{onClick:r[0]||(r[0]=m=>("userData"in o?o.userData:d(b))().showNotifications()),class:f([d(l)?"btn-color-primary btn-icon-primary":"btn-color-muted btn-icon-muted","symbol btn btn-icon btn-custom btn-active-light-primary w-35px h-35px w-md-40px h-md-40px"]),id:"kt_activities_toggle"},[d(l)?(a(),i("i",nt)):(a(),i("i",it)),d(l)?(a(),i("div",lt)):B("",!0)],2)]),rt])])])}}}),ct={id:"kt_app_sidebar",class:"app-sidebar d-none d-lg-flex flex-column","data-kt-drawer":"true","data-kt-drawer-name":"app-sidebar","data-kt-drawer-activate":"{default: true, lg: false}","data-kt-drawer-overlay":"true","data-kt-drawer-width":"250px","data-kt-drawer-direction":"start","data-kt-drawer-toggle":"#kt_app_sidebar_mobile_toggle"},pt={class:"app-sidebar-logo d-none mx-auto pt-7 pt-xl-18 mb-xl-9 d-lg-flex align-items-center",id:"kt_app_sidebar_logo"},mt={class:"d-flex align-items-center me-auto position-relative"},ut={class:"app-sidebar-menu overflow-hidden flex-column-fluid"},_t={id:"kt_app_sidebar_menu_wrapper",class:"app-sidebar-wrapper hover-scroll-y my-5 mx-3 mx-xl-11","data-kt-scroll":"true","data-kt-scroll-activate":"true","data-kt-scroll-height":"auto","data-kt-scroll-dependencies":"#kt_app_sidebar_logo, #kt_app_sidebar_footer","data-kt-scroll-wrappers":"#kt_app_sidebar_menu","data-kt-scroll-offset":"5px"},bt={class:"menu menu-column menu-rounded menu-sub-indention menu-active-bg menu- px-3",id:"#kt_app_sidebar_menu","data-kt-menu":"true","data-kt-menu-expand":"false"},ft={class:"menu-link"},vt={class:"menu-icon"},kt={class:"menu-title"},ht={class:"app-sidebar-footer flex-column-auto m-9",id:"kt_app_sidebar_footer"},gt={class:"card card-custom-2 bg-light-success border-0"},xt={class:"card-body text-center"},wt=t("h4",{class:"text-gray-800 text-center fw-bold mb-9"},[k(" Create a ticket "),t("br"),k(" enjoy awesome support ")],-1),yt={__name:"SideBar",setup(_){const l=()=>{};return(o,r)=>{const n=q,m=S;return a(),i("div",ct,[t("div",pt,[t("div",mt,[u(n,{classes:"h-30px"})])]),t("div",ut,[t("div",_t,[t("div",bt,[(a(!0),i(h,null,g("navs"in o?o.navs:d(I),s=>(a(),N(m,{to:s.dir,class:f([s.name=="Scan"?"d-none":"","menu-item"]),"data-kt-menu-trigger":"click"},{default:C(()=>[t("span",ft,[t("span",vt,[t("i",{class:f([s.icon,"fs-2x"])},[(a(!0),i(h,null,g(s.paths,e=>(a(),i("i",{class:f(e)},null,2))),256))],2)]),t("span",kt,P(s.name),1)])]),_:2},1032,["to","class"]))),256))])])]),t("div",ht,[t("div",gt,[t("div",xt,[wt,t("a",{role:"button",class:"btn btn-sm btn-primary btn",onClick:r[0]||(r[0]=s=>l())}," Chat ")])])])])}}},$t=R(()=>H(()=>import("./NQbq3iyO.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]),import.meta.url).then(_=>_.default||_)),Nt={id:"kt_app_aside",class:"app-aside mobile-aside flex-column z-inde-1",style:{},"data-kt-drawer":"true","data-kt-drawer-name":"app-aside","data-kt-drawer-activate":"{default: true, lg: false}","data-kt-drawer-overlay":"true","data-kt-drawer-width":"300px","data-kt-drawer-direction":"end","data-kt-drawer-toggle":"#kt_app_aside_mobile_toggle"},Ct={class:"app-navbar flex-shrink-0 p-5 p-lg-18",id:"kt_app_aside_navbar"},St={class:"app-navbar-item ms-n3"},Dt=t("i",{class:"ki-solid ki-messages fs-2x"},null,-1),At=t("div",{class:"flex-grow-1 ms-1 ms-lg-3 d-lg-none"},null,-1),Tt={key:0,class:"ki-outline ki-notification-on fs-2x"},Et={key:1,class:"ki-outline ki-notification-bing fs-2x"},Vt={key:2,class:"bg-danger blink position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3",bis_skin_checked:"1"},Bt=t("i",{class:"ki-outline ki-notepad-edit fs-2x"},null,-1),qt={class:"app-navbar-item ms-1 ms-lg-3",id:"kt_header_user_menu_toggle"},It={id:"kt_app_aside_content_wrapper",class:"app-aside_content-wrapper hover-scroll-overlay-y ps-5 ps-lg-18 pe-3 pe-lg-16 me-2","data-kt-scroll":"true","data-kt-scroll-activate":"true","data-kt-scroll-height":"auto","data-kt-scroll-dependencies":"#kt_app_aside_navbar","data-kt-scroll-wrappers":"#kt_app_aside_content","data-kt-scroll-offset":"5px"},Lt={class:"card card-custom-2 bg-light-danger border-0 mb-lg-10 d-none d-lg-block"},zt={class:"card-body"},Pt={class:"card card-flush card-reset bg-transparent card-p-0 d-lg-none"},Rt=t("div",{class:"card-header pt-5"},[t("h3",{class:"card-title align-items-start flex-column"},[t("span",{class:"card-label text-gray-800 fw-bold mb-2"},"Recent Transactions")]),t("div",{class:"card-toolbar"},[t("button",{class:"btn btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end","data-kt-menu-trigger":"click","data-kt-menu-placement":"bottom-end","data-kt-menu-overflow":"true"},[t("i",{class:"ki-outline ki-dots-square fs-1 text-gray-400 me-n1"})]),t("div",{class:"menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px","data-kt-menu":"true"},[t("div",{class:"menu-item px-3"},[t("div",{class:"menu-content fs-6 text-dark fw-bold px-3 py-4"},[t("i",{class:"ki-solid ki-setting-4 fs-5 me-2"}),k(" Filter ")])]),t("div",{class:"separator mb-3 opacity-75"}),t("div",{class:"menu-item px-3"},[t("a",{role:"button",class:"menu-link px-3"}," Sent ")]),t("div",{class:"menu-item px-3"},[t("a",{role:"button",class:"menu-link px-3"}," Received ")]),t("div",{class:"separator mt-3 opacity-75"}),t("div",{class:"menu-item px-3"},[t("div",{class:"menu-content px-3 py-3"},[t("a",{class:"btn btn-primary btn-sm px-4 w-100",href:"#"}," View All ")])])])])],-1),jt={class:"card-body pt-6"},Mt={__name:"AsideBar",setup(_){var m;const l=b().isNewNotification,o=W().transactions;(m=T().userData.value)==null||m.userId;const r=()=>{},n=()=>{if(o.value.length<=5)return o.value;const s=[];for(let e=0;e<5;e++)s.push(o.value[e]);return s};return(s,e)=>{const c=S,p=$t,x=Y,w=G;return a(),i("div",Nt,[t("div",Ct,[t("div",St,[t("button",{onClick:e[0]||(e[0]=v=>r()),class:"btn dv-lg-none btn-outline ms-2 btn-custom btn-icon-muted btn-active-light btn-active-color-primary","data-kt-menu-trigger":"{default: 'click', lg: 'hover'}","data-kt-menu-attach":"parent","data-kt-menu-placement":"bottom-end"},[Dt,k(" Support ")])]),At,t("div",{onClick:e[1]||(e[1]=v=>("userData"in s?s.userData:d(b))().showNotifications()),class:f([d(l)?"btn-color-primary btn-icon-primary":"btn-color-muted btn-icon-muted","symbol btn btn-icon btn-custom ms-lg-auto btn-active-light-primary w-35px h-35px w-md-40px h-md-40px"]),id:"kt_activities_toggle"},[d(l)?(a(),i("i",Tt)):(a(),i("i",Et)),d(l)?(a(),i("div",Vt)):B("",!0)],2),t("div",{class:"app-navbar-item ms-1 ms-lg-3 mb-4",onClick:e[2]||(e[2]=(...v)=>("closeDrawer"in s?s.closeDrawer:d(y))&&("closeDrawer"in s?s.closeDrawer:d(y))(...v))},[u(c,{to:"/app/profile/edit",class:"btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px","data-kt-menu-trigger":"{default: 'click', lg: 'hover'}","data-kt-menu-attach":"parent","data-kt-menu-placement":"bottom-end"},{default:C(()=>[Bt]),_:1})]),t("div",qt,[u(p)])]),t("div",It,[t("div",Lt,[t("div",zt,[u(x)])]),t("div",Pt,[Rt,t("div",jt,[(a(!0),i(h,null,g(n(),v=>(a(),N(w,{transaction:v,"show-details":!1},null,8,["transaction"]))),256))])])])])}}},Ft={style:{"z-index":"1049"},class:"position-fixed bg-light bottom-0 start-0 w-100 d-lg-none"},Ht=$({__name:"MobileNavBar",setup(_){const o=O().path;console.log(o);const r=E(o);return(n,m)=>{const s=S;return a(),i("div",Ft,[t("div",{onClick:m[0]||(m[0]=e=>("closeDrawer"in n?n.closeDrawer:d(y))()),"data-kt-drawer-dismiss":"true",class:"w-100 d-flex align-items-center justify-content-between p-3"},[(a(!0),i(h,null,g("navs"in n?n.navs:d(I),e=>(a(),N(s,{onClick:c=>r.value=e.dir,to:e.dir,class:f([e.name=="Scan"?"d-none":d(r)==e.dir?"active":"","btn btn-icon w-35px btn-active-primary btn-outline-dashed hover-scale btn-icon-primary btn-text-primary h-40px w-40px h-md-40px"])},{default:C(()=>[t("i",{class:f([e.icon,"fs-2x"])},[(a(!0),i(h,null,g(e.paths,c=>(a(),i("i",{class:f(c)},null,2))),256))],2)]),_:2},1032,["onClick","to","class"]))),256))])])}}}),Ot=D("/assets/media/svg/card-logos/visa.svg"),Ut=D("/assets/media/svg/card-logos/mastercard.svg"),Yt=D("/assets/media/svg/card-logos/american-express.svg"),Gt={class:"modal fade",id:"kt_modal_upgrade_plan",tabindex:"-1","aria-hidden":"true"},Wt={class:"modal-dialog modal-xl"},Jt={class:"modal-content rounded"},Qt=t("div",{class:"modal-header justify-content-end border-0 pb-0"},[t("div",{class:"btn btn-sm btn-icon btn-active-color-primary","data-bs-dismiss":"modal"},[t("i",{class:"ki-outline ki-cross fs-1"})])],-1),Kt={class:"modal-body pt-0 pb-15 px-5 px-xl-20"},Xt=t("div",{class:"mb-13 text-center"},[t("h1",{class:"mb-3"},"Deposit"),t("div",{class:"text-muted fw-semibold fs-5"},[k(" If you need any assistance, please contact "),t("a",{role:"button",class:"link-primary fw-bold"},"support"),k(". ")])],-1),Zt={class:"d-flex flex-column mb-7 fv-row fv-plugins-icon-container"},te=t("label",{class:"d-flex align-items-center fs-6 fw-semibold form-label mb-2"},[t("span",{class:"required"},"Name On Card"),t("span",{class:"ms-1","data-bs-toggle":"tooltip","aria-label":"Specify a card holder's name","data-bs-original-title":"Specify a card holder's name","data-kt-initialized":"1"},[t("i",{class:"ki-outline ki-information-5 text-gray-500 fs-6"})])],-1),ee=["value"],ae=t("div",{class:"fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"},null,-1),se=M('<div class="d-flex flex-column mb-7 fv-row fv-plugins-icon-container"><label class="required fs-6 fw-semibold form-label mb-2">Card Number</label><div class="position-relative"><input type="text" class="form-control form-control-solid" placeholder="Enter card number" name="card_number" value=""><div class="position-absolute translate-middle-y top-50 end-0 me-5"><img src="'+Ot+'" alt="" class="h-25px"><img src="'+Ut+'" alt="" class="h-25px"><img src="'+Yt+'" alt="" class="h-25px"></div></div><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div><div class="row mb-10" data-select2-id="select2-data-345-k61a"><div class="col-md-8 fv-row" data-select2-id="select2-data-344-xvb5"><label class="required fs-6 fw-semibold form-label mb-2">Expiration Date</label><div class="row fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid"><div class="col-6"><input type="text" class="form-control form-control-solid" placeholder="" name="card_expiry_month"><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div><div class="col-6" data-select2-id="select2-data-343-x9q5"><input type="text" class="form-control form-control-solid" placeholder="" name="card_expiry_year"><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div></div></div><div class="col-md-4 fv-row fv-plugins-icon-container"><label class="d-flex align-items-center fs-6 fw-semibold form-label mb-2"><span class="required">CVV</span><span class="ms-1" data-bs-toggle="tooltip" aria-label="Enter a card CVV code" data-bs-original-title="Enter a card CVV code" data-kt-initialized="1"><i class="ki-outline ki-information-5 text-gray-500 fs-6"></i></span></label><div class="position-relative"><input type="text" class="form-control form-control-solid" minlength="3" maxlength="4" placeholder="CVV" name="card_cvv"><div class="position-absolute translate-middle-y top-50 end-0 me-3"><i class="ki-outline ki-credit-cart fs-2hx"></i></div></div><div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div></div><div class="d-flex flex-stack"><div class="me-5"><label class="fs-6 fw-semibold form-label">Save Card for further billing?</label><div class="fs-7 fw-semibold text-muted"> If you need more info, please check budget planning </div></div><label class="form-check form-switch form-check-custom form-check-solid"><input class="form-check-input" type="checkbox" value="1" checked><span class="form-check-label fw-semibold text-muted"> Save Card </span></label></div><div class="text-center pt-15"><button type="reset" id="kt_modal_new_card_cancel" class="btn btn-light me-3"> Discard </button><button type="submit" id="kt_modal_new_card_submit" class="btn btn-primary"><span class="indicator-label"> Submit </span><span class="indicator-progress"> Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span></button></div>',4),oe=$({__name:"TopUp",setup(_){const l=b().data,o=()=>{};return(r,n)=>(a(),i("div",Gt,[t("div",Wt,[t("div",Jt,[Qt,t("div",Kt,[Xt,t("form",{onSubmit:n[0]||(n[0]=j(m=>o(),["prevent"])),id:"kt_modal_new_card_form",class:"form fv-plugins-bootstrap5 fv-plugins-framework",action:"#","data-select2-id":"select2-data-kt_modal_new_card_form"},[t("div",Zt,[te,t("input",{type:"text",class:"form-control form-control-solid",placeholder:"",name:"card_name",value:d(l).name},null,8,ee),ae]),se],32)])])])]))}}),ne={id:"kt_app_body","data-kt-app-header-fixed-mobile":"true","data-kt-app-sidebar-enabled":"true","data-kt-app-sidebar-fixed":"true","data-kt-app-sidebar-push-header":"true","data-kt-app-sidebar-push-toolbar":"true","data-kt-app-sidebar-push-footer":"true","data-kt-app-aside-enabled":"true","data-kt-app-aside-fixed":"true","data-kt-app-aside-push-header":"true","data-kt-app-aside-push-toolbar":"true","data-kt-app-aside-push-footer":"true","data-bs-theme-mode":"dark",class:"app-default position-relative"},ie={class:"d-flex flex-column flex-root app-root position-relative",id:"kt_app_root"},le={class:"app-page flex-column flex-column-fluid",id:"kt_app_page"},re={class:"app-wrapper flex-column flex-row-fluid",id:"kt_app_wrapper"},de={class:"app-main flex-column flex-row-fluid",id:"kt_app_main"},ce={class:"d-flex flex-column flex-column-fluid"},pe={id:"kt_app_content",class:"app-content flex-column-fluid"},me={id:"kt_app_content_container",class:"app-container container-fluid pb-20 pb-lg-10"},ue=t("div",{style:{"margin-bottom":"40px"},id:"kt_scrolltop",class:"scrolltop","data-kt-scrolltop":"true"},[t("i",{class:"ki-outline ki-arrow-up"})],-1),Ve={__name:"app",setup(_){return J({script:[{src:"//code.jivosite.com/widget/PDfF9tRuON",async:!0}]}),(l,o)=>{const r=Z,n=dt,m=yt,s=Mt,e=Ht,c=U,p=oe;return a(),i("div",ne,[u(r,{class:"mt-15 mt-lg-5"}),t("div",ie,[t("div",le,[u(n),t("div",re,[u(m),t("div",de,[t("div",ce,[t("div",pe,[t("div",me,[F(l.$slots,"default")])])])]),u(s)])]),u(e)]),u(c),ue,u(p)])}}};export{Ve as default};
