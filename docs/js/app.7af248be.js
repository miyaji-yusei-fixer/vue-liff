(function(){"use strict";var e={1273:function(e,n,t){var r=t(5130),u=t(6768),i=t(4232);function o(e,n,t,r,o,a){return(0,u.uX)(),(0,u.CE)(u.FK,null,[(0,u.eW)((0,i.v_)(e.displayMessage)+" ",1),n[0]||(n[0]=(0,u.Lk)("br",null,null,-1)),(0,u.eW)(" "+(0,i.v_)(e.closedMessage),1)],64)}var a=t(144),l=t(880),f=(0,u.pM)({name:"App",setup(){const e=(0,a.KR)(""),n=(0,a.KR)(""),t=(0,a.KR)("NOT_INITIALIZED"),r=(0,a.Kh)({profile:void 0}),i=5e3,o=(0,a.KR)(null),f=(0,a.KR)(i/1e3),c=async()=>{const n="1655312817-d3zPmnkj";if(t.value=await l.A.isInClient(),t.value)try{e.value=`LIFF ID：${n}`,await l.A.init({liffId:n});const t=await l.A.getProfile();r.profile=t,e.value=r.profile.userId,l.A.scanCodeV2()}catch{e.value="エラーが発生しました。"}else e.value="LIFF IDが設定されていないか、LINEブラウザで開かれていません"},s=()=>{n.value=`${f.value}秒後にブラウザを閉じます`,o.value=setInterval((()=>{f.value-=1,f.value<=0?(clearInterval(o.value),l.A.closeWindow()):n.value=`${f.value}秒後にブラウザを閉じます`}),1e3)};return(0,u.sV)((async()=>{await c(),await s()})),{displayMessage:e,closedMessage:n,liffState:r,isInClient:t}}}),c=t(1241);const s=(0,c.A)(f,[["render",o]]);var v=s;(0,r.Ef)(v).mount("#app")}},n={};function t(r){var u=n[r];if(void 0!==u)return u.exports;var i=n[r]={exports:{}};return e[r].call(i.exports,i,i.exports,t),i.exports}t.m=e,function(){var e=[];t.O=function(n,r,u,i){if(!r){var o=1/0;for(c=0;c<e.length;c++){r=e[c][0],u=e[c][1],i=e[c][2];for(var a=!0,l=0;l<r.length;l++)(!1&i||o>=i)&&Object.keys(t.O).every((function(e){return t.O[e](r[l])}))?r.splice(l--,1):(a=!1,i<o&&(o=i));if(a){e.splice(c--,1);var f=u();void 0!==f&&(n=f)}}return n}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[r,u,i]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={524:0};t.O.j=function(n){return 0===e[n]};var n=function(n,r){var u,i,o=r[0],a=r[1],l=r[2],f=0;if(o.some((function(n){return 0!==e[n]}))){for(u in a)t.o(a,u)&&(t.m[u]=a[u]);if(l)var c=l(t)}for(n&&n(r);f<o.length;f++)i=o[f],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(c)},r=self["webpackChunkvue_liff"]=self["webpackChunkvue_liff"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[504],(function(){return t(1273)}));r=t.O(r)})();
//# sourceMappingURL=app.7af248be.js.map