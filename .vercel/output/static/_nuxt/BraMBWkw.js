import{a as d}from"./CGGBS1J1.js";import{d as n,o,l as i,y as s,E as a,u as e,G as c,H as m}from"./C1v_YKik.js";import"./92L2RCN-.js";import"./BR2hkClM.js";import"./CgRmDqS1.js";const r={id:"kt_customer_view_details",class:"collapse show"},_={class:"card-body p-9"},b={class:"row mb-7"},f=s("label",{class:"col-sm-4 fw-semibold text-muted"},"Full Name",-1),h={class:"col-sm-8"},p={class:"fw-bold fs-6 text-gray-800"},u={class:"row mb-7"},v=s("label",{class:"col-sm-4 fw-semibold text-muted"},[c(" Contact Phone "),s("span",{class:"ms-1","data-bs-toggle":"tooltip","aria-label":"Phone number must be active","data-bs-original-title":"Phone number must be active","data-kt-initialized":"1"},[s("i",{class:"ki-outline ki-information fs-7"})])],-1),g={class:"col-sm-8 d-flex align-items-center"},w={class:"fw-bold fs-6 text-gray-800 me-2"},x={class:"row mb-7"},y=s("label",{class:"col-sm-4 fw-semibold text-muted"},"Email",-1),k={class:"col-sm-8 d-flex align-items-center"},C={href:"#",class:"fw-semibold fs-6 text-gray-800 text-hover-primary me-3"},N={key:0,class:"badge badge-success"},V={key:1,class:"badge badge-danger"},E={class:"row mb-7"},P=s("label",{class:"col-sm-4 fw-semibold text-muted"},[c(" Country "),s("span",{class:"ms-1","data-bs-toggle":"tooltip","aria-label":"Country of origination","data-bs-original-title":"Country of origination","data-kt-initialized":"1"},[s("i",{class:"ki-outline ki-information fs-7"})])],-1),B={class:"col-sm-8"},z={class:"fw-bold fs-6 text-gray-800"},D=m('<div class="row mb-7"><label class="col-sm-4 fw-semibold text-muted">Communication</label><div class="col-sm-8"><span class="fw-bold fs-6 text-gray-800">Email, Phone</span></div></div><div class="row mb-10"><label class="col-sm-4 fw-semibold text-muted">Allow Changes</label><div class="col-sm-8"><span class="fw-semibold fs-6 text-gray-800">Yes</span></div></div>',2),q=n({__name:"index",setup(S){const t=d().data;return(A,F)=>{var l;return o(),i("div",null,[s("div",r,[s("div",_,[s("div",b,[f,s("div",h,[s("span",p,a((l=e(t))==null?void 0:l.name),1)])]),s("div",u,[v,s("div",g,[s("span",w,a(e(t).phone),1)])]),s("div",x,[y,s("div",k,[s("a",C,a(e(t).email),1),e(t).emailVerified?(o(),i("span",N,"Verified")):(o(),i("span",V,"Not verified"))])]),s("div",E,[P,s("div",B,[s("span",z,a(e(t).country),1)])]),D])])])}}});export{q as default};
