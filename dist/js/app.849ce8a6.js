(function(t){function e(e){for(var a,r,u=e[0],s=e[1],c=e[2],l=0,m=[];l<u.length;l++)r=u[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&m.push(o[r][0]),o[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);d&&d(e);while(m.length)m.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,r=1;r<n.length;r++){var u=n[r];0!==o[u]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},o={app:0},i=[];function u(t){return s.p+"js/"+({}[t]||t)+"."+{"chunk-2d0aa1ba":"39ce7998","chunk-2d21b4a8":"e41def44","chunk-2d226945":"af1585eb","chunk-7095db74":"a9c8aef4","chunk-a3d27ac4":"716f28d1","chunk-c5b24f8a":"4c1e307e"}[t]+".js"}function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n={"chunk-7095db74":1,"chunk-a3d27ac4":1,"chunk-c5b24f8a":1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=new Promise((function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-2d0aa1ba":"31d6cfe0","chunk-2d21b4a8":"31d6cfe0","chunk-2d226945":"31d6cfe0","chunk-7095db74":"e02f4e16","chunk-a3d27ac4":"fedbb15b","chunk-c5b24f8a":"c8feb101"}[t]+".css",o=s.p+a,i=document.getElementsByTagName("link"),u=0;u<i.length;u++){var c=i[u],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===a||l===o))return e()}var m=document.getElementsByTagName("style");for(u=0;u<m.length;u++){c=m[u],l=c.getAttribute("data-href");if(l===a||l===o)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var a=e&&e.target&&e.target.src||o,i=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[t],d.parentNode.removeChild(d),n(i)},d.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(d)})).then((function(){r[t]=0})));var a=o[t];if(0!==a)if(a)e.push(a[2]);else{var i=new Promise((function(e,n){a=o[t]=[e,n]}));e.push(a[2]=i);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=u(t);var m=new Error;c=function(e){l.onerror=l.onload=null,clearTimeout(d);var n=o[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;m.message="Loading chunk "+t+" failed.\n("+a+": "+r+")",m.name="ChunkLoadError",m.type=a,m.request=r,n[1](m)}o[t]=void 0}};var d=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(e)},s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var m=0;m<c.length;m++)e(c[m]);var d=l;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("8b5d")},"56d7":function(t,e,n){"use strict";n.r(e);n("e623"),n("e379"),n("5dc8"),n("37e1");var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{attrs:{id:"app"}},[n("b-loading",{attrs:{"is-full-page":!0,"can-cancel":!1},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}}),n("Navigation"),n("div",{staticClass:"container"},[n("div",{staticClass:"columns"},[n("transition",{attrs:{appear:"",name:"fade",mode:"out-in"}},[n("router-view",{key:t.$route.fullPath})],1)],1)])],1)},o=[],i=n("5530"),u=n("2f62"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return!t.loading&&t.user&&t.currentCampaign?n("b-navbar",{attrs:{transparent:""}},[n("template",{slot:"brand"},[n("b-navbar-item",{attrs:{tag:"router-link",to:{name:"Home"}}},[n("img",{attrs:{src:"/images/lantern.png",alt:"Kingdom Death Management"}})])],1),n("template",{slot:"start"},[n("b-navbar-item",{attrs:{tag:"router-link",to:{name:"Settlement"}}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"landmark"}}),t._v(" Settlement ")],1),n("b-navbar-item",{attrs:{tag:"router-link",to:{name:"Timeline"}}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"stream"}}),t._v(" Timeline ")],1),n("b-navbar-item",{attrs:{tag:"router-link",to:{name:"Survivors"}}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"user-injured"}}),t._v(" Survivors ")],1),n("b-navbar-item",{attrs:{tag:"router-link",to:{name:"Storage"}}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"box-open"}}),t._v(" Storage ")],1),n("b-navbar-item",{attrs:{tag:"router-link",to:{name:"Innovations"}}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"book"}}),t._v(" Innovations ")],1)],1),n("template",{slot:"end"},[n("b-navbar-item",{attrs:{tag:"div"}},[n("div",{staticClass:"buttons"},[n("b-button",{attrs:{type:"is-danger is-light"},on:{click:function(e){return e.preventDefault(),t.logout(e)}}},[t._v("Logout")])],1)])],1),n("div",{staticClass:"navbar-menu",attrs:{id:"navbarExampleTransparentExample"}},[n("div",{staticClass:"navbar-start"},[n("b-button",{staticClass:"navbar-item",attrs:{tag:"router-link",to:{name:"Settlement"},"icon-left":"landmark"}},[t._v("Settlement")]),n("b-button",{staticClass:"navbar-item",attrs:{tag:"router-link",to:{name:"Timeline"},"icon-left":"stream"}},[t._v("Timeline")]),n("b-button",{staticClass:"navbar-item",attrs:{tag:"router-link",to:{name:"Survivors"},"icon-left":"user-injured"}},[t._v("Survivors")]),n("b-button",{staticClass:"navbar-item",attrs:{tag:"router-link",to:{name:"Storage"},"icon-left":"box-open"}},[t._v("Storage")]),n("b-button",{staticClass:"navbar-item",attrs:{tag:"router-link",to:{name:"Innovations"},"icon-left":"book"}},[t._v("Innovations")])],1),n("div",{staticClass:"navbar-end"},[n("a",{staticClass:"navbar-item",on:{click:function(e){return e.preventDefault(),t.logout(e)}}},[t._v("Logout")])])])],2):t._e()},c=[],l=n("dc59"),m={name:"Navigation",computed:Object(i["a"])({},Object(u["c"])({user:"user",loading:"loading",currentCampaign:"currentCampaign"})),methods:Object(i["a"])(Object(i["a"])({},Object(u["b"])(["clearUser"])),{},{logout:function(){var t=this;l["b"].auth().signOut().then((function(){t.clearUser()})).catch((function(t){return console.log(t)}))}})},d=m,f=n("0c7c"),b=Object(f["a"])(d,s,c,!1,null,null,null),p=b.exports,g={computed:Object(i["a"])({},Object(u["c"])({loading:"loading"})),components:{Navigation:p}},v=g,h=(n("034f"),Object(f["a"])(v,r,o,!1,null,null,null)),k=h.exports,S=(n("45fc"),n("d3b7"),n("8c4f"));a["a"].use(S["a"]);var C=[{path:"/",name:"Home",component:function(){return n.e("chunk-c5b24f8a").then(n.bind(null,"bb51"))}},{path:"/survivors",name:"Survivors",component:function(){return n.e("chunk-a3d27ac4").then(n.bind(null,"6aa8"))},meta:{requiresAuth:!0}},{path:"/settlement",name:"Settlement",component:function(){return n.e("chunk-2d226945").then(n.bind(null,"e8ea"))},meta:{requiresAuth:!0}},{path:"/timeline",name:"Timeline",component:function(){return n.e("chunk-7095db74").then(n.bind(null,"f67a"))},meta:{requiresAuth:!0}},{path:"/innovations",name:"Innovations",component:function(){return n.e("chunk-2d21b4a8").then(n.bind(null,"bec2"))},meta:{requiresAuth:!0}},{path:"/storage",name:"Storage",component:function(){return n.e("chunk-2d0aa1ba").then(n.bind(null,"1038"))},meta:{requiresAuth:!0}}],y=new S["a"]({mode:"history",base:"/",routes:C});y.beforeEach((function(t,e,n){var a=t.matched.some((function(t){return t.meta.requiresAuth}));a?l["b"].auth().onAuthStateChanged((function(t){t?n():n("/")})):n()}));var _=y,w=n("0e44");a["a"].use(u["a"]);var O=new u["a"].Store({plugins:[Object(w["a"])({storage:window.sessionStorage})],state:{user:null,currentCampaign:null,loading:!0},getters:{user:function(t){return t.user},currentCampaign:function(t){return t.currentCampaign},loading:function(t){return t.loading}},mutations:{SET_USER:function(t,e){t.user=e},SET_CAMPAIGN:function(t,e){t.currentCampaign=e},SET_LOADING:function(t,e){t.loading=e}},actions:{setUser:function(t,e){var n=t.commit;e&&n("SET_USER",e)},setCurrentCampaign:function(t,e){var n=t.commit;e&&n("SET_CAMPAIGN",e)},setLoading:function(t,e){var n=t.commit;null!==e&&n("SET_LOADING",e)},clearUser:function(t){var e=t.commit;e("SET_USER",null),window.sessionStorage.clear()}}}),j=n("0ff2"),E=n("289d"),A=(n("5abe"),n("ecee")),T=n("c074"),I=n("ad3d");A["c"].add(T["a"]),a["a"].component("vue-fontawesome",I["a"]),a["a"].use(E["a"],{defaultIconComponent:"vue-fontawesome",defaultIconPack:"fas",customIconPacks:{fas:{sizes:{default:"lg","is-small":"1x","is-medium":"2x","is-large":"3x"},iconPrefix:""}}}),a["a"].use(j["a"]),a["a"].config.productionTip=!1,l["b"].auth().onAuthStateChanged((function(t){O.dispatch("setUser",t),O.dispatch("setLoading",!1)})),new a["a"]({router:_,store:O,render:function(t){return t(k)}}).$mount("#app")},"8b5d":function(t,e,n){},dc59:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var a=n("260b");n.d(e,"b",(function(){return a["a"]}));n("ea7b"),n("000b"),n("e71f");var r={apiKey:"AIzaSyBmSsnVV-42ImI7NTs3l02H_-6WLl63CiA",authDomain:"kingdomdeathmanagement.firebaseapp.com",databaseURL:"https://kingdomdeathmanagement.firebaseio.com",projectId:"kingdomdeathmanagement",storageBucket:"kingdomdeathmanagement.appspot.com",messagingSenderId:"577246476472",appId:"1:577246476472:web:f19bf30a4700bd1baf5c4d",measurementId:"G-1VZ07JWF07"},o=a["a"].initializeApp(r);a["a"].analytics();o.auth();var i=o.firestore()}});
//# sourceMappingURL=app.849ce8a6.js.map