(()=>{var e={681:function(e){e.exports=function(e){function t(s){if(n[s])return n[s].exports;var a=n[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,s){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:s})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,n){"use strict";(function(e){var n,s,a,i,r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};i=function(){return function(e){function t(s){if(n[s])return n[s].exports;var a=n[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,s){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:s})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?function(e){return void 0===e?"undefined":r(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":r(e)},a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},i="top",o={alertTime:3,dateMonths:["January","February","March","April","May","June","July","August","September","October","November","December"],overlayClickDismiss:!0,overlayOpacity:.75,transitionCurve:"ease",transitionDuration:.3,transitionSelector:"all",classes:{container:"notie-container",textbox:"notie-textbox",textboxInner:"notie-textbox-inner",button:"notie-button",element:"notie-element",elementHalf:"notie-element-half",elementThird:"notie-element-third",overlay:"notie-overlay",backgroundSuccess:"notie-background-success",backgroundWarning:"notie-background-warning",backgroundError:"notie-background-error",backgroundInfo:"notie-background-info",backgroundNeutral:"notie-background-neutral",backgroundOverlay:"notie-background-overlay",alert:"notie-alert",inputField:"notie-input-field",selectChoiceRepeated:"notie-select-choice-repeated",dateSelectorInner:"notie-date-selector-inner",dateSelectorUp:"notie-date-selector-up"},ids:{overlay:"notie-overlay"},positions:{alert:i,force:i,confirm:i,input:i,select:"bottom",date:i}},c=t.setOptions=function(e){o=a({},o,e,{classes:a({},o.classes,e.classes),ids:a({},o.ids,e.ids),positions:a({},o.positions,e.positions)})},l=function(){return new Promise((function(e){return setTimeout(e,0)}))},d=function(e){return new Promise((function(t){return setTimeout(t,1e3*e)}))},u=function(){document.activeElement&&document.activeElement.blur()},p=function(){return"notie-"+"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))},m={1:o.classes.backgroundSuccess,success:o.classes.backgroundSuccess,2:o.classes.backgroundWarning,warning:o.classes.backgroundWarning,3:o.classes.backgroundError,error:o.classes.backgroundError,4:o.classes.backgroundInfo,info:o.classes.backgroundInfo,5:o.classes.backgroundNeutral,neutral:o.classes.backgroundNeutral},b=function(){return o.transitionSelector+" "+o.transitionDuration+"s "+o.transitionCurve},f=function(e){return 13===e.keyCode},v=function(e){return 27===e.keyCode},x=function(e,t){e.classList.add(o.classes.container),e.style[t]="-10000px",document.body.appendChild(e),e.style[t]="-"+e.offsetHeight+"px",e.listener&&window.addEventListener("keydown",e.listener),l().then((function(){e.style.transition=b(),e.style[t]=0}))},h=function(e,t){var n=document.getElementById(e);n&&(n.style[t]="-"+n.offsetHeight+"px",n.listener&&window.removeEventListener("keydown",n.listener),d(o.transitionDuration).then((function(){n.parentNode&&n.parentNode.removeChild(n)})))},y=function(e,t){var n=document.createElement("div");n.id=o.ids.overlay,n.classList.add(o.classes.overlay),n.classList.add(o.classes.backgroundOverlay),n.style.opacity=0,e&&o.overlayClickDismiss&&(n.onclick=function(){h(e.id,t),g()}),document.body.appendChild(n),l().then((function(){n.style.transition=b(),n.style.opacity=o.overlayOpacity}))},g=function(){var e=document.getElementById(o.ids.overlay);e.style.opacity=0,d(o.transitionDuration).then((function(){e.parentNode&&e.parentNode.removeChild(e)}))},L=t.hideAlerts=function(e){var t=document.getElementsByClassName(o.classes.alert);if(t.length){for(var n=0;n<t.length;n++){var s=t[n];h(s.id,s.position)}e&&d(o.transitionDuration).then((function(){return e()}))}},A=t.alert=function(e){var t=e.type,n=void 0===t?4:t,s=e.text,a=e.time,i=void 0===a?o.alertTime:a,r=e.stay,c=void 0!==r&&r,l=e.position,b=void 0===l?o.positions.alert||b.top:l;u(),L();var y=document.createElement("div"),g=p();y.id=g,y.position=b,y.classList.add(o.classes.textbox),y.classList.add(m[n]),y.classList.add(o.classes.alert),y.innerHTML='<div class="'+o.classes.textboxInner+'">'+s+"</div>",y.onclick=function(){return h(g,b)},y.listener=function(e){(f(e)||v(e))&&L()},x(y,b),i&&i<1&&(i=1),!c&&i&&d(i).then((function(){return h(g,b)}))},k=t.force=function(e,t){var n=e.type,s=void 0===n?5:n,a=e.text,i=e.buttonText,r=void 0===i?"OK":i,c=e.callback,l=e.position,d=void 0===l?o.positions.force||d.top:l;u(),L();var b=document.createElement("div"),v=p();b.id=v;var A=document.createElement("div");A.classList.add(o.classes.textbox),A.classList.add(o.classes.backgroundInfo),A.innerHTML='<div class="'+o.classes.textboxInner+'">'+a+"</div>";var k=document.createElement("div");k.classList.add(o.classes.button),k.classList.add(m[s]),k.innerHTML=r,k.onclick=function(){h(v,d),g(),c?c():t&&t()},b.appendChild(A),b.appendChild(k),b.listener=function(e){f(e)&&k.click()},x(b,d),y()},C=t.confirm=function(e,t,n){var s=e.text,a=e.submitText,i=void 0===a?"Yes":a,r=e.cancelText,c=void 0===r?"Cancel":r,l=e.submitCallback,d=e.cancelCallback,m=e.position,b=void 0===m?o.positions.confirm||b.top:m;u(),L();var A=document.createElement("div"),k=p();A.id=k;var C=document.createElement("div");C.classList.add(o.classes.textbox),C.classList.add(o.classes.backgroundInfo),C.innerHTML='<div class="'+o.classes.textboxInner+'">'+s+"</div>";var E=document.createElement("div");E.classList.add(o.classes.button),E.classList.add(o.classes.elementHalf),E.classList.add(o.classes.backgroundSuccess),E.innerHTML=i,E.onclick=function(){h(k,b),g(),l?l():t&&t()};var T=document.createElement("div");T.classList.add(o.classes.button),T.classList.add(o.classes.elementHalf),T.classList.add(o.classes.backgroundError),T.innerHTML=c,T.onclick=function(){h(k,b),g(),d?d():n&&n()},A.appendChild(C),A.appendChild(E),A.appendChild(T),A.listener=function(e){f(e)?E.click():v(e)&&T.click()},x(A,b),y(A,b)},E=function(e,t,n){var a=e.text,i=e.submitText,r=void 0===i?"Submit":i,c=e.cancelText,l=void 0===c?"Cancel":c,d=e.submitCallback,m=e.cancelCallback,b=e.position,A=void 0===b?o.positions.input||A.top:b,k=function(e,t){var n={};for(var s in e)t.indexOf(s)>=0||Object.prototype.hasOwnProperty.call(e,s)&&(n[s]=e[s]);return n}(e,["text","submitText","cancelText","submitCallback","cancelCallback","position"]);u(),L();var C=document.createElement("div"),E=p();C.id=E;var T=document.createElement("div");T.classList.add(o.classes.textbox),T.classList.add(o.classes.backgroundInfo),T.innerHTML='<div class="'+o.classes.textboxInner+'">'+a+"</div>";var w=document.createElement("input");w.classList.add(o.classes.inputField),w.setAttribute("autocapitalize",k.autocapitalize||"none"),w.setAttribute("autocomplete",k.autocomplete||"off"),w.setAttribute("autocorrect",k.autocorrect||"off"),w.setAttribute("autofocus",k.autofocus||"true"),w.setAttribute("inputmode",k.inputmode||"verbatim"),w.setAttribute("max",k.max||""),w.setAttribute("maxlength",k.maxlength||""),w.setAttribute("min",k.min||""),w.setAttribute("minlength",k.minlength||""),w.setAttribute("placeholder",k.placeholder||""),w.setAttribute("spellcheck",k.spellcheck||"default"),w.setAttribute("step",k.step||"any"),w.setAttribute("type",k.type||"text"),w.value=k.value||"",k.allowed&&(w.oninput=function(){var e=void 0;if(Array.isArray(k.allowed)){for(var t="",n=k.allowed,a=0;a<n.length;a++)"an"===n[a]?t+="0-9a-zA-Z":"a"===n[a]?t+="a-zA-Z":"n"===n[a]&&(t+="0-9"),"s"===n[a]&&(t+=" ");e=new RegExp("[^"+t+"]","g")}else"object"===s(k.allowed)&&(e=k.allowed);w.value=w.value.replace(e,"")});var S=document.createElement("div");S.classList.add(o.classes.button),S.classList.add(o.classes.elementHalf),S.classList.add(o.classes.backgroundSuccess),S.innerHTML=r,S.onclick=function(){h(E,A),g(),d?d(w.value):t&&t(w.value)};var M=document.createElement("div");M.classList.add(o.classes.button),M.classList.add(o.classes.elementHalf),M.classList.add(o.classes.backgroundError),M.innerHTML=l,M.onclick=function(){h(E,A),g(),m?m(w.value):n&&n(w.value)},C.appendChild(T),C.appendChild(w),C.appendChild(S),C.appendChild(M),C.listener=function(e){f(e)?S.click():v(e)&&M.click()},x(C,A),w.focus(),y(C,A)};t.input=E;var T=t.select=function(e,t){var n=e.text,s=e.cancelText,a=void 0===s?"Cancel":s,i=e.cancelCallback,r=e.choices,c=e.position,l=void 0===c?o.positions.select||l.top:c;u(),L();var d=document.createElement("div"),b=p();d.id=b;var f=document.createElement("div");f.classList.add(o.classes.textbox),f.classList.add(o.classes.backgroundInfo),f.innerHTML='<div class="'+o.classes.textboxInner+'">'+n+"</div>",d.appendChild(f),r.forEach((function(e,t){var n=e.type,s=void 0===n?1:n,a=e.text,i=e.handler,c=document.createElement("div");c.classList.add(m[s]),c.classList.add(o.classes.button),c.classList.add(o.classes.selectChoice);var u=r[t+1];u&&!u.type&&(u.type=1),u&&u.type===s&&c.classList.add(o.classes.selectChoiceRepeated),c.innerHTML=a,c.onclick=function(){h(b,l),g(),i()},d.appendChild(c)}));var A=document.createElement("div");A.classList.add(o.classes.backgroundNeutral),A.classList.add(o.classes.button),A.innerHTML=a,A.onclick=function(){h(b,l),g(),i?i():t&&t()},d.appendChild(A),d.listener=function(e){v(e)&&A.click()},x(d,l),y(d,l)},w=t.date=function(e,t,n){var s=e.value,a=void 0===s?new Date:s,i=e.submitText,r=void 0===i?"OK":i,c=e.cancelText,l=void 0===c?"Cancel":c,d=e.submitCallback,m=e.cancelCallback,b=e.position,A=void 0===b?o.positions.date||A.top:b;u(),L();var k="&#9662",C=document.createElement("div"),E=document.createElement("div"),T=document.createElement("div"),w=function(e){C.innerHTML=o.dateMonths[e.getMonth()],E.innerHTML=e.getDate(),T.innerHTML=e.getFullYear()},S=function(e){w(a)},M=function(e){var t=new Date(a.getFullYear(),a.getMonth()+e+1,0).getDate();a.getDate()>t&&a.setDate(t),a.setMonth(a.getMonth()+e),w(a)},_=function(e){a.setDate(a.getDate()+e),w(a)},O=function(e){a.getFullYear()+e<0?a.setFullYear(0):a.setFullYear(a.getFullYear()+e),w(a)},H=document.createElement("div"),I=p();H.id=I;var N=document.createElement("div");N.classList.add(o.classes.backgroundInfo);var D=document.createElement("div");D.classList.add(o.classes.dateSelectorInner);var j=document.createElement("div");j.classList.add(o.classes.button),j.classList.add(o.classes.elementThird),j.classList.add(o.classes.dateSelectorUp),j.innerHTML=k;var P=document.createElement("div");P.classList.add(o.classes.button),P.classList.add(o.classes.elementThird),P.classList.add(o.classes.dateSelectorUp),P.innerHTML=k;var F=document.createElement("div");F.classList.add(o.classes.button),F.classList.add(o.classes.elementThird),F.classList.add(o.classes.dateSelectorUp),F.innerHTML=k,C.classList.add(o.classes.element),C.classList.add(o.classes.elementThird),C.innerHTML=o.dateMonths[a.getMonth()],E.classList.add(o.classes.element),E.classList.add(o.classes.elementThird),E.setAttribute("contentEditable",!0),E.addEventListener("input",(function(e){var t=new Date(a.getFullYear(),a.getMonth()+1,0).getDate(),n=e.target.textContent.replace(/^0+/,"").replace(/[^\d]/g,"").slice(0,2);Number(n)>t&&(n=t.toString()),e.target.textContent=n,Number(n)<1&&(n="1"),a.setDate(Number(n))})),E.addEventListener("blur",S),E.innerHTML=a.getDate(),T.classList.add(o.classes.element),T.classList.add(o.classes.elementThird),T.setAttribute("contentEditable",!0),T.addEventListener("input",(function(e){var t=e.target.textContent.replace(/^0+/,"").replace(/[^\d]/g,"").slice(0,4);e.target.textContent=t,a.setFullYear(Number(t))})),T.addEventListener("blur",S),T.innerHTML=a.getFullYear();var z=document.createElement("div");z.classList.add(o.classes.button),z.classList.add(o.classes.elementThird),z.innerHTML=k;var Y=document.createElement("div");Y.classList.add(o.classes.button),Y.classList.add(o.classes.elementThird),Y.innerHTML=k;var B=document.createElement("div");B.classList.add(o.classes.button),B.classList.add(o.classes.elementThird),B.innerHTML=k,j.onclick=function(){return M(1)},P.onclick=function(){return _(1)},F.onclick=function(){return O(1)},z.onclick=function(){return M(-1)},Y.onclick=function(){return _(-1)},B.onclick=function(){return O(-1)};var U=document.createElement("div");U.classList.add(o.classes.button),U.classList.add(o.classes.elementHalf),U.classList.add(o.classes.backgroundSuccess),U.innerHTML=r,U.onclick=function(){h(I,A),g(),d?d(a):t&&t(a)};var R=document.createElement("div");R.classList.add(o.classes.button),R.classList.add(o.classes.elementHalf),R.classList.add(o.classes.backgroundError),R.innerHTML=l,R.onclick=function(){h(I,A),g(),m?m(a):n&&n(a)},D.appendChild(j),D.appendChild(P),D.appendChild(F),D.appendChild(C),D.appendChild(E),D.appendChild(T),D.appendChild(z),D.appendChild(Y),D.appendChild(B),N.appendChild(D),H.appendChild(N),H.appendChild(U),H.appendChild(R),H.listener=function(e){f(e)?U.click():v(e)&&R.click()},x(H,A),y(H,A)};t.default={alert:A,force:k,confirm:C,input:E,select:T,date:w,setOptions:c,hideAlerts:L}}])},"object"===r(t)&&"object"===r(e)?e.exports=i():(s=[],void 0===(a="function"==typeof(n=i)?n.apply(t,s):n)||(e.exports=a))}).call(t,n(0)(e))}])}},t={};function n(s){if(t[s])return t[s].exports;var a=t[s]={exports:{}};return e[s].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(681),t=n.n(e);console.log("%c Welcome to SlimLine webpages ! ","color: #303030; font-family:monospace; background-color:#009933; font-size: 14px; font-weight:bold;"),window.location.pathname.split("/")[2].split(".")[0],function(){for(var e=document.getElementById("nav").getElementsByTagName("a"),t=window.location.pathname.split("/")[2],n=0;n<e.length;n++)e[n].getAttribute("href",2)==t&&(e[n].className="is-active")}(),document.addEventListener("DOMContentLoaded",function(){const e=Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"),0);e.length>0&&e.forEach((e=>{e.addEventListener("click",(()=>{const t=e.dataset.target,n=document.getElementById(t);e.classList.toggle("is-active"),n.classList.toggle("is-active")}))}))}()),console.log("%cElsist SRL - Hello ! You can debug comunication by setting 'debug_mode=true;'","background: #009933; color: #fff; padding: 5px 5px; font-weight: bold;");var s,a=[];const i="http://www.w3.org/2000/svg",r=document.getElementById("io_map");var o=!1,c=[],l=!1;const d="#ff0000",u="#6d6d6d";function p(e){if(1==o)return;o=!0;const n=new XMLHttpRequest;null!=n&&(n.open("GET",e,!0),n.setRequestHeader("Content-Type","text/plain;charset=UTF-8"),n.onreadystatechange=function(){!function(e,n){if(4==e){if(o=!1,!(n=function(e){try{var t=JSON.parse(e);if(t&&"object"==typeof t)return t}catch(e){}return!1}(n)))return clearInterval(window._els_interval),void t().alert({type:"error",stay:!0,text:"Response is not JSON ! Please reload the page.",position:"top"});if(console.log(n),0!=n.OSID_PLC_STATUS){var d=0;if(n.OSID_PLC_NAME_ALL.forEach((function(e,t){if(""!=e){a[d]={},a[d].code=e,a[d].do=n.OSID_PLC_DO_ALL[t],a[d].di=n.OSID_PLC_DI_ALL[t],a[d].address=t.toString().toUpperCase().padStart(2,0),a[d].max_di=32,a[d].max_do=32;for(let e=0;e<s.length;e++)a[d].code.match(s[e].regex)&&(a[d].max_di=s[e].input,a[d].max_do=s[e].output);d++}})),a.splice(0,0,a.pop()),a[0].address="CPU",0==Object.keys(c).length)for(var u in a)b(a[u]);else for(var u in a)m(a[u])}else!function(){if(0!=c.lenght){r.innerHTML="",l=!0,c=[];var e=document.createElementNS(i,"text");e.setAttribute("x",10),e.setAttribute("y",10),e.setAttribute("dominant-baseline","hanging"),e.setAttribute("text-anchor","start"),e.setAttribute("style","font-size: 16px; font-weight: bold;"),e.textContent="SYSTEM IS NOT RUNNING",r.appendChild(e)}}()}}(n.readyState,n.responseText)},n.send(null))}function m(e){for(var t=0;t<e.max_di;t++){var n=document.getElementById(e.address+"_inputled_"+t);0!=(e.di&Math.pow(2,t))?n.setAttribute("fill",d):n.setAttribute("fill",u)}for(t=0;t<e.max_do;t++)n=document.getElementById(e.address+"_outputled_"+t),0!=(e.do&Math.pow(2,t))?n.setAttribute("fill",d):n.setAttribute("fill",u)}function b(e){var t=document.createElementNS("http://www.w3.org/2000/svg","g");1==l&&(r.innerHTML="",l=!1);var n=80*Object.keys(c).length,s=22*Math.max(e.max_di,e.max_do)+20+15+15+15+10,a=document.createElementNS(i,"rect");a.setAttribute("x",n),a.setAttribute("y","0"),a.setAttribute("width",62),a.setAttribute("height",s),a.setAttribute("fill","#cdd1d3"),t.appendChild(a),c.push(a);var o=document.createElementNS(i,"text");o.setAttribute("x",n+31),o.setAttribute("y",20),o.setAttribute("dominant-baseline","central"),o.setAttribute("text-anchor","middle"),o.setAttribute("style","font-size: 10px; font-weight: bold;"),o.textContent=e.address,t.appendChild(o);var p=document.createElementNS(i,"text");p.setAttribute("x",n+31),p.setAttribute("y",35),p.setAttribute("dominant-baseline","central"),p.setAttribute("text-anchor","middle"),p.setAttribute("style","font-size: 10px;"),p.textContent=e.code,t.appendChild(p);var m=document.createElementNS(i,"text");m.setAttribute("x",20+n),m.setAttribute("y",50),m.setAttribute("dominant-baseline","central"),m.setAttribute("text-anchor","middle"),m.setAttribute("style","font-size: 10px;"),m.textContent="I",t.appendChild(m);var b=document.createElementNS(i,"text");b.setAttribute("x",20+n+2+20),b.setAttribute("y",50),b.setAttribute("dominant-baseline","central"),b.setAttribute("text-anchor","middle"),b.setAttribute("style","font-size: 10px;"),b.textContent="O",t.appendChild(b);for(var f=0,v=65;f<e.max_di;f++,v=v+20+2){var x=document.createElementNS(i,"rect");x.setAttribute("id",e.address+"_inputled_"+f),x.setAttribute("x",10+n),x.setAttribute("y",v),x.setAttribute("width",20),x.setAttribute("height",20),0!=(e.di&Math.pow(2,f))?x.setAttribute("fill",d):x.setAttribute("fill",u),t.appendChild(x),(h=document.createElementNS(i,"text")).setAttribute("x",10+n+10),h.setAttribute("y",v+10),h.setAttribute("dominant-baseline","central"),h.setAttribute("text-anchor","middle"),h.setAttribute("style","font-size: 10px;"),h.textContent=f,t.appendChild(h)}for(f=0,v=65;f<e.max_do;f++,v=v+20+2){var h,y=document.createElementNS(i,"rect");y.setAttribute("id",e.address+"_outputled_"+f),y.setAttribute("x",32+n),y.setAttribute("y",v),y.setAttribute("width",20),y.setAttribute("height",20),0!=(e.do&Math.pow(2,f))?y.setAttribute("fill",d):y.setAttribute("fill",u),t.appendChild(y),(h=document.createElementNS(i,"text")).setAttribute("x",32+n+10),h.setAttribute("y",v+10),h.setAttribute("dominant-baseline","central"),h.setAttribute("text-anchor","middle"),h.setAttribute("style","font-size: 10px;"),h.textContent=f,t.appendChild(h)}r.appendChild(t)}!async function(){if(0==(s=await async function(e){return fetch("../variables.json").then((e=>e.json())).then((t=>!!t.hasOwnProperty(e)&&t[e])).catch((e=>!1))}("cards")))throw t().alert({type:"error",stay:!0,text:"Error in variables.json file !",position:"top"}),new Error("Error in variables.json file !");p("IOStatus.htm"),window._els_interval=setInterval((function(){p("IOStatus.htm")}),2e3)}()})()})();