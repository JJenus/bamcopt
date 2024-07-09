import{_ as be}from"./BVF8eyqn.js";import{u as ye}from"./DQ9eh1HQ.js";import{d as Y,c as D,o as b,l as x,y as o,N as E,O as R,u as c,F as H,Q as Z,E as C,H as xe,L as $,R as O,G as I,J as we,P as ke,q as W,A as J,x as _e}from"./C1v_YKik.js";import{b as V,u as Q,a as De}from"./CGGBS1J1.js";import{u as j}from"./92L2RCN-.js";import{u as X}from"./CQQ8cjCY.js";import{a as ee}from"./CgRmDqS1.js";import{_ as Se}from"./D_kPoFKT.js";import{u as Ce}from"./DSvAVT1f.js";import{e as T,s as Ie}from"./BsrlggJy.js";import{c as Fe}from"./BlZMbl00.js";import"./D1pW-EBp.js";import"./BR2hkClM.js";import"./9OAR_aOO.js";import"./Cpj98o6Y.js";const Pe={class:"row row-cols-1 row-cols-lg-2 g-4"},Ve={class:"col"},Le=o("label",{class:"form-label"},"Bank Name",-1),Te={class:"col"},$e=o("label",{class:"form-label"},"Account holder name",-1),Ae={class:"col"},Be=o("label",{class:"form-label"},"Beneficiary account number",-1),Me={class:"col"},Ee=o("label",{for:"",class:"form-label"},"Account Type",-1),Re={class:"form-control"},Ue=["value"],Oe={class:"col"},Ne=o("label",{for:"",class:"form-label"},"Country",-1),He={class:"form-control"},Ze=["value"],je=xe('<div class="col"><label class="form-label">Swift code</label><input name="swift_number" type="text" placeholder="Swift code" class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"></div><div class="col"><label class="form-label">Routing number</label><input name="routing_number" type="text" placeholder="Routing Number (optional)" class="form-control disabled money-input fs-5 form-control fw-bold form-control-solid"><div class="text-end d-none pe-3 fs-1"><span class="fs-sm text-muted">Required only if the receiving bank requires it</span></div></div>',2),qe=Y({__name:"ToBank",setup(e){const n=ye().countries,i=D(["Checking account","Savings account","Current account"]),r=V("transaction-form");return(a,s)=>(b(),x("div",Pe,[o("div",Ve,[Le,E(o("input",{"onUpdate:modelValue":s[0]||(s[0]=l=>c(r).beneficiary.bank=l),name:"bank_name",type:"text",placeholder:"Bank Name",class:"form-control disabled money-input fs-5 form-control fw-bold form-control-solid"},null,512),[[R,c(r).beneficiary.bank]])]),o("div",Te,[$e,E(o("input",{required:"","onUpdate:modelValue":s[1]||(s[1]=l=>c(r).beneficiary.name=l),name:"account_holder_name",type:"text",placeholder:"Account Holder Name",class:"form-control disabled money-input fs-5 form-control fw-bold form-control-solid"},null,512),[[R,c(r).beneficiary.name]])]),o("div",Ae,[Be,E(o("input",{required:"","onUpdate:modelValue":s[2]||(s[2]=l=>c(r).beneficiary.destinationAccount=l),name:"account_number",type:"text",placeholder:"Account Number",class:"form-control disabled money-input fs-5 form-control fw-bold form-control-solid"},null,512),[[R,c(r).beneficiary.destinationAccount]])]),o("div",Me,[Ee,o("select",Re,[(b(!0),x(H,null,Z(c(i),l=>(b(),x("option",{value:l},C(l),9,Ue))),256))])]),o("div",Oe,[Ne,o("select",He,[(b(!0),x(H,null,Z(c(n),l=>(b(),x("option",{value:l.name.common},C(l.name.common),9,Ze))),256))])]),je]))}}),Ye={class:"mb-3 mt-10 d-flex align-items-center flex-center gap-2"},ze=o("i",{class:"ki-solid ki-send fs-2x mb-1"},null,-1),Ge={class:"fw-bold fs-2x"},Ke={class:"mb-5"},We=["placeholder"],Je={key:0,class:"spinner-border spinner-border-sm text-muted"},Qe={key:1,class:"fs-sm"},Xe={key:0,style:{"margin-bottom":"15px"},bis_skin_checked:"1"},et=o("h3",{class:"mb-3",style:{color:"#181c32"}},"Transfer",-1),tt={style:{"padding-bottom":"9px"},bis_skin_checked:"1"},nt={style:{display:"flex","justify-content":"space-between",color:"#7e8299","font-size":"14px","font-weight":"500","margin-bottom":"8px"},bis_skin_checked:"1"},it=o("div",{style:{"font-family":"Arial, Helvetica, sans-serif"},bis_skin_checked:"1"}," Amount ",-1),rt={class:"text-end fw-bold",style:{"font-family":"Arial, Helvetica, sans-serif"},bis_skin_checked:"1"},at={style:{display:"flex","justify-content":"space-between",color:"#7e8299","font-size":"14px","font-weight":"500"},bis_skin_checked:"1"},ot=o("div",{style:{"font-family":"Arial, Helvetica, sans-serif"},bis_skin_checked:"1"}," To: ",-1),st={class:"text-end",style:{"font-family":"Arial, Helvetica, sans-serif"},bis_skin_checked:"1"},lt={class:"fw-bold"},ct=o("div",{class:"separator separator-dashed",style:{margin:"15px 0"},bis_skin_checked:"1"},null,-1),dt=Y({__name:"ToElisa",props:{amount:{type:String,required:!0}},setup(e){const t=D(j().public.APP),n=X().formatMoney,i=e,r=V("transfer-recipient"),a=V("bank-recipient"),s=V("transfer-recipient-found",()=>""),l=D(!1),u=()=>{let v=i.amount||0;return n(v,!1)},m=()=>{var f;l.value=!0;const v={method:"post",data:{email:r.value.email},url:`${j().public.BE_API}/users/find`,timeout:15e3,headers:{Authorization:"Bearer "+((f=Q().userData.value)==null?void 0:f.token)}};ee.request(v).then(y=>{const g=y.data;console.log("Found",g),r.value=g,s.value=g.name}).catch(y=>{s.value=!1}).finally(()=>{l.value=!1})},d=()=>{l.value||a.value!=t.value||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.value.email)||(console.log("Valid email"),m())};return(v,f)=>(b(),x("div",null,[o("div",Ye,[ze,o("span",Ge,C(c(a)),1)]),o("div",Ke,[E(o("input",{onInput:f[0]||(f[0]=y=>d()),"onUpdate:modelValue":f[1]||(f[1]=y=>c(r).email=y),name:"email",type:"text",placeholder:`Enter ${c(a)} email: jon@gmail.com`,class:"form-control disabled money-input fs-5 form-control fw-bold form-control-solid"},null,40,We),[[R,c(r).email]]),o("div",{class:$([c(s)?"":"text-danger","text-end pe-3 fs-1"])},[c(l)?(b(),x("span",Je)):O("",!0),c(s)===!1&&!c(l)&&c(a)==c(t)?(b(),x("span",Qe,"User doesn't exist")):O("",!0)],2)]),c(s)&&c(a)==c(t)?(b(),x("div",Xe,[et,o("div",tt,[o("div",nt,[it,o("div",rt," $"+C(u()),1)]),o("div",at,[ot,o("div",st,[I(C(c(r).name)+" ",1),o("div",lt,C(c(r).email),1)])]),ct])])):O("",!0)]))}});var A=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},P=function(e,t,n,i,r,a,s,l,u,m){var d=this;d.numeralDecimalMark=e||".",d.numeralIntegerScale=t>0?t:0,d.numeralDecimalScale=n>=0?n:2,d.numeralThousandsGroupStyle=i||P.groupStyle.thousand,d.numeralPositiveOnly=!!r,d.stripLeadingZeroes=a!==!1,d.prefix=s||s===""?s:"",d.signBeforePrefix=!!l,d.tailPrefix=!!u,d.delimiter=m||m===""?m:",",d.delimiterRE=m?new RegExp("\\"+m,"g"):""};P.groupStyle={thousand:"thousand",lakh:"lakh",wan:"wan",none:"none"};P.prototype={getRawValue:function(e){return e.replace(this.delimiterRE,"").replace(this.numeralDecimalMark,".")},format:function(e){var t=this,n,i,r,a,s="";switch(e=e.replace(/[A-Za-z]/g,"").replace(t.numeralDecimalMark,"M").replace(/[^\dM-]/g,"").replace(/^\-/,"N").replace(/\-/g,"").replace("N",t.numeralPositiveOnly?"":"-").replace("M",t.numeralDecimalMark),t.stripLeadingZeroes&&(e=e.replace(/^(-)?0+(?=\d)/,"$1")),i=e.slice(0,1)==="-"?"-":"",typeof t.prefix<"u"?t.signBeforePrefix?r=i+t.prefix:r=t.prefix+i:r=i,a=e,e.indexOf(t.numeralDecimalMark)>=0&&(n=e.split(t.numeralDecimalMark),a=n[0],s=t.numeralDecimalMark+n[1].slice(0,t.numeralDecimalScale)),i==="-"&&(a=a.slice(1)),t.numeralIntegerScale>0&&(a=a.slice(0,t.numeralIntegerScale)),t.numeralThousandsGroupStyle){case P.groupStyle.lakh:a=a.replace(/(\d)(?=(\d\d)+\d$)/g,"$1"+t.delimiter);break;case P.groupStyle.wan:a=a.replace(/(\d)(?=(\d{4})+$)/g,"$1"+t.delimiter);break;case P.groupStyle.thousand:a=a.replace(/(\d)(?=(\d{3})+$)/g,"$1"+t.delimiter);break}return t.tailPrefix?i+a.toString()+(t.numeralDecimalScale>0?s.toString():"")+t.prefix:r+a.toString()+(t.numeralDecimalScale>0?s.toString():"")}};var ut=P,te=function(e,t,n){var i=this;i.date=[],i.blocks=[],i.datePattern=e,i.dateMin=t.split("-").reverse().map(function(r){return parseInt(r,10)}),i.dateMin.length===2&&i.dateMin.unshift(0),i.dateMax=n.split("-").reverse().map(function(r){return parseInt(r,10)}),i.dateMax.length===2&&i.dateMax.unshift(0),i.initBlocks()};te.prototype={initBlocks:function(){var e=this;e.datePattern.forEach(function(t){t==="Y"?e.blocks.push(4):e.blocks.push(2)})},getISOFormatDate:function(){var e=this,t=e.date;return t[2]?t[2]+"-"+e.addLeadingZero(t[1])+"-"+e.addLeadingZero(t[0]):""},getBlocks:function(){return this.blocks},getValidatedDate:function(e){var t=this,n="";return e=e.replace(/[^\d]/g,""),t.blocks.forEach(function(i,r){if(e.length>0){var a=e.slice(0,i),s=a.slice(0,1),l=e.slice(i);switch(t.datePattern[r]){case"d":a==="00"?a="01":parseInt(s,10)>3?a="0"+s:parseInt(a,10)>31&&(a="31");break;case"m":a==="00"?a="01":parseInt(s,10)>1?a="0"+s:parseInt(a,10)>12&&(a="12");break}n+=a,e=l}}),this.getFixedDateString(n)},getFixedDateString:function(e){var t=this,n=t.datePattern,i=[],r=0,a=0,s=0,l=0,u=0,m=0,d,v,f,y=!1;e.length===4&&n[0].toLowerCase()!=="y"&&n[1].toLowerCase()!=="y"&&(l=n[0]==="d"?0:2,u=2-l,d=parseInt(e.slice(l,l+2),10),v=parseInt(e.slice(u,u+2),10),i=this.getFixedDate(d,v,0)),e.length===8&&(n.forEach(function(w,S){switch(w){case"d":r=S;break;case"m":a=S;break;default:s=S;break}}),m=s*2,l=r<=s?r*2:r*2+2,u=a<=s?a*2:a*2+2,d=parseInt(e.slice(l,l+2),10),v=parseInt(e.slice(u,u+2),10),f=parseInt(e.slice(m,m+4),10),y=e.slice(m,m+4).length===4,i=this.getFixedDate(d,v,f)),e.length===4&&(n[0]==="y"||n[1]==="y")&&(u=n[0]==="m"?0:2,m=2-u,v=parseInt(e.slice(u,u+2),10),f=parseInt(e.slice(m,m+2),10),y=e.slice(m,m+2).length===2,i=[0,v,f]),e.length===6&&(n[0]==="Y"||n[1]==="Y")&&(u=n[0]==="m"?0:4,m=2-.5*u,v=parseInt(e.slice(u,u+2),10),f=parseInt(e.slice(m,m+4),10),y=e.slice(m,m+4).length===4,i=[0,v,f]),i=t.getRangeFixedDate(i),t.date=i;var g=i.length===0?e:n.reduce(function(w,S){switch(S){case"d":return w+(i[0]===0?"":t.addLeadingZero(i[0]));case"m":return w+(i[1]===0?"":t.addLeadingZero(i[1]));case"y":return w+(y?t.addLeadingZeroForYear(i[2],!1):"");case"Y":return w+(y?t.addLeadingZeroForYear(i[2],!0):"")}},"");return g},getRangeFixedDate:function(e){var t=this,n=t.datePattern,i=t.dateMin||[],r=t.dateMax||[];return!e.length||i.length<3&&r.length<3||n.find(function(a){return a.toLowerCase()==="y"})&&e[2]===0?e:r.length&&(r[2]<e[2]||r[2]===e[2]&&(r[1]<e[1]||r[1]===e[1]&&r[0]<e[0]))?r:i.length&&(i[2]>e[2]||i[2]===e[2]&&(i[1]>e[1]||i[1]===e[1]&&i[0]>e[0]))?i:e},getFixedDate:function(e,t,n){return e=Math.min(e,31),t=Math.min(t,12),n=parseInt(n||0,10),(t<7&&t%2===0||t>8&&t%2===1)&&(e=Math.min(e,t===2?this.isLeapYear(n)?29:28:30)),[e,t,n]},isLeapYear:function(e){return e%4===0&&e%100!==0||e%400===0},addLeadingZero:function(e){return(e<10?"0":"")+e},addLeadingZeroForYear:function(e,t){return t?(e<10?"000":e<100?"00":e<1e3?"0":"")+e:(e<10?"0":"")+e}};var mt=te,ne=function(e,t){var n=this;n.time=[],n.blocks=[],n.timePattern=e,n.timeFormat=t,n.initBlocks()};ne.prototype={initBlocks:function(){var e=this;e.timePattern.forEach(function(){e.blocks.push(2)})},getISOFormatTime:function(){var e=this,t=e.time;return t[2]?e.addLeadingZero(t[0])+":"+e.addLeadingZero(t[1])+":"+e.addLeadingZero(t[2]):""},getBlocks:function(){return this.blocks},getTimeFormatOptions:function(){var e=this;return String(e.timeFormat)==="12"?{maxHourFirstDigit:1,maxHours:12,maxMinutesFirstDigit:5,maxMinutes:60}:{maxHourFirstDigit:2,maxHours:23,maxMinutesFirstDigit:5,maxMinutes:60}},getValidatedTime:function(e){var t=this,n="";e=e.replace(/[^\d]/g,"");var i=t.getTimeFormatOptions();return t.blocks.forEach(function(r,a){if(e.length>0){var s=e.slice(0,r),l=s.slice(0,1),u=e.slice(r);switch(t.timePattern[a]){case"h":parseInt(l,10)>i.maxHourFirstDigit?s="0"+l:parseInt(s,10)>i.maxHours&&(s=i.maxHours+"");break;case"m":case"s":parseInt(l,10)>i.maxMinutesFirstDigit?s="0"+l:parseInt(s,10)>i.maxMinutes&&(s=i.maxMinutes+"");break}n+=s,e=u}}),this.getFixedTimeString(n)},getFixedTimeString:function(e){var t=this,n=t.timePattern,i=[],r=0,a=0,s=0,l=0,u=0,m=0,d,v,f;return e.length===6&&(n.forEach(function(y,g){switch(y){case"s":r=g*2;break;case"m":a=g*2;break;case"h":s=g*2;break}}),m=s,u=a,l=r,d=parseInt(e.slice(l,l+2),10),v=parseInt(e.slice(u,u+2),10),f=parseInt(e.slice(m,m+2),10),i=this.getFixedTime(f,v,d)),e.length===4&&t.timePattern.indexOf("s")<0&&(n.forEach(function(y,g){switch(y){case"m":a=g*2;break;case"h":s=g*2;break}}),m=s,u=a,d=0,v=parseInt(e.slice(u,u+2),10),f=parseInt(e.slice(m,m+2),10),i=this.getFixedTime(f,v,d)),t.time=i,i.length===0?e:n.reduce(function(y,g){switch(g){case"s":return y+t.addLeadingZero(i[2]);case"m":return y+t.addLeadingZero(i[1]);case"h":return y+t.addLeadingZero(i[0])}},"")},getFixedTime:function(e,t,n){return n=Math.min(parseInt(n||0,10),60),t=Math.min(t,60),e=Math.min(e,60),[e,t,n]},addLeadingZero:function(e){return(e<10?"0":"")+e}};var ft=ne,ie=function(e,t){var n=this;n.delimiter=t||t===""?t:" ",n.delimiterRE=t?new RegExp("\\"+t,"g"):"",n.formatter=e};ie.prototype={setFormatter:function(e){this.formatter=e},format:function(e){var t=this;t.formatter.clear(),e=e.replace(/[^\d+]/g,""),e=e.replace(/^\+/,"B").replace(/\+/g,"").replace("B","+"),e=e.replace(t.delimiterRE,"");for(var n="",i,r=!1,a=0,s=e.length;a<s;a++)i=t.formatter.inputDigit(e.charAt(a)),/[\s()-]/g.test(i)?(n=i,r=!0):r||(n=i);return n=n.replace(/[()]/g,""),n=n.replace(/[\s-]/g,t.delimiter),n}};var pt=ie,q={blocks:{uatp:[4,5,6],amex:[4,6,5],diners:[4,6,4],discover:[4,4,4,4],mastercard:[4,4,4,4],dankort:[4,4,4,4],instapayment:[4,4,4,4],jcb15:[4,6,5],jcb:[4,4,4,4],maestro:[4,4,4,4],visa:[4,4,4,4],mir:[4,4,4,4],unionPay:[4,4,4,4],general:[4,4,4,4]},re:{uatp:/^(?!1800)1\d{0,14}/,amex:/^3[47]\d{0,13}/,discover:/^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,diners:/^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,mastercard:/^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,dankort:/^(5019|4175|4571)\d{0,12}/,instapayment:/^63[7-9]\d{0,13}/,jcb15:/^(?:2131|1800)\d{0,11}/,jcb:/^(?:35\d{0,2})\d{0,12}/,maestro:/^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,mir:/^220[0-4]\d{0,12}/,visa:/^4\d{0,15}/,unionPay:/^(62|81)\d{0,14}/},getStrictBlocks:function(e){var t=e.reduce(function(n,i){return n+i},0);return e.concat(19-t)},getInfo:function(e,t){var n=q.blocks,i=q.re;t=!!t;for(var r in i)if(i[r].test(e)){var a=n[r];return{type:r,blocks:t?this.getStrictBlocks(a):a}}return{type:"unknown",blocks:t?this.getStrictBlocks(n.general):n.general}}},ht=q,gt={noop:function(){},strip:function(e,t){return e.replace(t,"")},getPostDelimiter:function(e,t,n){if(n.length===0)return e.slice(-t.length)===t?t:"";var i="";return n.forEach(function(r){e.slice(-r.length)===r&&(i=r)}),i},getDelimiterREByDelimiter:function(e){return new RegExp(e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),"g")},getNextCursorPosition:function(e,t,n,i,r){return t.length===e?n.length:e+this.getPositionOffset(e,t,n,i,r)},getPositionOffset:function(e,t,n,i,r){var a,s,l;return a=this.stripDelimiters(t.slice(0,e),i,r),s=this.stripDelimiters(n.slice(0,e),i,r),l=a.length-s.length,l!==0?l/Math.abs(l):0},stripDelimiters:function(e,t,n){var i=this;if(n.length===0){var r=t?i.getDelimiterREByDelimiter(t):"";return e.replace(r,"")}return n.forEach(function(a){a.split("").forEach(function(s){e=e.replace(i.getDelimiterREByDelimiter(s),"")})}),e},headStr:function(e,t){return e.slice(0,t)},getMaxLength:function(e){return e.reduce(function(t,n){return t+n},0)},getPrefixStrippedValue:function(e,t,n,i,r,a,s,l,u){if(n===0)return e;if(e===t&&e!=="")return"";if(u&&e.slice(0,1)=="-"){var m=i.slice(0,1)=="-"?i.slice(1):i;return"-"+this.getPrefixStrippedValue(e.slice(1),t,n,m,r,a,s,l,u)}if(i.slice(0,n)!==t&&!l)return s&&!i&&e?e:"";if(i.slice(-n)!==t&&l)return s&&!i&&e?e:"";var d=this.stripDelimiters(i,r,a);return e.slice(0,n)!==t&&!l?d.slice(n):e.slice(-n)!==t&&l?d.slice(0,-n-1):l?e.slice(0,-n):e.slice(n)},getFirstDiffIndex:function(e,t){for(var n=0;e.charAt(n)===t.charAt(n);)if(e.charAt(n++)==="")return-1;return n},getFormattedValue:function(e,t,n,i,r,a){var s="",l=r.length>0,u="";return n===0?e:(t.forEach(function(m,d){if(e.length>0){var v=e.slice(0,m),f=e.slice(m);l?u=r[a?d-1:d]||u:u=i,a?(d>0&&(s+=u),s+=v):(s+=v,v.length===m&&d<n-1&&(s+=u)),e=f}}),s)},fixPrefixCursor:function(e,t,n,i){if(e){var r=e.value,a=n||i[0]||" ";if(!(!e.setSelectionRange||!t||t.length+a.length<=r.length)){var s=r.length*2;setTimeout(function(){e.setSelectionRange(s,s)},1)}}},checkFullSelection:function(e){try{var t=window.getSelection()||document.getSelection()||{};return t.toString().length===e.length}catch{}return!1},setSelection:function(e,t,n){if(e===this.getActiveElement(n)&&!(e&&e.value.length<=t))if(e.createTextRange){var i=e.createTextRange();i.move("character",t),i.select()}else try{e.setSelectionRange(t,t)}catch{console.warn("The input element type does not support selection")}},getActiveElement:function(e){var t=e.activeElement;return t&&t.shadowRoot?this.getActiveElement(t.shadowRoot):t},isAndroid:function(){return navigator&&/android/i.test(navigator.userAgent)},isAndroidBackspaceKeydown:function(e,t){return!this.isAndroid()||!e||!t?!1:t===e.slice(0,-1)}},vt=gt,bt={assign:function(e,t){return e=e||{},t=t||{},e.creditCard=!!t.creditCard,e.creditCardStrictMode=!!t.creditCardStrictMode,e.creditCardType="",e.onCreditCardTypeChanged=t.onCreditCardTypeChanged||function(){},e.phone=!!t.phone,e.phoneRegionCode=t.phoneRegionCode||"AU",e.phoneFormatter={},e.time=!!t.time,e.timePattern=t.timePattern||["h","m","s"],e.timeFormat=t.timeFormat||"24",e.timeFormatter={},e.date=!!t.date,e.datePattern=t.datePattern||["d","m","Y"],e.dateMin=t.dateMin||"",e.dateMax=t.dateMax||"",e.dateFormatter={},e.numeral=!!t.numeral,e.numeralIntegerScale=t.numeralIntegerScale>0?t.numeralIntegerScale:0,e.numeralDecimalScale=t.numeralDecimalScale>=0?t.numeralDecimalScale:2,e.numeralDecimalMark=t.numeralDecimalMark||".",e.numeralThousandsGroupStyle=t.numeralThousandsGroupStyle||"thousand",e.numeralPositiveOnly=!!t.numeralPositiveOnly,e.stripLeadingZeroes=t.stripLeadingZeroes!==!1,e.signBeforePrefix=!!t.signBeforePrefix,e.tailPrefix=!!t.tailPrefix,e.swapHiddenInput=!!t.swapHiddenInput,e.numericOnly=e.creditCard||e.date||!!t.numericOnly,e.uppercase=!!t.uppercase,e.lowercase=!!t.lowercase,e.prefix=e.creditCard||e.date?"":t.prefix||"",e.noImmediatePrefix=!!t.noImmediatePrefix,e.prefixLength=e.prefix.length,e.rawValueTrimPrefix=!!t.rawValueTrimPrefix,e.copyDelimiter=!!t.copyDelimiter,e.initValue=t.initValue!==void 0&&t.initValue!==null?t.initValue.toString():"",e.delimiter=t.delimiter||t.delimiter===""?t.delimiter:t.date?"/":t.time?":":t.numeral?",":(t.phone," "),e.delimiterLength=e.delimiter.length,e.delimiterLazyShow=!!t.delimiterLazyShow,e.delimiters=t.delimiters||[],e.blocks=t.blocks||[],e.blocksLength=e.blocks.length,e.root=typeof A=="object"&&A?A:window,e.document=t.document||e.root.document,e.maxLength=0,e.backspace=!1,e.result="",e.onValueChanged=t.onValueChanged||function(){},e}},yt=bt,h=function(e,t){var n=this,i=!1;if(typeof e=="string"?(n.element=document.querySelector(e),i=document.querySelectorAll(e).length>1):typeof e.length<"u"&&e.length>0?(n.element=e[0],i=e.length>1):n.element=e,!n.element)throw new Error("[cleave.js] Please check the element");if(i)try{console.warn("[cleave.js] Multiple input fields matched, cleave.js will only take the first one.")}catch{}t.initValue=n.element.value,n.properties=h.DefaultProperties.assign({},t),n.init()};h.prototype={init:function(){var e=this,t=e.properties;if(!t.numeral&&!t.phone&&!t.creditCard&&!t.time&&!t.date&&t.blocksLength===0&&!t.prefix){e.onInput(t.initValue);return}t.maxLength=h.Util.getMaxLength(t.blocks),e.isAndroid=h.Util.isAndroid(),e.lastInputValue="",e.isBackward="",e.onChangeListener=e.onChange.bind(e),e.onKeyDownListener=e.onKeyDown.bind(e),e.onFocusListener=e.onFocus.bind(e),e.onCutListener=e.onCut.bind(e),e.onCopyListener=e.onCopy.bind(e),e.initSwapHiddenInput(),e.element.addEventListener("input",e.onChangeListener),e.element.addEventListener("keydown",e.onKeyDownListener),e.element.addEventListener("focus",e.onFocusListener),e.element.addEventListener("cut",e.onCutListener),e.element.addEventListener("copy",e.onCopyListener),e.initPhoneFormatter(),e.initDateFormatter(),e.initTimeFormatter(),e.initNumeralFormatter(),(t.initValue||t.prefix&&!t.noImmediatePrefix)&&e.onInput(t.initValue)},initSwapHiddenInput:function(){var e=this,t=e.properties;if(t.swapHiddenInput){var n=e.element.cloneNode(!0);e.element.parentNode.insertBefore(n,e.element),e.elementSwapHidden=e.element,e.elementSwapHidden.type="hidden",e.element=n,e.element.id=""}},initNumeralFormatter:function(){var e=this,t=e.properties;t.numeral&&(t.numeralFormatter=new h.NumeralFormatter(t.numeralDecimalMark,t.numeralIntegerScale,t.numeralDecimalScale,t.numeralThousandsGroupStyle,t.numeralPositiveOnly,t.stripLeadingZeroes,t.prefix,t.signBeforePrefix,t.tailPrefix,t.delimiter))},initTimeFormatter:function(){var e=this,t=e.properties;t.time&&(t.timeFormatter=new h.TimeFormatter(t.timePattern,t.timeFormat),t.blocks=t.timeFormatter.getBlocks(),t.blocksLength=t.blocks.length,t.maxLength=h.Util.getMaxLength(t.blocks))},initDateFormatter:function(){var e=this,t=e.properties;t.date&&(t.dateFormatter=new h.DateFormatter(t.datePattern,t.dateMin,t.dateMax),t.blocks=t.dateFormatter.getBlocks(),t.blocksLength=t.blocks.length,t.maxLength=h.Util.getMaxLength(t.blocks))},initPhoneFormatter:function(){var e=this,t=e.properties;if(t.phone)try{t.phoneFormatter=new h.PhoneFormatter(new t.root.Cleave.AsYouTypeFormatter(t.phoneRegionCode),t.delimiter)}catch{throw new Error("[cleave.js] Please include phone-type-formatter.{country}.js lib")}},onKeyDown:function(e){var t=this,n=e.which||e.keyCode;t.lastInputValue=t.element.value,t.isBackward=n===8},onChange:function(e){var t=this,n=t.properties,i=h.Util;t.isBackward=t.isBackward||e.inputType==="deleteContentBackward";var r=i.getPostDelimiter(t.lastInputValue,n.delimiter,n.delimiters);t.isBackward&&r?n.postDelimiterBackspace=r:n.postDelimiterBackspace=!1,this.onInput(this.element.value)},onFocus:function(){var e=this,t=e.properties;e.lastInputValue=e.element.value,t.prefix&&t.noImmediatePrefix&&!e.element.value&&this.onInput(t.prefix),h.Util.fixPrefixCursor(e.element,t.prefix,t.delimiter,t.delimiters)},onCut:function(e){h.Util.checkFullSelection(this.element.value)&&(this.copyClipboardData(e),this.onInput(""))},onCopy:function(e){h.Util.checkFullSelection(this.element.value)&&this.copyClipboardData(e)},copyClipboardData:function(e){var t=this,n=t.properties,i=h.Util,r=t.element.value,a="";n.copyDelimiter?a=r:a=i.stripDelimiters(r,n.delimiter,n.delimiters);try{e.clipboardData?e.clipboardData.setData("Text",a):window.clipboardData.setData("Text",a),e.preventDefault()}catch{}},onInput:function(e){var t=this,n=t.properties,i=h.Util,r=i.getPostDelimiter(e,n.delimiter,n.delimiters);if(!n.numeral&&n.postDelimiterBackspace&&!r&&(e=i.headStr(e,e.length-n.postDelimiterBackspace.length)),n.phone){n.prefix&&(!n.noImmediatePrefix||e.length)?n.result=n.prefix+n.phoneFormatter.format(e).slice(n.prefix.length):n.result=n.phoneFormatter.format(e),t.updateValueState();return}if(n.numeral){n.prefix&&n.noImmediatePrefix&&e.length===0?n.result="":n.result=n.numeralFormatter.format(e),t.updateValueState();return}if(n.date&&(e=n.dateFormatter.getValidatedDate(e)),n.time&&(e=n.timeFormatter.getValidatedTime(e)),e=i.stripDelimiters(e,n.delimiter,n.delimiters),e=i.getPrefixStrippedValue(e,n.prefix,n.prefixLength,n.result,n.delimiter,n.delimiters,n.noImmediatePrefix,n.tailPrefix,n.signBeforePrefix),e=n.numericOnly?i.strip(e,/[^\d]/g):e,e=n.uppercase?e.toUpperCase():e,e=n.lowercase?e.toLowerCase():e,n.prefix&&(n.tailPrefix?e=e+n.prefix:e=n.prefix+e,n.blocksLength===0)){n.result=e,t.updateValueState();return}n.creditCard&&t.updateCreditCardPropsByValue(e),e=i.headStr(e,n.maxLength),n.result=i.getFormattedValue(e,n.blocks,n.blocksLength,n.delimiter,n.delimiters,n.delimiterLazyShow),t.updateValueState()},updateCreditCardPropsByValue:function(e){var t=this,n=t.properties,i=h.Util,r;i.headStr(n.result,4)!==i.headStr(e,4)&&(r=h.CreditCardDetector.getInfo(e,n.creditCardStrictMode),n.blocks=r.blocks,n.blocksLength=n.blocks.length,n.maxLength=i.getMaxLength(n.blocks),n.creditCardType!==r.type&&(n.creditCardType=r.type,n.onCreditCardTypeChanged.call(t,n.creditCardType)))},updateValueState:function(){var e=this,t=h.Util,n=e.properties;if(e.element){var i=e.element.selectionEnd,r=e.element.value,a=n.result;if(i=t.getNextCursorPosition(i,r,a,n.delimiter,n.delimiters),e.isAndroid){window.setTimeout(function(){e.element.value=a,t.setSelection(e.element,i,n.document,!1),e.callOnValueChanged()},1);return}e.element.value=a,n.swapHiddenInput&&(e.elementSwapHidden.value=e.getRawValue()),t.setSelection(e.element,i,n.document,!1),e.callOnValueChanged()}},callOnValueChanged:function(){var e=this,t=e.properties;t.onValueChanged.call(e,{target:{name:e.element.name,value:t.result,rawValue:e.getRawValue()}})},setPhoneRegionCode:function(e){var t=this,n=t.properties;n.phoneRegionCode=e,t.initPhoneFormatter(),t.onChange()},setRawValue:function(e){var t=this,n=t.properties;e=e!=null?e.toString():"",n.numeral&&(e=e.replace(".",n.numeralDecimalMark)),n.postDelimiterBackspace=!1,t.element.value=e,t.onInput(e)},getRawValue:function(){var e=this,t=e.properties,n=h.Util,i=e.element.value;return t.rawValueTrimPrefix&&(i=n.getPrefixStrippedValue(i,t.prefix,t.prefixLength,t.result,t.delimiter,t.delimiters,t.noImmediatePrefix,t.tailPrefix,t.signBeforePrefix)),t.numeral?i=t.numeralFormatter.getRawValue(i):i=n.stripDelimiters(i,t.delimiter,t.delimiters),i},getISOFormatDate:function(){var e=this,t=e.properties;return t.date?t.dateFormatter.getISOFormatDate():""},getISOFormatTime:function(){var e=this,t=e.properties;return t.time?t.timeFormatter.getISOFormatTime():""},getFormattedValue:function(){return this.element.value},destroy:function(){var e=this;e.element.removeEventListener("input",e.onChangeListener),e.element.removeEventListener("keydown",e.onKeyDownListener),e.element.removeEventListener("focus",e.onFocusListener),e.element.removeEventListener("cut",e.onCutListener),e.element.removeEventListener("copy",e.onCopyListener)},toString:function(){return"[Cleave Object]"}};h.NumeralFormatter=ut;h.DateFormatter=mt;h.TimeFormatter=ft;h.PhoneFormatter=pt;h.CreditCardDetector=ht;h.Util=vt;h.DefaultProperties=yt;(typeof A=="object"&&A?A:window).Cleave=h;var xt=h,M=(e=>(e.DEBIT="debit",e.CREDIT="credit",e.WITHDRAWAL="withdrawal",e.SEND="send",e))(M||{});const wt={class:"card card-flush card-custom border-0 h-md-100 mb-5 mb-lg-10"},kt=o("div",{class:"card-header text-center d-flex justify-content-center p-4"},[o("h1",{class:"text-center h2 pt-4 fw-bold"},"Transfer")],-1),_t={class:"card-body min-h-500px"},Dt={class:"mb-5"},St=["disabled"],Ct={key:0,class:"mb-8 min-h-250px"},It={class:"d-flex flex-center flex-row mb-3 gap-2"},Ft=o("i",{class:"ki-solid ki-bank fs-2x mb-1"},null,-1),Pt={class:"d-flex flex-center flex-row mb-5 gap-2"},Vt=o("i",{class:"ki-duotone ki-paypal fs-2x"},[o("span",{class:"path1"}),o("span",{class:"path2"})],-1),Lt=o("span",{class:"rounded fs-3 fw-bold shadow-lg"},"S",-1),Tt={key:1},$t={class:"d-flex flex-row mb-8 justify-content-end w-100 d-none"},At=o("button",{type:"button",class:"btn btn-sm btn-light-primary fw-semibold me-2"},[o("i",{class:"ki-solid ki-dollar"}),I(" Request payment ")],-1),Bt=o("i",{class:"ki-duotone ki-scan-barcode"},[o("i",{class:"path1"}),o("i",{class:"path2"}),o("i",{class:"path3"}),o("i",{class:"path4"}),o("i",{class:"path5"}),o("i",{class:"path6"}),o("i",{class:"path7"}),o("i",{class:"path8"})],-1),Mt={class:"row flex-row row-cols-3 justify-content-end"},Et={class:"col justify-content-center d-flex mb-4"},Rt=["onClick"],Ut={class:"col justify-content-center d-flex mb-4"},Ot=o("i",{class:"ki-solid ki-arrow-left fs-2x fw-bold"},null,-1),Nt=[Ot],Ht=["disabled"],Zt={key:0,class:"indicator-labeli"},jt={key:0},qt={key:1},Yt={key:1,class:"indicator-progressi"},zt=o("span",{class:"spinner-border spinner-border-sm align-middle ms-2"},null,-1),Gt={key:1,class:"mt-n8"},Kt={class:"text-center mb-8"},Wt={class:"text-capitalize"},Jt={class:"text-info"},Qt=["placeholder"],Xt={class:"d-flex gap-3"},en={key:0},tn=o("span",{class:"spinner-border spinner-border-sm"},null,-1),nn={key:1},xn=Y({__name:"transfer",setup(e){const t=D({skrill:"Skrill",others:"Others",bancopt:"Bancopt",paypal:"Paypal"}),n=D({inputValue:"",verifying:!1,active:"exchange",bill:!1,cot:{verified:!1,text:""},imf:{verified:!1,text:""},tax:{verified:!1,text:""}}),i=De(),r=i.data,a=D(),s=D(),l=X().settings,u=i.account,m=j(),d=D(!1),f=Ce().transferBank,y={id:void 0,senderId:"",receiverId:void 0,amount:0,type:M.WITHDRAWAL,notes:void 0,beneficiary:{id:void 0,userId:"",name:"",destinationAccount:"",bank:""},transactionId:void 0,status:void 0,createdAt:void 0},g=V("transaction-form",()=>y),w=D({amount:""}),S=D(!1),re=[{num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:"."},{num:0}],N=D(!1),ae=D({id:"",name:"",email:""}),B=V("transfer-recipient",()=>ae.value),z=V("transfer-recipient-found",()=>""),oe=()=>{i.reloadUser(),n.value.verifying=!0,console.log(r.value),setTimeout(()=>{if(n.value.verifying=!1,n.value.cot.verified)if(n.value.imf.verified){if(!n.value.tax.verified)if(r.value.tax==n.value.inputValue)n.value.tax.verified=!0,n.value.inputValue="",he();else return T("Invalid tax code")}else if(r.value.imf==n.value.inputValue)n.value.imf.verified=!0,n.value.active="tax",n.value.inputValue="";else return T("Invalid IMF code");else if(r.value.cot==n.value.inputValue)n.value.cot.verified=!0,n.value.active="imf",n.value.inputValue="";else return T("Invalid exchange code")},4e3)},U=k=>{f.value=k},se=k=>{const p=w.value.amount+k;w.value.amount=p,s.value.setRawValue(p)},G=async()=>{N.value&&(await new Promise(k=>setTimeout(k,160)),console.log("Del"),w.value.amount=w.value.amount.slice(0,-1),s.value.setRawValue(w.value.amount),requestAnimationFrame(G))},le=()=>{N.value=!1},ce=()=>{N.value=!0,G()},de=k=>{const p=a.value.value.replace(/[a-zA-Z]/g,"");if(p.includes(".")){const F=p.split(".");w.value.amount=F[0]+"."+F[1].slice(0,2),console.log(w.value.amount)}},K=()=>{S.value=!1,d.value=!1};function ue(k){for(const p in k)if(p!=="id"&&p!=="userId"&&!k[p])return!0;return!1}const me=()=>f.value==t.value.bancopt&&!z.value?!0:f.value?!1:ue(g.value.beneficiary),fe=()=>{g.value.amount=Number(w.value.amount),f.value!==t.value.others?(g.value.type=f.value==t.value.bancopt?M.SEND:M.DEBIT,console.log("Bank",f.value),f.value==t.value.bancopt&&(g.value.receiverId=B.value.id,g.value.beneficiary.userId=B.value.id),g.value.beneficiary.bank=f.value,g.value.beneficiary.destinationAccount=B.value.email,g.value.beneficiary.name=B.value.name):g.value.type=M.DEBIT},pe=()=>{if(Number(w.value.amount)<=0){T("Amount must be greater than zero!");return}if(!u.value.amount||Number(w.value.amount)>u.value.amount){T("Insufficient balance!");return}if(!d.value){d.value=!0;return}if(!n.value.cot.verified||!n.value.imf.verified||!n.value.tax.verified){n.value.bill=!0;return}},he=()=>{var F;fe(),g.value.senderId=i.data.value.id,S.value=!0,console.log("Transaction",g.value);const k=Fe(g.value);console.log("Valid data",k);const p={method:"post",data:k,url:`${m.public.BE_API}/transactions`,timeout:15e3,headers:{Authorization:"Bearer "+((F=Q().userData.value)==null?void 0:F.token)}};ee.request(p).then(L=>{i.reloadUser(),L.data,Ie("Transaction successful"),w.value.amount="0",s.value.setRawValue(0),B.value.name="",z.value=!1,g.value=y,K(),n.value.bill=!1,n.value.active="exchange"}).catch(L=>{console.log(L),L.response.data,T("Transaction error. Contact support to clear issues in your account.")}).finally(()=>{S.value=!1})};return we(()=>{i.reloadUser();let k=".",p=",";l.value.defaultBaseCurrency!=="USD"&&(k=",",p="."),console.log(r.value);try{s.value=new xt(a.value,{numeral:!0,numeralThousandsGroupStyle:"thousand",numeralDecimalMark:k,delimiter:p,numeralDecimalScale:2})}catch{}}),(k,p)=>{const F=be,L=qe,ge=dt,ve=Se;return b(),x("div",wt,[kt,o("div",_t,[c(n).bill?(b(),x("div",Gt,[o("div",Kt,[o("h1",Wt,C(c(n).active)+" Code Verification ",1),o("span",Jt," Enter "+C(c(n).active)+" code to facilitate transfer of funds ",1)]),o("div",null,[E(o("input",{class:"form-control mb-3",type:"text",placeholder:`Enter ${c(n).active} code`,"onUpdate:modelValue":p[7]||(p[7]=_=>c(n).inputValue=_)},null,8,Qt),[[R,c(n).inputValue]]),o("div",Xt,[o("button",{class:"btn btn-light-danger",onClick:p[8]||(p[8]=_=>c(n).bill=!1)}," Cancel "),o("button",{onClick:p[9]||(p[9]=_=>oe()),class:"btn btn-primary w-100"},[c(n).verifying?(b(),x("span",en,[tn,I(" verifying... ")])):(b(),x("span",nn," Continue transfer "))])])])])):(b(),x("form",{key:0,onSubmit:p[6]||(p[6]=ke(_=>pe(),["prevent"])),class:"px-5 px-md-0 px-xl-15"},[o("div",Dt,[o("input",{disabled:c(d),ref_key:"moneyInput",ref:a,onKeydown:p[0]||(p[0]=_=>de()),type:"text",placeholder:"0",class:"form-control disabled money-input fs-2 form-control-lg text-center fw-bold form-control-solid"},null,40,St)]),c(d)?(b(),x("div",Ct,[o("div",It,[o("button",{onClick:p[1]||(p[1]=_=>U(c(t).bancopt)),class:$([c(f)===c(t).bancopt?"active":"","btn px-0 w-100 btn-light-info fw-semibold d-flex flex-center"]),type:"button"},[W(F,{class:"d-inline",classes:"w-25px me-2"}),I(" "+C(k.$config.public.APP),1)],2),o("button",{onClick:p[2]||(p[2]=_=>U(c(t).others)),class:$([c(f)===c(t).others?"active":"","btn w-75 h-100 btn-light-info fw-semibold"]),type:"button"},[Ft,I(" Banks ")],2)]),o("div",Pt,[o("button",{onClick:p[3]||(p[3]=_=>U(c(t).paypal)),class:$([c(f)===c(t).paypal?"active":"","btn px-0 w-100 btn-light-info fw-semibold"]),type:"button"},[Vt,I(" Paypal ")],2),o("button",{onClick:p[4]||(p[4]=_=>U(c(t).skrill)),class:$([c(f)===c(t).skrill?"active":"","btn w-75 h-100 btn-light-info fw-semibold"]),type:"button"},[Lt,I(" Skrill ")],2)]),c(f)==c(t).others?(b(),J(L,{key:0})):(b(),J(ge,{key:1,amount:c(w).amount},null,8,["amount"]))])):(b(),x("div",Tt,[o("div",$t,[At,W(ve,{to:"/app/scan",class:"btn btn-sm btn-light-warning fw-semibold me-2"},{default:_e(()=>[Bt,I(" Scan ")]),_:1})]),o("div",Mt,[(b(),x(H,null,Z(re,_=>o("div",Et,[o("button",{type:"button",onClick:rn=>se(_.num),class:"btn btn-active-light-primary p-0 btn-icon fw-bold fs-2"},C(_.num),9,Rt)])),64)),o("div",Ut,[o("button",{type:"button",onMouseup:le,onMousedown:ce,class:"btn btn-active-light-danger btn-icon-danger btn-icon fw-bold fs-2"},Nt,32)])])])),o("div",{class:$([c(d)?"d-flex flex-row":"","mt-4"])},[c(d)?(b(),x("button",{key:0,onClick:p[5]||(p[5]=_=>K()),class:"btn btn-light-primary me-3"}," Back ")):O("",!0),o("button",{disabled:c(d)&&me(),type:"submit",class:"btn btn-primary btn-icon fw-bold fs-2 w-100"},[c(S)?(b(),x("span",Yt,[I(" Please wait... "),zt])):(b(),x("span",Zt,[c(d)?(b(),x("span",jt,"Transfer")):(b(),x("span",qt,"Next"))]))],8,Ht)],2)],32))])])}}});export{xn as default};