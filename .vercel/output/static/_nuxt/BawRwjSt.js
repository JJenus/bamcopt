import{_}from"./D_kPoFKT.js";import{a as p,_ as u}from"./92L2RCN-.js";import{a as f}from"./CGGBS1J1.js";import{c as v,J as b,l as x,y as e,u as o,E as h,q as a,x as l,L as c,o as y,G as g}from"./C1v_YKik.js";import"./BR2hkClM.js";import"./CgRmDqS1.js";const k={class:"card mb-5 mb-xl-8"},w={class:"card-body pt-15"},N={class:"d-flex flex-center flex-column mb-5"},C={class:"symbol symbol-100px symbol-circle mb-7"},B=["src"],E={href:"#",class:"fs-3 text-gray-800 text-hover-primary fw-bold mb-1"},V=e("div",{class:"fs-5 fw-semibold text-muted mb-6"},null,-1),D={class:"d-flex flex-wriap flex-center d-noine"},L=e("i",{class:"ki-duotone ki-note-2 fs-3 me-1"},[e("i",{class:"path1"}),e("i",{class:"path2"}),e("i",{class:"path3"}),e("i",{class:"path4"})],-1),R=e("i",{class:"ki-outline ki-notepad-edit fs-3 me-1"},null,-1),$=e("span",{class:"w-50px"},"Edit",-1),q=e("div",{class:"separator separator-dashed my-3"},null,-1),U={__name:"profile",setup(z){const i=p();console.log();const s=v("overview"),r=f().data;return b(()=>{i.path.split("/")[2]&&(s.value=i.path.split("/")[2])}),(G,t)=>{const n=_,d=u;return y(),x("div",k,[e("div",w,[e("div",N,[e("div",C,[e("img",{src:o(r).imgUrl,alt:"image"},null,8,B)]),e("a",E,h(o(r).name),1),V,e("div",D,[a(n,{to:"/admin/profile",onClick:t[0]||(t[0]=m=>s.value="overview"),class:c([o(s)=="overview"?"active":"","btn btn-active-light-primary border border-gray-300 border-dashed rounded py-3 px-3 mb-3"])},{default:l(()=>[L,g(" Overview ")]),_:1},8,["class"]),a(n,{to:"/admin/profile/edit",onClick:t[1]||(t[1]=m=>s.value="edit"),class:c([o(s)=="edit"?"active":"","btn btn-active-light-primary border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3"])},{default:l(()=>[R,$]),_:1},8,["class"])])]),q,a(d)])])}}};export{U as default};