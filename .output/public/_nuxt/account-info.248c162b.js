import{u,a as S}from"./userData.2f85955e.js";import{u as z}from"./appSettings.daec8193.js";import{j as B,a as b,x as a,y as o,B as e,u as n,P,V as $,L as F,U as N,N as q,Y as R,H as L,J as V,Z as T,_ as O,z as Y,R as C}from"./swiper-vue.487844c5.js";import{u as G}from"./entry.b0da6ac6.js";import{u as H}from"./index.4d0f0352.js";import{e as _,s as D}from"./showAlert.1825e18a.js";import{a as A}from"./axios.82afda87.js";import{_ as J}from"./_plugin-vue_export-helper.c27b6911.js";import{c as Z}from"./currency.es.57f74176.js";const h=p=>(T("data-v-2ddb98a7"),p=p(),O(),p),K={class:"modal fade",id:"upgrade-account",tabindex:"-1","aria-labelledby":"upgrade-account","aria-hidden":"true"},Q={class:"modal-dialog modal-dialog-centered"},W={class:"modal-content"},X={class:"modal-body position-relative"},ee=h(()=>e("div",{class:"position-absolute end-0 top-0 m-3"},[e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),te={key:0,class:""},se=h(()=>e("h1",{class:"mb-5 text-center"},"Verify Identity",-1)),ae=h(()=>e("label",{for:"",class:"form-label"},"Upload ID",-1)),oe=["src"],ne=V('<div class="dz-message needsclick position-absolute" data-v-2ddb98a7><i class="ki-duotone ki-file-up fs-3x text-primary" data-v-2ddb98a7><span class="path1" data-v-2ddb98a7></span><span class="path2" data-v-2ddb98a7></span></i><div class="ms-4" data-v-2ddb98a7><h3 class="fs-5 fw-bold text-gray-900 mb-1" data-v-2ddb98a7> Click to upload. </h3><span class="fs-7 fw-semibold text-gray-500" data-v-2ddb98a7>Max size: 5mb</span></div></div>',1),le={class:"btn btn-primary mt-5 w-100"},ce={key:0},ie={key:1,class:"spinner-border spinner-border-sm"},de={key:1,class:"text-center"},re=h(()=>e("h1",{class:"mb-10 text-center"},"Upgrade Account",-1)),ue={key:0,class:"row row-cpls-1 row-cols-md-2 mb-5"},me={class:"col t-parent"},_e=["disabled","id","value"],pe=["for"],ve=h(()=>e("i",{class:"ki-solid ki-medal-star fs-4x me-4"},null,-1)),fe={class:"d-block fw-semibold text-start"},be={class:"text-gray-900 fw-bold d-block fs-3"},he={key:0,class:"text-warning fw-semibold fs-6 t-not"},ge={key:0,class:""},ye={key:1,class:"spinner-border spinner-border-sm"},xe=B({__name:"UpgradeAccount",setup(p){const c=u().data;c.value.account=u().account.value;const g=u().account.value.accountLevel,y=z().accountLevels;u().users.value.length===0&&u().getUsers();const x=y.value;console.log(c.value.account);const k=b(!0),m=G().public;H({title:`${m.APP} - Deploy Collection`});const l=b(!1),I=b(),v=b(),r=b({...c.value}),U=()=>{var s;if(!c.value.idUrl&&!v.value)return _("Please upload an image");const d={url:`${m.BE_API}/users/${c.value.id}`,method:"PUT",data:r.value,headers:{Authorization:"Bearer "+((s=S().userData.value)==null?void 0:s.token)}};l.value=!0,A.request(d).then(t=>{u().admins.value.forEach(i=>{M(i)}),D("Success"),c.value.idUrl=r.value.idUrl}).catch(t=>{console.log(t),_("Failed!")}).finally(()=>l.value=!1)},j=()=>{const d=v.value;if(d){if(!k.value)return U()}else return _("Select an image");const s=new FormData;s.append("file",d),s.append("upload_preset","ml_default"),l.value=!0,A.request({method:"post",url:"https://api.cloudinary.com/v1_1/"+m.CLOUD_NAME+"/image/upload",data:s,headers:{"Content-Type":"multipart/form-data"}}).then(t=>{if(t.data&&t.data.secure_url){const i=t.data.secure_url;return console.log("Image uploaded successfully:",i),r.value.idUrl=i,D("Upload success"),k.value=!1,U(),i}else return l.value=!1,_("Error uploading ID"),console.error("Failed to upload image:",t.data),null}).catch(t=>(console.error("Error uploading image:",t),l.value=!1,_("Failed to create collection"),null)).finally(()=>{l.value=!1})},E=d=>{const s=d.target.files[0];if(!s)return;const t=5*1024*1024;if(s.size>t)return _("The file size must be less than 5 MB.");const i=new FileReader;i.onload=f=>{v.value=f.target.result,k.value=!0},i.readAsDataURL(s)},M=d=>{var i;console.log(r.value);const t={method:"post",data:{userId:d.id,title:"Account Upgrade",message:`${c.value.name} (${c.value.email}) requests upgrade to level ${r.value.account.accountLevel}.`,type:"info",status:"unread"},url:`${m.BE_API}/notifications`,timeout:2e4,headers:{Authorization:"Bearer "+((i=S().userData.value)==null?void 0:i.token)}};A.request(t).then(f=>{console.log("Yes ",f.data)}).catch(f=>{const w=f.response;console.log("Status: ",w==null?void 0:w.status),console.log(w)}).finally(()=>{})};return(d,s)=>(a(),o("div",K,[e("div",Q,[e("div",W,[e("div",X,[ee,n(c).idUrl?(a(),o("div",de,[re,n(r).account?(a(),o("div",ue,[(a(!0),o(F,null,N(n(x),t=>(a(),o("div",me,[q(e("input",{disabled:t.accountLevel<=n(g),type:"radio",class:"btn-check",name:"tier",id:"radio_buttons_"+t.id,value:t.accountLevel,"onUpdate:modelValue":s[3]||(s[3]=i=>n(r).account.accountLevel=i)},null,8,_e),[[R,n(r).account.accountLevel]]),e("label",{class:"btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center",for:"radio_buttons_"+t.id},[ve,e("span",fe,[e("span",be,L(t.title),1),t.accountLevel<=n(g)?(a(),o("span",he," Not allowed ")):$("",!0)])],8,pe)]))),256))])):$("",!0),e("button",{onClick:s[4]||(s[4]=t=>U()),class:"btn btn-primary fw-bold"},[n(l)?(a(),o("span",ye)):(a(),o("span",ge,"Request upgrade"))])])):(a(),o("div",te,[se,e("form",{onSubmit:s[2]||(s[2]=P(t=>j(),["prevent"]))},[ae,e("div",{onClick:s[1]||(s[1]=t=>n(I).click()),class:"dropzone overflow-hidden w-100 min-h-200px d-flex align-items-center justify-content-center",id:"kt_dropzonejs_nft_collection_studio"},[e("input",{ref_key:"inputSelect",ref:I,type:"file",class:"d-none",accept:"image/*",onChange:s[0]||(s[0]=t=>E(t))},null,544),n(v)?(a(),o("img",{key:0,class:"w-100",src:n(v),alt:"",srcset:""},null,8,oe)):$("",!0),ne]),e("button",le,[n(l)?(a(),o("span",ie)):(a(),o("span",ce,"Submit"))])],32)]))])])])]))}});const ke=J(xe,[["__scopeId","data-v-2ddb98a7"]]),we={class:"card card-custom border-0 h-md-100 mb-5 mb-lg-10"},$e=V('<div class="card-header border-0 text-center d-flex flex-column fs-6 justify-content-center p-4"><h1 class="text-center h2 pt-4 fw-bold">Account Information</h1><div class="text-muted">View your transaction limits</div><div class="d-flex align-items-center justify-content-center mt-5"><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#upgrade-account"> Upgrade account </button></div></div>',1),Le={class:"card-body ps-xl-15 min-h-400px"},Ue={class:"row g-5 row-cols-1"},Ae={class:"col"},Ie={class:"card-header py-0 m-0"},Se={class:"d-flex align-items-center m-0"},Ce={class:"h3 p-0 m-0"},De={key:0,class:"badge bg-success ms-3"},ze={class:"card-body m-0"},Be={class:"mb-4 d-flex justify-content-between"},Fe=e("div",{class:"text-muted"}," Daily Transaction Limit ",-1),Ne={class:"fw-bold ms-auto text-end"},Ve={class:"d-flex justify-content-between"},je=e("div",{class:"text-muted"}," Maximum Account Balance ",-1),Ee={class:"fw-bold ms-auto text-end"},Je=B({__name:"account-info",setup(p){u().data;const c=u().account.value.accountLevel,g=z().accountLevels,y=x=>Z(x,{symbol:""}).format();return(x,k)=>{const m=ke;return a(),o("div",null,[e("div",we,[$e,e("div",Le,[e("div",Ue,[(a(!0),o(F,null,N(n(g),l=>(a(),o("div",Ae,[e("div",{class:C([n(c)===l.accountLevel?"card-custom bg-light-primary":"","card"])},[e("div",Ie,[e("div",Se,[e("i",{class:C([n(c)===l.accountLevel?"text-success":"text-info","ki-solid ki-medal-star fs-3x me-2"])},null,2),e("h3",Ce,L(l.title),1),n(c)===l.accountLevel?(a(),o("span",De,"active")):$("",!0)])]),e("div",ze,[e("div",Be,[Fe,e("div",Ne,L(y(l.dailyLimit)),1)]),e("div",Ve,[je,e("div",Ee,L(y(l.maxBalanceLimit)),1)])])],2)]))),256))])])]),Y(m)])}}});export{Je as default};
