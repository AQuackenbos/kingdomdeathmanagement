(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2064a7a2"],{"25f0":function(e,t,n){"use strict";var r=n("6eeb"),a=n("825a"),i=n("d039"),o=n("ad6d"),s="toString",c=RegExp.prototype,u=c[s],l=i((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),h=u.name!=s;(l||h)&&r(RegExp.prototype,s,(function(){var e=a(this),t=String(e.source),n=e.flags,r=String(void 0===n&&e instanceof RegExp&&!("flags"in c)?o.call(e):n);return"/"+t+"/"+r}),{unsafe:!0})},"3ca3":function(e,t,n){"use strict";var r=n("6547").charAt,a=n("69f3"),i=n("7dd0"),o="String Iterator",s=a.set,c=a.getterFor(o);i(String,"String",(function(e){s(this,{type:o,string:String(e),index:0})}),(function(){var e,t=c(this),n=t.string,a=t.index;return a>=n.length?{value:void 0,done:!0}:(e=r(n,a),t.index+=e.length,{value:e,done:!1})}))},"460b":function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o})),n.d(t,"e",(function(){return s})),n.d(t,"f",(function(){return c}));var r=["white_lion"],a=[{id:"language",deck:!0,innovated:!1,year:null}],i=["lantern_hoard"],o=[{name:"Returning Survivors",year:1},{name:"Endless Screams",year:2},{name:"Hands of Heat",year:5},{name:"Armored Strangers",year:6},{name:"Phoenix Feather",year:7},{name:"Regal Visit",year:11},{name:"Principle: Conviction",year:12},{name:"Watched",year:20}],s=[{name:"Butcher",level:1,year:4},{name:"King's Man",level:1,year:9},{name:"The Hand",level:1,year:13},{name:"Butcher",level:2,year:16},{name:"King's Man",level:2,year:19},{name:"Butcher",level:3,year:23},{name:"Watcher",level:0,year:25},{name:"King's Man",level:3,year:28},{name:"Gold Smoke Knight",level:0,year:30}],c={stats:{movement:{base:5,items:0,tokens:0},accuracy:{base:0,items:0,tokens:0},strength:{base:0,items:0,tokens:0},evasion:{base:0,items:0,tokens:0},luck:{base:0,items:0,tokens:0},speed:{base:0,items:0,tokens:0}},survival:{amount:0,abilities:{dodge:!1,encourage:!1,surge:!1,dash:!1,endure:!1},skipHunt:null},lifetime:{name:null,gender:null,experience:0,born:null,father:null,mother:null,died:null,cause:null,cannot:{fightingArts:!1,survival:!1,hunt:!1},reroll:{available:!1,used:!1},notes:null},defenses:{arms:{value:0,light:!1,heavy:!1,severe:[]},body:{value:0,light:!1,heavy:!1,severe:[]},brain:{value:0,light:!1},head:{value:0,heavy:!1,severe:[]},legs:{value:0,light:!1,heavy:!1,severe:[]},waist:{value:0,light:!1,heavy:!1,severe:[]}},abilities:{abilities:[],disorders:[],fightingArts:[],impairments:[]},mentality:{courage:{level:0,abilities:{stalwart:{name:"Stalwart",granted:!1,description:"Can't be knocked down by brain trauma or intimidate."},prepared:{name:"Prepared",granted:!1,description:"Add Hunt XP to your roll when determining a straggler."},matchmaker:{name:"Matchmaker",granted:!1,description:"Spend 1 endeavor to trigger intimacy story event."}}},understanding:{level:0,abilities:{analyze:{name:"Analyze",granted:!1,description:"Look at the top AI card and return it to the top of the deck."},explore:{name:"Explore",granted:!1,description:"Add +2 to your investigate roll results."},tinker:{name:"Tinker",granted:!1,description:"+1 endeavor when you are a returning survivor."}}}},weapon:{selected:null,proficiency:0}}},5279:function(e,t,n){},6547:function(e,t,n){var r=n("a691"),a=n("1d80"),i=function(e){return function(t,n){var i,o,s=String(a(t)),c=r(n),u=s.length;return c<0||c>=u?e?"":void 0:(i=s.charCodeAt(c),i<55296||i>56319||c+1===u||(o=s.charCodeAt(c+1))<56320||o>57343?e?s.charAt(c):i:e?s.slice(c,c+2):o-56320+(i-55296<<10)+65536)}};e.exports={codeAt:i(!1),charAt:i(!0)}},"87ed":function(e,t,n){e.exports=n.p+"img/lantern.21453bec.png"},"96cf":function(e,t,n){var r=function(e){"use strict";var t,n=Object.prototype,r=n.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(F){c=function(e,t,n){return e[t]=n}}function u(e,t,n,r){var a=t&&t.prototype instanceof m?t:m,i=Object.create(a.prototype),o=new O(r||[]);return i._invoke=k(e,n,o),i}function l(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(F){return{type:"throw",arg:F}}}e.wrap=u;var h="suspendedStart",d="suspendedYield",g="executing",f="completed",p={};function m(){}function v(){}function y(){}var b={};b[i]=function(){return this};var w=Object.getPrototypeOf,P=w&&w(w(j([])));P&&P!==n&&r.call(P,i)&&(b=P);var C=y.prototype=m.prototype=Object.create(b);function x(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function L(e,t){function n(a,i,o,s){var c=l(e[a],e,i);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"===typeof h&&r.call(h,"__await")?t.resolve(h.__await).then((function(e){n("next",e,o,s)}),(function(e){n("throw",e,o,s)})):t.resolve(h).then((function(e){u.value=e,o(u)}),(function(e){return n("throw",e,o,s)}))}s(c.arg)}var a;function i(e,r){function i(){return new t((function(t,a){n(e,r,t,a)}))}return a=a?a.then(i,i):i()}this._invoke=i}function k(e,t,n){var r=h;return function(a,i){if(r===g)throw new Error("Generator is already running");if(r===f){if("throw"===a)throw i;return A()}n.method=a,n.arg=i;while(1){var o=n.delegate;if(o){var s=_(o,n);if(s){if(s===p)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=f,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=g;var c=l(e,t,n);if("normal"===c.type){if(r=n.done?f:d,c.arg===p)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=f,n.method="throw",n.arg=c.arg)}}}function _(e,n){var r=e.iterator[n.method];if(r===t){if(n.delegate=null,"throw"===n.method){if(e.iterator["return"]&&(n.method="return",n.arg=t,_(e,n),"throw"===n.method))return p;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var a=l(r,e.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,p;var i=a.arg;return i?i.done?(n[e.resultName]=i.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,p):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,p)}function E(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function S(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(E,this),this.reset(!0)}function j(e){if(e){var n=e[i];if(n)return n.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var a=-1,o=function n(){while(++a<e.length)if(r.call(e,a))return n.value=e[a],n.done=!1,n;return n.value=t,n.done=!0,n};return o.next=o}}return{next:A}}function A(){return{value:t,done:!0}}return v.prototype=C.constructor=y,y.constructor=v,v.displayName=c(y,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,c(e,s,"GeneratorFunction")),e.prototype=Object.create(C),e},e.awrap=function(e){return{__await:e}},x(L.prototype),L.prototype[o]=function(){return this},e.AsyncIterator=L,e.async=function(t,n,r,a,i){void 0===i&&(i=Promise);var o=new L(u(t,n,r,a),i);return e.isGeneratorFunction(n)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},x(C),c(C,s,"Generator"),C[i]=function(){return this},C.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){while(t.length){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=j,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(S),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function a(r,a){return s.type="throw",s.arg=e,n.next=r,a&&(n.method="next",n.arg=t),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),S(n),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;S(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:j(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),p}},e}(e.exports);try{regeneratorRuntime=r}catch(a){Function("r","regeneratorRuntime = r")(r)}},ad6d:function(e,t,n){"use strict";var r=n("825a");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},b0c0:function(e,t,n){var r=n("83ab"),a=n("9bf2").f,i=Function.prototype,o=i.toString,s=/^\s*function ([^ (]*)/,c="name";r&&!(c in i)&&a(i,c,{configurable:!0,get:function(){try{return o.call(this).match(s)[1]}catch(e){return""}}})},b9a2:function(e,t,n){"use strict";n("5279")},bb51:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.loading?e._e():r("div",{staticClass:"column is-12 is-centered"},[e.user?r("div",[r("h1",{staticClass:"title"},[e._v("Select a Campaign")]),r("CampaignList")],1):r("div",[r("img",{attrs:{alt:"Vue logo",src:n("87ed")}}),r("h1",{staticClass:"title"},[e._v("Kingdom Death Management")]),r("h2",{staticClass:"subtitle"},[e._v("Please Login to Continue")]),r("button",{staticClass:"button is-primary",on:{click:function(t){return t.preventDefault(),e.login(t)}}},[e._v("Login with Google")])])])},a=[],i=n("5530"),o=n("2f62"),s=n("dc59"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"columns is-multiline"},e._l(e.campaigns,(function(t){return n("div",{key:t.id,staticClass:"column is-4"},[n("div",{staticClass:"card campaign",on:{click:function(n){return n.preventDefault(),e.selectCampaign(t)}}},[n("header",{staticClass:"card-header"},[n("p",{staticClass:"card-header-title"},[e._v(" "+e._s(t.name)+" ")])]),n("div",{staticClass:"card-content"},[e._v(" Lantern Year "+e._s(t.year)+" "),n("br"),e._v(" "+e._s(t.members.length)+" Players ")])])])})),0),n("hr"),n("CampaignCreate")],1)},u=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"buttons is-centered"},[n("b-button",{attrs:{size:"is-large","icon-left":"plus-circle",rounded:"",type:"is-primary is-light"},on:{click:function(t){return t.preventDefault(),e.getSettlementName(t)}}},[e._v(" Create New Campaign ")]),n("b-loading",{attrs:{"is-full-page":!0,"can-cancel":!1},model:{value:e.showProgress,callback:function(t){e.showProgress=t},expression:"showProgress"}},[n("b-progress",{attrs:{value:e.createProgressPercent,size:"is-large","show-value":""}},[e._v(" Creating Campaign: "+e._s(e.createProgressPercent)+"% "+e._s(e.progressLabel)+" ")])],1)],1)},h=[];n("4160"),n("b0c0"),n("d3b7"),n("25f0"),n("3ca3"),n("159b"),n("ddb0"),n("96cf");function d(e,t,n,r,a,i,o){try{var s=e[i](o),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(r,a)}function g(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function o(e){d(i,r,a,o,s,"next",e)}function s(e){d(i,r,a,o,s,"throw",e)}o(void 0)}))}}var f=n("460b"),p={name:"CampaignCreate",data:function(){return{createProgressPercent:0,createProgressItems:0,createProgressDone:0,showProgress:!1,progressLabel:""}},computed:Object(i["a"])({},Object(o["c"])({user:"user"})),methods:Object(i["a"])(Object(i["a"])({},Object(o["b"])(["setLoading","setCurrentCampaign"])),{},{updateProgress:function(e){this.createProgressDone++,this.progressLabel=e,this.createProgressPercent=Math.round(this.createProgressDone/this.createProgressItems)},getSettlementName:function(){var e=this;this.$buefy.dialog.prompt({message:"Name your Settlement:",inputAttrs:{placeholder:"Settlement Name"},trapFocus:!0,onConfirm:function(t){return e.createCampaign(t)}})},createCampaign:function(e){var t=this;return g(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.createProgressPercent=0,t.createProgressDone=0,t.createProgressItems=42+f["d"].length+f["c"].length+f["a"].length+f["e"].length+f["b"].length,t.showProgress=!0,r={name:e,expansions:[],members:[t.user.uid],active:!0,ended:!1,ending:{year:null,details:null},quarries:[],locations:[],year:0,survival:{departing:0,max:1},bonuses:{departing:"",arriving:"",other:""},milestones:[{trigger:"First child is born",consequence:"Principle: New Life"},{trigger:"First time death count is updated",consequence:"Principle: Death"},{trigger:"Settlement has 5 innovations",consequence:"Hooded Knight"},{trigger:"Population reaches 15",consequence:"Principle: Society"},{trigger:"Population reaches 0",consequence:"Game Over"}],principles:{new_life:{name:"New Life",choices:["Protect the Young","Survival of the Fittest"],selected:null},death:{name:"Death",choices:["Cannibalize","Graves"],selected:null},society:{name:"Society",choices:["Collective Toil","Accept Darkness"],selected:null},conviction:{name:"Conviction",choices:["Barbaric","Romantic"],selected:null}}},a=s["a"].collection("campaigns").doc(),a.set(r).then((function(){return t.updateProgress("Creating core campaign data")})),n.next=9,t.populateCampaign(a);case 9:t.showProgress=!1,t.setCurrentCampaign(a.id),t.$router.push({name:"Settlement"});case 12:case"end":return n.stop()}}),n)})))()},populateCampaign:function(e){var t=this;return g(regeneratorRuntime.mark((function n(){var r,a,i,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:for(r=[],a={reached:!1,storyEvents:[],settlementEvents:[],showdowns:[],innovation:"",quarry:null,successful:!1},i=0;i<40;i++)console.log("Queueing timeline push: "+i.toString()),o=Object.assign({year:i},a),r.push(e.collection("timeline").doc(i.toString()).set(o).then((function(){return t.updateProgress("Instantiating timeline")})));return console.log("Pushing all years"),n.next=6,Promise.all(r);case 6:e.collection("timeline").doc("0").update({quarry:"White Lion (Prologue)"}),e.collection("timeline").doc("1").update({settlementEvents:s["b"].firestore.FieldValue.arrayUnion("First Story")}),f["d"].forEach((function(n){console.log("Adding Quarry: "+n),e.update({quarries:s["b"].firestore.FieldValue.arrayUnion(n)}).then((function(){return t.updateProgress("Adding quarries")}))})),f["c"].forEach((function(n){console.log("Adding location: "+n),e.update({locations:s["b"].firestore.FieldValue.arrayUnion(n)}).then((function(){return t.updateProgress("Adding locations")}))})),f["a"].forEach((function(n){console.log("Adding event: "+n.name),e.collection("timeline").doc(n.year.toString()).update({storyEvents:s["b"].firestore.FieldValue.arrayUnion(n.name)}).then((function(){return t.updateProgress("Adding default events")}))})),f["e"].forEach((function(n){console.log("Adding Showdown: "+n.name+n.level),e.collection("timeline").doc(n.year.toString()).update({showdowns:s["b"].firestore.FieldValue.arrayUnion({name:n.name,level:n.level})}).then((function(){return t.updateProgress("Adding default showdowns")}))})),f["b"].forEach((function(n){console.log("Adding innovation to deck: "+n.reference),e.collection("innovations").doc(n.id).set({deck:n.deck,innovated:n.innovated,year:n.year}).then((function(){return t.updateProgress("Building innovation deck")}))}));case 13:case"end":return n.stop()}}),n)})))()}})},m=p,v=n("0c7c"),y=Object(v["a"])(m,l,h,!1,null,null,null),b=y.exports,w={name:"CampaignList",components:{CampaignCreate:b},data:function(){return{campaigns:[]}},computed:Object(i["a"])({},Object(o["c"])({user:"user"})),created:function(){var e=this.user.uid;this.$bind("campaigns",s["a"].collection("campaigns").where("members","array-contains",e))},methods:Object(i["a"])(Object(i["a"])({},Object(o["b"])(["setCurrentCampaign"])),{},{selectCampaign:function(e){this.setCurrentCampaign(e.id),this.$router.push({name:"Settlement"})}})},P=w,C=(n("b9a2"),Object(v["a"])(P,c,u,!1,null,"963ce480",null)),x=C.exports,L={name:"Home",components:{CampaignList:x},computed:Object(i["a"])({},Object(o["c"])({user:"user",loading:"loading"})),methods:Object(i["a"])(Object(i["a"])({},Object(o["b"])(["setUser","clearUser","setLoading"])),{},{login:function(){var e=this,t=new s["b"].auth.GoogleAuthProvider;this.setLoading(!0),s["b"].auth().signInWithRedirect(t).then((function(t){console.log("calling setter -- ",t),e.setUser(t.user),e.setLoading(!1)})).catch((function(e){return console.log(e)}))}})},k=L,_=Object(v["a"])(k,r,a,!1,null,null,null);t["default"]=_.exports},ddb0:function(e,t,n){var r=n("da84"),a=n("fdbc"),i=n("e260"),o=n("9112"),s=n("b622"),c=s("iterator"),u=s("toStringTag"),l=i.values;for(var h in a){var d=r[h],g=d&&d.prototype;if(g){if(g[c]!==l)try{o(g,c,l)}catch(p){g[c]=l}if(g[u]||o(g,u,h),a[h])for(var f in i)if(g[f]!==i[f])try{o(g,f,i[f])}catch(p){g[f]=i[f]}}}}}]);
//# sourceMappingURL=chunk-2064a7a2.9a5293c3.js.map