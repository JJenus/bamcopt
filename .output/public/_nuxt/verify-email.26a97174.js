import{_ as p}from"./NFTexLogo.acdb316d.js";import{_ as f}from"./nuxt-link.51c38150.js";import{a as u,u as h}from"./entry.b0da6ac6.js";import{a as x}from"./userData.2f85955e.js";import{_ as y}from"./17-dark.a291fdd8.js";import{a as v}from"./axios.82afda87.js";import{j as g,a as d,x as e,y as t,B as s,z as b,u as i,V as k,D as w,A as B,I as C,Z as E,_ as V}from"./swiper-vue.487844c5.js";import{_ as I}from"./_plugin-vue_export-helper.c27b6911.js";const N=""+globalThis.__publicAssetsURL("assets/media/auth/verify-email.png"),A=c=>(E("data-v-57a1c955"),c=c(),V(),c),S={class:"d-flex flex-column flex-root",id:"kt_app_root"},L={class:"d-flex flex-column flex-center flex-column-fluid"},R={class:"d-flex flex-column flex-center text-center p-10"},T={class:"card card-flush w-lg-650px py-5"},j={class:"card-body py-15 py-lg-20"},q={class:"mb-14 text-center d-flex justify-content-center"},z={key:0,class:"fw-bolder text-success mb-5"},D={key:1,class:"fw-bolder text-muted mb-5"},F={key:2,class:"fs-6 mb-8"},P=A(()=>s("span",{class:"fw-semibold text-gray-500"},"Email verified, proceed to sign in. ",-1)),U=[P],Z={class:"mb-11"},$={key:1,class:"spinner-border spinner-border-lg text-muted"},G={class:"mb-0"},H={key:0,src:y,class:"mw-100 mh-300px",alt:""},J={key:1,src:N,class:"mw-100 mh-300px",alt:""},K=g({__name:"verify-email",setup(c){const m=h(),l=u().query.id;console.log(l),d(!1);const a=d(!1);return(()=>{var n;const r={method:"post",data:{id:l},url:`${m.public.BE_API}/auth/verify-email`,timeout:15e3,headers:{Authorization:"Bearer "+((n=x().userData.value)==null?void 0:n.token)}};v.request(r).then(o=>{const _=o.data;console.log(_)}).catch(o=>{console.log(o),o.response.data}).finally(()=>{a.value=!1})})(),(r,n)=>{const o=p,_=f;return e(),t("div",S,[s("div",L,[s("div",R,[s("div",T,[s("div",j,[s("div",q,[b(o,{classes:"h-30px"})]),i(a)?(e(),t("h1",D," Verifying... ")):(e(),t("h1",z," Verification Complete ")),i(a)?k("",!0):(e(),t("div",F,U)),s("div",Z,[i(a)?(e(),t("span",$)):(e(),w(_,{key:0,to:"/sign-in",class:"btn btn-sm btn-primary"},{default:B(()=>[C(" Sign in ")]),_:1}))]),s("div",G,[i(a)?(e(),t("img",J)):(e(),t("img",H))])])])])])])}}});const oe=I(K,[["__scopeId","data-v-57a1c955"]]);export{oe as default};
