import{a as c}from"./CGGBS1J1.js";import{d,o,l as i,y as s,E as a,u as e,G as l,H as n}from"./C1v_YKik.js";import"./92L2RCN-.js";import"./BR2hkClM.js";import"./CgRmDqS1.js";const m={id:"kt_customer_view_details",class:"collapse show"},r={class:"card-body p-9"},_={class:"row mb-7"},b=s("label",{class:"col-sm-4 fw-semibold text-muted"},"Full Name",-1),f={class:"col-sm-8"},h={class:"fw-bold fs-6 text-gray-800"},p={class:"row mb-7"},u=s("label",{class:"col-sm-4 fw-semibold text-muted"},[l(" Contact Phone "),s("span",{class:"ms-1","data-bs-toggle":"tooltip","aria-label":"Phone number must be active","data-bs-original-title":"Phone number must be active","data-kt-initialized":"1"},[s("i",{class:"ki-outline ki-information fs-7"})])],-1),v={class:"col-sm-8 d-flex align-items-center"},g={class:"fw-bold fs-6 text-gray-800 me-2"},w={class:"row mb-7"},x=s("label",{class:"col-sm-4 fw-semibold text-muted"},"Email",-1),y={class:"col-sm-8 d-flex align-items-center"},k={href:"#",class:"fw-semibold fs-6 text-gray-800 text-hover-primary me-3"},C={key:0,class:"badge badge-success"},N={key:1,class:"badge badge-danger"},V={class:"row mb-7"},E=s("label",{class:"col-sm-4 fw-semibold text-muted"},[l(" Country "),s("span",{class:"ms-1","data-bs-toggle":"tooltip","aria-label":"Country of origination","data-bs-original-title":"Country of origination","data-kt-initialized":"1"},[s("i",{class:"ki-outline ki-information fs-7"})])],-1),P={class:"col-sm-8"},B={class:"fw-bold fs-6 text-gray-800"},z=n('<div class="row mb-7"><label class="col-sm-4 fw-semibold text-muted">Communication</label><div class="col-sm-8"><span class="fw-bold fs-6 text-gray-800">Email, Phone</span></div></div><div class="row mb-10"><label class="col-sm-4 fw-semibold text-muted">Allow Changes</label><div class="col-sm-8"><span class="fw-semibold fs-6 text-gray-800">Yes</span></div></div>',2),j=d({__name:"index",setup(D){const t=c().data;return(S,A)=>(o(),i("div",null,[s("div",m,[s("div",r,[s("div",_,[b,s("div",f,[s("span",h,a(e(t).name),1)])]),s("div",p,[u,s("div",v,[s("span",g,a(e(t).phone),1)])]),s("div",w,[x,s("div",y,[s("a",k,a(e(t).email),1),e(t).emailVerified?(o(),i("span",C,"Verified")):(o(),i("span",N,"Not verified"))])]),s("div",V,[E,s("div",P,[s("span",B,a(e(t).country),1)])]),z])])]))}});export{j as default};
