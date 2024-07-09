import{u as p}from"./BR2hkClM.js";import{d as u,c as _,o as r,l as d,y as e,P as h,N as c,_ as l,u as a,H as v,q as f,F as x}from"./C1v_YKik.js";import{s as b}from"./BsrlggJy.js";import{_ as g}from"./DlAUqK2U.js";import"./92L2RCN-.js";import"./Cpj98o6Y.js";const y={class:"card mb-5 mb-xl-10 d-none"},w=e("div",{class:"card-header border-0 cursor-pointer",role:"button","data-bs-toggle":"collapse","data-bs-target":"#kt_account_email_preferences","aria-expanded":"true","aria-controls":"kt_account_email_preferences"},[e("div",{class:"card-title m-0"},[e("h3",{class:"fw-bold m-0"},"Email Preferences")])],-1),$={id:"kt_account_settings_email_preferences",class:"collapse show"},S={class:"card-body border-top px-9 py-9"},V=v('<label class="form-check form-check-custom form-check-solid align-items-start"><input class="form-check-input me-3" type="checkbox" name="email-preferences[]" value="1"><span class="form-check-label d-flex flex-column align-items-start"><span class="fw-bold fs-5 mb-0">Successful Payments</span><span class="text-muted fs-6">Receive a notification for every successful payment.</span></span></label><div class="separator separator-dashed my-6"></div>',2),C={class:"form-check form-check-custom form-check-solid align-items-start"},N=e("span",{class:"form-check-label d-flex flex-column align-items-start"},[e("span",{class:"fw-bold fs-5 mb-0"},"Payouts"),e("span",{class:"text-muted fs-6"},"Receive a notification for every initiated payout.")],-1),U=e("div",{class:"separator separator-dashed my-6"},null,-1),A={class:"form-check form-check-custom form-check-solid align-items-start"},R=e("span",{class:"form-check-label d-flex flex-column align-items-start"},[e("span",{class:"fw-bold fs-5 mb-0"},"Fee Collection"),e("span",{class:"text-muted fs-6"},"Receive a notification each time you collect a fee from sales")],-1),D=e("div",{class:"separator separator-dashed my-6"},null,-1),P={class:"form-check form-check-custom form-check-solid align-items-start"},E=e("span",{class:"form-check-label d-flex flex-column align-items-start"},[e("span",{class:"fw-bold fs-5 mb-0"},"Customer Payment Dispute"),e("span",{class:"text-muted fs-6"},"Receive a notification if a payment is disputed by a customer and for dispute purposes.")],-1),F=e("div",{class:"separator separator-dashed my-6"},null,-1),B={class:"form-check form-check-custom form-check-solid align-items-start"},j=e("span",{class:"form-check-label d-flex flex-column align-items-start"},[e("span",{class:"fw-bold fs-5 mb-0"},"Refund Alerts"),e("span",{class:"text-muted fs-6"},"Receive a notification if a payment is stated as risk by the Finance Department.")],-1),M={class:"card-footer d-flex justify-content-end py-6 px-9"},q=e("button",{class:"btn btn-light btn-active-light-primary me-2"}," Discard ",-1),H=u({__name:"email",setup(m){const n=p("e-set",{maxAge:157788e5}),t=_({id:"",name:"",email:"",bill:"",news:"",dispute:"undefined"}),i=()=>{b("Saved"),n.value=t.value};return(k,s)=>(r(),d("div",y,[w,e("div",$,[e("form",{class:"form",onSubmit:s[5]||(s[5]=h(o=>i(),["prevent"]))},[e("div",S,[V,e("label",C,[c(e("input",{"onUpdate:modelValue":s[0]||(s[0]=o=>a(t).email=o),class:"form-check-input me-3",type:"checkbox",name:"email-preferences[]",checked:"",value:"1"},null,512),[[l,a(t).email]]),N]),U,e("label",A,[c(e("input",{"onUpdate:modelValue":s[1]||(s[1]=o=>a(t).news=o),class:"form-check-input me-3",type:"checkbox",name:"email-preferences[]",value:"1"},null,512),[[l,a(t).news]]),R]),D,e("label",P,[c(e("input",{"onUpdate:modelValue":s[2]||(s[2]=o=>a(t).bill=o),class:"form-check-input me-3",type:"checkbox",name:"email-preferences[]",checked:"",value:"1"},null,512),[[l,a(t).bill]]),E]),F,e("label",B,[c(e("input",{"onUpdate:modelValue":s[3]||(s[3]=o=>a(t).dispute=o),class:"form-check-input me-3",type:"checkbox",name:"email-preferences[]",value:"1"},null,512),[[l,a(t).dispute]]),j])]),e("div",M,[q,e("button",{onClick:s[4]||(s[4]=o=>i()),class:"btn btn-primary px-6"}," Save Changes ")])],32)])]))}}),z={class:"card mb-5 mb-xl-10"},G=e("div",{class:"card-header border-0 cursor-pointer",role:"button","data-bs-toggle":"collapse","data-bs-target":"#kt_account_notifications","aria-expanded":"true","aria-controls":"kt_account_notifications"},[e("div",{class:"card-title m-0"},[e("h3",{class:"fw-bold m-0"},"Notifications")])],-1),I={id:"kt_account_settings_notifications",class:"collapse show"},J={class:"card-body border-top px-9 pt-3 pb-4"},K={class:"table-responsive"},L={class:"table table-row-dashed border-gray-300 align-middle gy-6"},O={class:"fs-6 fw-semibold"},Q=e("td",{class:"min-w-200px fs-4 fw-bold"}," Notifications ",-1),T={class:"w-125px"},W={class:"form-check form-check-custom form-check-solid"},X=e("td",null,"Email Updates",-1),Y={class:"form-check form-check-custom form-check-solid"},Z=e("label",{class:"form-check-label ps-2",for:"billing1"},null,-1),ee=e("td",{class:"border-bottom-0"},"Newsletters",-1),se={class:"border-bottom-0"},te={class:"form-check form-check-custom form-check-solid"},oe=e("label",{class:"form-check-label ps-2",for:"newsletter1"},null,-1),ae=e("div",{class:"card-footer d-flex justify-content-end py-6 px-9"},[e("button",{class:"btn btn-light btn-active-light-primary me-2"}," Discard "),e("button",{class:"btn btn-primary px-6"},"Save Changes")],-1),ce=u({__name:"notification",setup(m){const n=p("n-sett",{maxAge:157788e5}),t=_({id:"",name:"",email:"",bill:"",news:"",dispute:""});n.value&&(t.value=n.value);const i=()=>{b("Saved"),n.value=t.value};return(k,s)=>(r(),d("div",z,[G,e("div",I,[e("form",{class:"form",onSubmit:s[3]||(s[3]=h(o=>i(),["prevent"]))},[e("div",J,[e("div",K,[e("table",L,[e("tbody",O,[e("tr",null,[Q,e("td",T,[e("div",W,[c(e("input",{"onUpdate:modelValue":s[0]||(s[0]=o=>a(t).bill=o),class:"form-check-input",type:"checkbox",value:"",id:"kt_settings_notification_email",checked:"","data-kt-check":"true","data-kt-check-target":"[data-kt-settings-notification=email]"},null,512),[[l,a(t).bill]])])])]),e("tr",null,[X,e("td",null,[e("div",Y,[c(e("input",{"onUpdate:modelValue":s[1]||(s[1]=o=>a(t).email=o),class:"form-check-input",type:"checkbox",id:"billing1","data-kt-settings-notification":"email"},null,512),[[l,a(t).email]]),Z])])]),e("tr",null,[ee,e("td",se,[e("div",te,[c(e("input",{"onUpdate:modelValue":s[2]||(s[2]=o=>a(t).news=o),class:"form-check-input",type:"checkbox",id:"newsletter1","data-kt-settings-notification":"email"},null,512),[[l,a(t).news]]),oe])])])])])])]),ae],32)])]))}}),le={};function ne(m,n){const t=H,i=ce;return r(),d(x,null,[f(t),f(i)],64)}const ue=g(le,[["render",ne]]);export{ue as default};