import{_ as v}from"./D_kPoFKT.js";import{a as g,u as y}from"./CGGBS1J1.js";import{c as p}from"./GrJGcKcs.js";import{_ as x,a as b,b as h,c as w,d as D}from"./Bp_yQtq-.js";import{d as N,a2 as C,o,l as i,y as s,u as a,E as L,q as m,x as c,G as e,H as S}from"./C1v_YKik.js";import"./92L2RCN-.js";import"./BR2hkClM.js";import"./CgRmDqS1.js";import"./D15uM1gO.js";import"./DlAUqK2U.js";const V={class:"cursor-pointer symbol symbol-circle ms-2 symbol-35px symbol-lg-50px","data-kt-menu-trigger":"{default: 'click', lg: 'hover'}","data-kt-menu-attach":"parent","data-kt-menu-placement":"bottom-end"},E=["src"],A={class:"menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px","data-kt-menu":"true"},B={class:"menu-item px-3"},M={class:"menu-content d-flex align-items-center px-3"},$={class:"symbol symbol-50px me-5"},G=["src"],U={class:"d-flex flex-column"},q={class:"fw-bold d-flex align-items-center fs-5"},F={key:0},H={key:1,class:"spinner-border spinner-border-sm"},I=s("i",{class:"fa-solid fa-circle text-success ms-2 fs-67"},null,-1),J=s("div",{class:"separator my-2"},null,-1),O=s("div",{class:"d-flex flex-column align-items-start"},[s("span",null,"Account Info"),s("small",{class:"text-muted fs-8"},"View your transaction limits")],-1),P=S('<div class="separator my-2"></div><div class="menu-item px-5" data-kt-menu-trigger="{default: &#39;click&#39;, lg: &#39;hover&#39;}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0"><a href="#" class="menu-link px-5"><span class="menu-title position-relative"> Mode <span class="ms-5 position-absolute translate-middle-y top-50 end-0"><i class="ki-outline ki-night-day theme-light-show fs-2"></i><i class="ki-outline ki-moon theme-dark-show fs-2"></i></span></span></a><div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px" data-kt-menu="true" data-kt-element="theme-mode-menu"><div class="menu-item px-3 my-0"><a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="light"><span class="menu-icon" data-kt-element="icon"><i class="ki-outline ki-night-day fs-2"></i></span><span class="menu-title"> Light </span></a></div><div class="menu-item px-3 my-0"><a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="dark"><span class="menu-icon" data-kt-element="icon"><i class="ki-outline ki-moon fs-2"></i></span><span class="menu-title"> Dark </span></a></div><div class="menu-item px-3 my-0"><a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="system"><span class="menu-icon" data-kt-element="icon"><i class="ki-outline ki-screen fs-2"></i></span><span class="menu-title"> System </span></a></div></div></div>',2),T=s("div",{class:"menu-item px-5","data-kt-menu-trigger":"{default: 'click', lg: 'hover'}","data-kt-menu-placement":"left-start","data-kt-menu-offset":"-15px, 0"},[s("a",{href:"#",class:"menu-link px-5"},[s("span",{class:"menu-title position-relative"},[e(" Language "),s("span",{class:"fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0"},[e(" English "),s("img",{class:"w-15px h-15px rounded-1 ms-2",src:x,alt:""})])])]),s("div",{class:"menu-sub menu-sub-dropdown w-175px py-4"},[s("div",{class:"menu-item px-3"},[s("a",{role:"button",class:"menu-link d-flex px-5 active"},[s("span",{class:"symbol symbol-20px me-4"},[s("img",{class:"rounded-1",src:x,alt:""})]),e(" English ")])]),s("div",{class:"menu-item px-3"},[s("a",{role:"button",class:"menu-link d-flex px-5"},[s("span",{class:"symbol symbol-20px me-4"},[s("img",{class:"rounded-1",src:b,alt:""})]),e(" Spanish ")])]),s("div",{class:"menu-item px-3"},[s("a",{role:"button",class:"menu-link d-flex px-5"},[s("span",{class:"symbol symbol-20px me-4"},[s("img",{class:"rounded-1",src:h,alt:""})]),e(" German ")])]),s("div",{class:"menu-item px-3"},[s("a",{role:"button",class:"menu-link d-flex px-5"},[s("span",{class:"symbol symbol-20px me-4"},[s("img",{class:"rounded-1",src:w,alt:""})]),e(" Japanese ")])]),s("div",{class:"menu-item px-3"},[s("a",{role:"button",class:"menu-link d-flex px-5"},[s("span",{class:"symbol symbol-20px me-4"},[s("img",{class:"rounded-1",src:D,alt:""})]),e(" French ")])])])],-1),j={class:"menu-item px-5 my-1 d-none"},z={class:"menu-item px-5"},ns=N({__name:"UserMenuDropdown",setup(K){const n=g().data,u=n.value.imgUrl||"/assets/media/svg/avatars/blank.svg";n.value.account;const k=y(),f=()=>{k.logout()};return(l,t)=>{const d=v,_=C("NuxLink");return o(),i("div",null,[s("div",V,[s("img",{src:a(u),alt:"user"},null,8,E)]),s("div",A,[s("div",B,[s("div",M,[s("div",$,[s("img",{alt:"Logo",src:a(u)},null,8,G)]),s("div",U,[s("div",q,[a(n).name?(o(),i("span",F,L(a(n).name),1)):(o(),i("span",H)),I])])])]),J,s("div",{onClick:t[0]||(t[0]=r=>("closeDrawer"in l?l.closeDrawer:a(p))()),class:"menu-item px-5"},[m(d,{to:"/app/profile/",class:"menu-link px-5"},{default:c(()=>[e(" My Profile ")]),_:1})]),s("div",{onClick:t[1]||(t[1]=r=>("closeDrawer"in l?l.closeDrawer:a(p))()),class:"menu-item px-5"},[m(d,{to:"/app/account-info",class:"menu-link px-5"},{default:c(()=>[O]),_:1})]),P,T,s("div",j,[m(_,{to:"/app/settings",class:"menu-link px-5"},{default:c(()=>[e(" Account Settings ")]),_:1})]),s("div",z,[s("a",{onClick:t[2]||(t[2]=r=>f()),role:"button",class:"menu-link px-5"}," Sign Out ")])])])}}});export{ns as default};
