(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d19052e"],{"06c5":function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));e("a630"),e("fb6a"),e("b0c0"),e("d3b7"),e("25f0"),e("3ca3");var r=e("6b75");function i(t,n){if(t){if("string"===typeof t)return Object(r["a"])(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?Object(r["a"])(t,n):void 0}}},1276:function(t,n,e){"use strict";var r=e("d784"),i=e("44e7"),a=e("825a"),o=e("1d80"),c=e("4840"),s=e("8aa5"),u=e("50c4"),l=e("14c3"),f=e("9263"),d=e("d039"),p=[].push,v=Math.min,g=4294967295,h=!d((function(){return!RegExp(g,"y")}));r("split",2,(function(t,n,e){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,e){var r=String(o(this)),a=void 0===e?g:e>>>0;if(0===a)return[];if(void 0===t)return[r];if(!i(t))return n.call(r,t,a);var c,s,u,l=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),v=0,h=new RegExp(t.source,d+"g");while(c=f.call(h,r)){if(s=h.lastIndex,s>v&&(l.push(r.slice(v,c.index)),c.length>1&&c.index<r.length&&p.apply(l,c.slice(1)),u=c[0].length,v=s,l.length>=a))break;h.lastIndex===c.index&&h.lastIndex++}return v===r.length?!u&&h.test("")||l.push(""):l.push(r.slice(v)),l.length>a?l.slice(0,a):l}:"0".split(void 0,0).length?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,e){var i=o(this),a=void 0==n?void 0:n[t];return void 0!==a?a.call(n,i,e):r.call(String(i),n,e)},function(t,i){var o=e(r,t,this,i,r!==n);if(o.done)return o.value;var f=a(t),d=String(this),p=c(f,RegExp),y=f.unicode,m=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(h?"y":"g"),b=new p(h?f:"^(?:"+f.source+")",m),x=void 0===i?g:i>>>0;if(0===x)return[];if(0===d.length)return null===l(b,d)?[d]:[];var S=0,_=0,E=[];while(_<d.length){b.lastIndex=h?_:0;var C,w=l(b,h?d:d.slice(_));if(null===w||(C=v(u(b.lastIndex+(h?0:_)),d.length))===S)_=s(d,_,y);else{if(E.push(d.slice(S,_)),E.length===x)return E;for(var A=1;A<=w.length-1;A++)if(E.push(w[A]),E.length===x)return E;_=S=C}}return E.push(d.slice(S)),E}]}),!h)},"14c3":function(t,n,e){var r=e("c6b6"),i=e("9263");t.exports=function(t,n){var e=t.exec;if("function"===typeof e){var a=e.call(t,n);if("object"!==typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,n)}},"1c7e":function(t,n,e){var r=e("b622"),i=r("iterator"),a=!1;try{var o=0,c={next:function(){return{done:!!o++}},return:function(){a=!0}};c[i]=function(){return this},Array.from(c,(function(){throw 2}))}catch(s){}t.exports=function(t,n){if(!n&&!a)return!1;var e=!1;try{var r={};r[i]=function(){return{next:function(){return{done:e=!0}}}},t(r)}catch(s){}return e}},2532:function(t,n,e){"use strict";var r=e("23e7"),i=e("5a34"),a=e("1d80"),o=e("ab13");r({target:"String",proto:!0,forced:!o("includes")},{includes:function(t){return!!~String(a(this)).indexOf(i(t),arguments.length>1?arguments[1]:void 0)}})},"25f0":function(t,n,e){"use strict";var r=e("6eeb"),i=e("825a"),a=e("d039"),o=e("ad6d"),c="toString",s=RegExp.prototype,u=s[c],l=a((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),f=u.name!=c;(l||f)&&r(RegExp.prototype,c,(function(){var t=i(this),n=String(t.source),e=t.flags,r=String(void 0===e&&t instanceof RegExp&&!("flags"in s)?o.call(t):e);return"/"+n+"/"+r}),{unsafe:!0})},"2a62":function(t,n,e){var r=e("825a");t.exports=function(t){var n=t["return"];if(void 0!==n)return r(n.call(t)).value}},"35a1":function(t,n,e){var r=e("f5df"),i=e("3f8c"),a=e("b622"),o=a("iterator");t.exports=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},"3bbe":function(t,n,e){var r=e("861d");t.exports=function(t){if(!r(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},"3ca3":function(t,n,e){"use strict";var r=e("6547").charAt,i=e("69f3"),a=e("7dd0"),o="String Iterator",c=i.set,s=i.getterFor(o);a(String,"String",(function(t){c(this,{type:o,string:String(t),index:0})}),(function(){var t,n=s(this),e=n.string,i=n.index;return i>=e.length?{value:void 0,done:!0}:(t=r(e,i),n.index+=t.length,{value:t,done:!1})}))},"3f8c":function(t,n){t.exports={}},"44d2":function(t,n,e){var r=e("b622"),i=e("7c73"),a=e("9bf2"),o=r("unscopables"),c=Array.prototype;void 0==c[o]&&a.f(c,o,{configurable:!0,value:i(null)}),t.exports=function(t){c[o][t]=!0}},"44e7":function(t,n,e){var r=e("861d"),i=e("c6b6"),a=e("b622"),o=a("match");t.exports=function(t){var n;return r(t)&&(void 0!==(n=t[o])?!!n:"RegExp"==i(t))}},4840:function(t,n,e){var r=e("825a"),i=e("1c0b"),a=e("b622"),o=a("species");t.exports=function(t,n){var e,a=r(t).constructor;return void 0===a||void 0==(e=r(a)[o])?n:i(e)}},"498a":function(t,n,e){"use strict";var r=e("23e7"),i=e("58a8").trim,a=e("c8d2");r({target:"String",proto:!0,forced:a("trim")},{trim:function(){return i(this)}})},"4df4":function(t,n,e){"use strict";var r=e("0366"),i=e("7b0b"),a=e("9bdd"),o=e("e95a"),c=e("50c4"),s=e("8418"),u=e("35a1");t.exports=function(t){var n,e,l,f,d,p,v=i(t),g="function"==typeof this?this:Array,h=arguments.length,y=h>1?arguments[1]:void 0,m=void 0!==y,b=u(v),x=0;if(m&&(y=r(y,h>2?arguments[2]:void 0,2)),void 0==b||g==Array&&o(b))for(n=c(v.length),e=new g(n);n>x;x++)p=m?y(v[x],x):v[x],s(e,x,p);else for(f=b.call(v),d=f.next,e=new g;!(l=d.call(f)).done;x++)p=m?a(f,y,[l.value,x],!0):l.value,s(e,x,p);return e.length=x,e}},5899:function(t,n){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,n,e){var r=e("1d80"),i=e("5899"),a="["+i+"]",o=RegExp("^"+a+a+"*"),c=RegExp(a+a+"*$"),s=function(t){return function(n){var e=String(r(n));return 1&t&&(e=e.replace(o,"")),2&t&&(e=e.replace(c,"")),e}};t.exports={start:s(1),end:s(2),trim:s(3)}},"5a34":function(t,n,e){var r=e("44e7");t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},6547:function(t,n,e){var r=e("a691"),i=e("1d80"),a=function(t){return function(n,e){var a,o,c=String(i(n)),s=r(e),u=c.length;return s<0||s>=u?t?"":void 0:(a=c.charCodeAt(s),a<55296||a>56319||s+1===u||(o=c.charCodeAt(s+1))<56320||o>57343?t?c.charAt(s):a:t?c.slice(s,s+2):o-56320+(a-55296<<10)+65536)}};t.exports={codeAt:a(!1),charAt:a(!0)}},"6b75":function(t,n,e){"use strict";function r(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}e.d(n,"a",(function(){return r}))},"7db0":function(t,n,e){"use strict";var r=e("23e7"),i=e("b727").find,a=e("44d2"),o=e("ae40"),c="find",s=!0,u=o(c);c in[]&&Array(1)[c]((function(){s=!1})),r({target:"Array",proto:!0,forced:s||!u},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),a(c)},"7dd0":function(t,n,e){"use strict";var r=e("23e7"),i=e("9ed3"),a=e("e163"),o=e("d2bb"),c=e("d44e"),s=e("9112"),u=e("6eeb"),l=e("b622"),f=e("c430"),d=e("3f8c"),p=e("ae93"),v=p.IteratorPrototype,g=p.BUGGY_SAFARI_ITERATORS,h=l("iterator"),y="keys",m="values",b="entries",x=function(){return this};t.exports=function(t,n,e,l,p,S,_){i(e,n,l);var E,C,w,A=function(t){if(t===p&&L)return L;if(!g&&t in k)return k[t];switch(t){case y:return function(){return new e(this,t)};case m:return function(){return new e(this,t)};case b:return function(){return new e(this,t)}}return function(){return new e(this)}},O=n+" Iterator",R=!1,k=t.prototype,I=k[h]||k["@@iterator"]||p&&k[p],L=!g&&I||A(p),j="Array"==n&&k.entries||I;if(j&&(E=a(j.call(new t)),v!==Object.prototype&&E.next&&(f||a(E)===v||(o?o(E,v):"function"!=typeof E[h]&&s(E,h,x)),c(E,O,!0,!0),f&&(d[O]=x))),p==m&&I&&I.name!==m&&(R=!0,L=function(){return I.call(this)}),f&&!_||k[h]===L||s(k,h,L),d[n]=L,p)if(C={values:A(m),keys:S?L:A(y),entries:A(b)},_)for(w in C)(g||R||!(w in k))&&u(k,w,C[w]);else r({target:n,proto:!0,forced:g||R},C);return C}},"8aa5":function(t,n,e){"use strict";var r=e("6547").charAt;t.exports=function(t,n,e){return n+(e?r(t,n).length:1)}},9263:function(t,n,e){"use strict";var r=e("ad6d"),i=e("9f7f"),a=RegExp.prototype.exec,o=String.prototype.replace,c=a,s=function(){var t=/a/,n=/b*/g;return a.call(t,"a"),a.call(n,"a"),0!==t.lastIndex||0!==n.lastIndex}(),u=i.UNSUPPORTED_Y||i.BROKEN_CARET,l=void 0!==/()??/.exec("")[1],f=s||l||u;f&&(c=function(t){var n,e,i,c,f=this,d=u&&f.sticky,p=r.call(f),v=f.source,g=0,h=t;return d&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),h=String(t).slice(f.lastIndex),f.lastIndex>0&&(!f.multiline||f.multiline&&"\n"!==t[f.lastIndex-1])&&(v="(?: "+v+")",h=" "+h,g++),e=new RegExp("^(?:"+v+")",p)),l&&(e=new RegExp("^"+v+"$(?!\\s)",p)),s&&(n=f.lastIndex),i=a.call(d?e:f,h),d?i?(i.input=i.input.slice(g),i[0]=i[0].slice(g),i.index=f.lastIndex,f.lastIndex+=i[0].length):f.lastIndex=0:s&&i&&(f.lastIndex=f.global?i.index+i[0].length:n),l&&i&&i.length>1&&o.call(i[0],e,(function(){for(c=1;c<arguments.length-2;c++)void 0===arguments[c]&&(i[c]=void 0)})),i}),t.exports=c},"9bdd":function(t,n,e){var r=e("825a"),i=e("2a62");t.exports=function(t,n,e,a){try{return a?n(r(e)[0],e[1]):n(e)}catch(o){throw i(t),o}}},"9ed3":function(t,n,e){"use strict";var r=e("ae93").IteratorPrototype,i=e("7c73"),a=e("5c6c"),o=e("d44e"),c=e("3f8c"),s=function(){return this};t.exports=function(t,n,e){var u=n+" Iterator";return t.prototype=i(r,{next:a(1,e)}),o(t,u,!1,!0),c[u]=s,t}},"9f7f":function(t,n,e){"use strict";var r=e("d039");function i(t,n){return RegExp(t,n)}n.UNSUPPORTED_Y=r((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),n.BROKEN_CARET=r((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a15b:function(t,n,e){"use strict";var r=e("23e7"),i=e("44ad"),a=e("fc6a"),o=e("a640"),c=[].join,s=i!=Object,u=o("join",",");r({target:"Array",proto:!0,forced:s||!u},{join:function(t){return c.call(a(this),void 0===t?",":t)}})},a630:function(t,n,e){var r=e("23e7"),i=e("4df4"),a=e("1c7e"),o=!a((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:o},{from:i})},ab13:function(t,n,e){var r=e("b622"),i=r("match");t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[i]=!1,"/./"[t](n)}catch(r){}}return!1}},ac1f:function(t,n,e){"use strict";var r=e("23e7"),i=e("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,n,e){"use strict";var r=e("825a");t.exports=function(){var t=r(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.dotAll&&(n+="s"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},ae93:function(t,n,e){"use strict";var r,i,a,o=e("e163"),c=e("9112"),s=e("5135"),u=e("b622"),l=e("c430"),f=u("iterator"),d=!1,p=function(){return this};[].keys&&(a=[].keys(),"next"in a?(i=o(o(a)),i!==Object.prototype&&(r=i)):d=!0),void 0==r&&(r={}),l||s(r,f)||c(r,f,p),t.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:d}},ae9b:function(t,n,e){"use strict";e("c9cb")},b0c0:function(t,n,e){var r=e("83ab"),i=e("9bf2").f,a=Function.prototype,o=a.toString,c=/^\s*function ([^ (]*)/,s="name";r&&!(s in a)&&i(a,s,{configurable:!0,get:function(){try{return o.call(this).match(c)[1]}catch(t){return""}}})},c8d2:function(t,n,e){var r=e("d039"),i=e("5899"),a="​᠎";t.exports=function(t){return r((function(){return!!i[t]()||a[t]()!=a||i[t].name!==t}))}},c975:function(t,n,e){"use strict";var r=e("23e7"),i=e("4d64").indexOf,a=e("a640"),o=e("ae40"),c=[].indexOf,s=!!c&&1/[1].indexOf(1,-0)<0,u=a("indexOf"),l=o("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:s||!u||!l},{indexOf:function(t){return s?c.apply(this,arguments)||0:i(this,t,arguments.length>1?arguments[1]:void 0)}})},c9cb:function(t,n,e){},caad6:function(t,n,e){"use strict";var r=e("23e7"),i=e("4d64").includes,a=e("44d2"),o=e("ae40"),c=o("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:!c},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),a("includes")},d28b:function(t,n,e){var r=e("746f");r("iterator")},d2bb:function(t,n,e){var r=e("825a"),i=e("3bbe");t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,n=!1,e={};try{t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set,t.call(e,[]),n=e instanceof Array}catch(a){}return function(e,a){return r(e),i(a),n?t.call(e,a):e.__proto__=a,e}}():void 0)},d784:function(t,n,e){"use strict";e("ac1f");var r=e("6eeb"),i=e("d039"),a=e("b622"),o=e("9263"),c=e("9112"),s=a("species"),u=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),f=a("replace"),d=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),p=!i((function(){var t=/(?:)/,n=t.exec;t.exec=function(){return n.apply(this,arguments)};var e="ab".split(t);return 2!==e.length||"a"!==e[0]||"b"!==e[1]}));t.exports=function(t,n,e,f){var v=a(t),g=!i((function(){var n={};return n[v]=function(){return 7},7!=""[t](n)})),h=g&&!i((function(){var n=!1,e=/a/;return"split"===t&&(e={},e.constructor={},e.constructor[s]=function(){return e},e.flags="",e[v]=/./[v]),e.exec=function(){return n=!0,null},e[v](""),!n}));if(!g||!h||"replace"===t&&(!u||!l||d)||"split"===t&&!p){var y=/./[v],m=e(v,""[t],(function(t,n,e,r,i){return n.exec===o?g&&!i?{done:!0,value:y.call(n,e,r)}:{done:!0,value:t.call(e,n,r)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),b=m[0],x=m[1];r(String.prototype,t,b),r(RegExp.prototype,v,2==n?function(t,n){return x.call(t,this,n)}:function(t){return x.call(t,this)})}f&&c(RegExp.prototype[v],"sham",!0)}},d81d:function(t,n,e){"use strict";var r=e("23e7"),i=e("b727").map,a=e("1dde"),o=e("ae40"),c=a("map"),s=o("map");r({target:"Array",proto:!0,forced:!c||!s},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},ddb0:function(t,n,e){var r=e("da84"),i=e("fdbc"),a=e("e260"),o=e("9112"),c=e("b622"),s=c("iterator"),u=c("toStringTag"),l=a.values;for(var f in i){var d=r[f],p=d&&d.prototype;if(p){if(p[s]!==l)try{o(p,s,l)}catch(g){p[s]=l}if(p[u]||o(p,u,f),i[f])for(var v in a)if(p[v]!==a[v])try{o(p,v,a[v])}catch(g){p[v]=a[v]}}}},e01a:function(t,n,e){"use strict";var r=e("23e7"),i=e("83ab"),a=e("da84"),o=e("5135"),c=e("861d"),s=e("9bf2").f,u=e("e893"),l=a.Symbol;if(i&&"function"==typeof l&&(!("description"in l.prototype)||void 0!==l().description)){var f={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),n=this instanceof d?new l(t):void 0===t?l():l(t);return""===t&&(f[n]=!0),n};u(d,l);var p=d.prototype=l.prototype;p.constructor=d;var v=p.toString,g="Symbol(test)"==String(l("test")),h=/^Symbol\((.*)\)[^)]+$/;s(p,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,n=v.call(t);if(o(f,t))return"";var e=g?n.slice(7,-1):n.replace(h,"$1");return""===e?void 0:e}}),r({global:!0,forced:!0},{Symbol:d})}},e163:function(t,n,e){var r=e("5135"),i=e("7b0b"),a=e("f772"),o=e("e177"),c=a("IE_PROTO"),s=Object.prototype;t.exports=o?Object.getPrototypeOf:function(t){return t=i(t),r(t,c)?t[c]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},e177:function(t,n,e){var r=e("d039");t.exports=!r((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},e260:function(t,n,e){"use strict";var r=e("fc6a"),i=e("44d2"),a=e("3f8c"),o=e("69f3"),c=e("7dd0"),s="Array Iterator",u=o.set,l=o.getterFor(s);t.exports=c(Array,"Array",(function(t,n){u(this,{type:s,target:r(t),index:0,kind:n})}),(function(){var t=l(this),n=t.target,e=t.kind,r=t.index++;return!n||r>=n.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==e?{value:r,done:!1}:"values"==e?{value:n[r],done:!1}:{value:[r,n[r]],done:!1}}),"values"),a.Arguments=a.Array,i("keys"),i("values"),i("entries")},e95a:function(t,n,e){var r=e("b622"),i=e("3f8c"),a=r("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||o[a]===t)}},f67a:function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return!t.loading&&t.user&&t.campaign?e("div",{staticClass:"column"},[e("div",{staticClass:"columns"},[e("div",{staticClass:"column is-12"},[e("h1",{staticClass:"title"},[t._v("Lantern Year "+t._s(t.campaign.year))])])]),t._m(0),t._l(t.timeline,(function(n){return e("div",{key:n.id,ref:"year"+n.id,refInFor:!0,staticClass:"columns timeline-row",class:{current:n.year===t.campaign.year},staticStyle:{position:"relative"},on:{mouseover:function(e){t.activeRow=n.id},focus:function(e){t.activeRow=n.id}}},[e("div",{staticClass:"column is-1"},[t.campaign.year!==n.year&&t.activeRow===n.id?e("b-button",{attrs:{rounded:"",type:"is-info","icon-left":"calendar-check"},on:{click:function(e){return e.preventDefault(),t.changeYear(n.year)}}},[t._v(t._s(n.year))]):e("span",[t._v(t._s(n.year))])],1),e("div",{staticClass:"column is-2"},[t._l(n.storyEvents,(function(n,r){return e("div",{key:r},[e("img",{staticClass:"special-icon small icon-story",attrs:{src:"images/story.png"}}),t._v(" "+t._s(n)+" ")])})),t.activeRow===n.id?e("span",[e("b-button",{attrs:{type:"is-success","icon-right":"plus"},on:{click:function(e){return e.preventDefault(),t.addStoryEvent(n.id)}}})],1):t._e()],2),e("div",{staticClass:"column is-2"},[t._l(n.settlementEvents,(function(n,r){return e("div",{key:r},[e("img",{staticClass:"special-icon small icon-settlement",attrs:{src:"images/settlement.png"}}),t._v(" "+t._s(n)+" ")])})),t.activeRow===n.id?e("span",[e("b-button",{attrs:{type:"is-success","icon-right":"plus"},on:{click:function(e){return e.preventDefault(),t.addSettlementEvent(n.id)}}})],1):t._e()],2),e("div",{staticClass:"column is-2"},[t._l(n.showdowns,(function(n,r){return e("div",{key:r},[e("img",{staticClass:"special-icon small icon-nemesis",attrs:{src:"images/nemesis.png"}}),t._v(" "+t._s(n.name)+" "),n.level>0?e("span",[t._v(" - Lvl "+t._s(n.level)+" ")]):t._e()])})),t.activeRow===n.id?e("span",[e("b-button",{attrs:{type:"is-success","icon-right":"plus"},on:{click:function(e){return e.preventDefault(),t.addShowdown(n.id)}}})],1):t._e()],2),e("div",{staticClass:"column is-2"},t._l(t.innovationsByYear[n.id],(function(n){return e("div",{key:n.id},[e("b-icon",{attrs:{icon:"flask","custom-size":"xs"}}),n.innovation?e("span",[t._v(t._s(n.innovation.name))]):e("span",[t._v(t._s(n.id))])],1)})),0),e("div",{staticClass:"column is-2"},[n.quarry?e("span",[e("div",[e("img",{staticClass:"special-icon small icon-nemesis",attrs:{src:"images/nemesis.png"}}),e("span",[t._v(t._s(n.quarry))])]),e("b-checkbox",{attrs:{size:"is-small",type:"is-info"},on:{input:function(e){return t.flagSuccess(n.id,e)}},model:{value:n.successful,callback:function(e){t.$set(n,"successful",e)},expression:"ly.successful"}},[t._v("Successful Hunt")])],1):t.activeRow===n.id?e("span",[e("b-field",[e("b-select",{attrs:{placeholder:"Quarry"},model:{value:t.selectingQuarry,callback:function(n){t.selectingQuarry=n},expression:"selectingQuarry"}},t._l(t.quarries,(function(n){return e("option",{key:n.id,domProps:{value:n.name}},[t._v(t._s(n.name))])})),0),e("b-select",{attrs:{placeholder:"Lv."},model:{value:t.sQLevel,callback:function(n){t.sQLevel=n},expression:"sQLevel"}},t._l([1,2,3],(function(n){return e("option",{key:n,domProps:{value:n}},[t._v(t._s(n))])})),0),e("b-button",{attrs:{type:"is-success","icon-right":"plus"},on:{click:function(e){return e.preventDefault(),t.confirmQuarry(n.id)}}})],1)],1):t._e()]),e("div",{staticClass:"column is-1"},[e("b-button",{staticClass:"circle-icon",attrs:{rounded:"",type:"is-black","icon-right":"asterisk"},on:{click:function(e){return e.preventDefault(),t.showEndeavors(n.id)}}})],1)])}))],2):t._e()},i=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"columns header"},[e("div",{staticClass:"column is-1"},[t._v("Year")]),e("div",{staticClass:"column is-2"},[t._v("Story and Special Events")]),e("div",{staticClass:"column is-2"},[t._v("Settlement Event")]),e("div",{staticClass:"column is-2"},[t._v("Special Showdown")]),e("div",{staticClass:"column is-2"},[t._v("Innovated")]),e("div",{staticClass:"column is-2"},[t._v("Quarry")]),e("div",{staticClass:"column is-1"},[t._v("Endeavors")])])}];e("4de4"),e("7db0"),e("4160"),e("caad6"),e("c975"),e("a15b"),e("d81d"),e("d3b7"),e("ac1f"),e("25f0"),e("2532"),e("1276"),e("498a"),e("159b");function a(t){if(Array.isArray(t))return t}e("a4d3"),e("e01a"),e("d28b"),e("3ca3"),e("ddb0");function o(t,n){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var e=[],r=!0,i=!1,a=void 0;try{for(var o,c=t[Symbol.iterator]();!(r=(o=c.next()).done);r=!0)if(e.push(o.value),n&&e.length===n)break}catch(s){i=!0,a=s}finally{try{r||null==c["return"]||c["return"]()}finally{if(i)throw a}}return e}}var c=e("06c5");function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,n){return a(t)||o(t,n)||Object(c["a"])(t,n)||s()}var l=e("5530"),f=e("2f62"),d=e("dc59"),p={name:"Timeline",data:function(){return{campaign:null,timeline:[],allQuarries:[],activeRow:null,loadingComponents:{},selectingQuarry:null,innovations:[],sQLevel:null}},computed:Object(l["a"])(Object(l["a"])({},Object(f["c"])({loading:"loading",user:"user",currentCampaign:"currentCampaign"})),{},{quarries:function(){var t=this;return this.allQuarries.filter((function(n){return t.campaign.quarries.includes(n.id)}))},innovationsByYear:function(){var t=this;if(!this.innovations)return[];var n=this.innovations.map((function(t){return t.year})).filter((function(t,n,e){return e.indexOf(t)===n&&null!==t})),e={};return n.forEach((function(n){n in e||(e[n.toString()]=[]),t.innovations.filter((function(t){return t.year===n})).forEach((function(r){r.innovation=t.allInnovations.find((function(t){return r.id===t.id})),e[n.toString()].push(r)}))})),e}}),created:function(){this.$bind("campaign",d["a"].collection("campaigns").doc(this.currentCampaign)),this.$bind("timeline",d["a"].collection("campaigns/".concat(this.currentCampaign,"/timeline")).orderBy("year","asc")),this.$bind("allInnovations",d["a"].collection("innovations")),this.$bind("allQuarries",d["a"].collection("quarries")),this.$bind("innovations",d["a"].collection("campaigns/".concat(this.currentCampaign,"/innovations")))},methods:{setYearLoading:function(t,n){this.loadingComponents[t]||!n?n||(this.loadingComponents[t].close(),delete this.loadingComponents[t]):this.loadingComponents[t]=this.$buefy.loading.open({container:this.$refs["year"+t][0]})},addStoryEvent:function(t){var n=this;this.$buefy.dialog.prompt({message:"Add Story Event to Lantern Year "+t+":",inputAttrs:{required:!0},trapFocus:!0,onConfirm:function(e){n.setYearLoading(t,!0),d["a"].collection("campaigns/".concat(n.currentCampaign,"/timeline")).doc(t.toString()).update({storyEvents:d["b"].firestore.FieldValue.arrayUnion(e)}).then((function(){n.setYearLoading(t,!1)}))}})},addSettlementEvent:function(t){var n=this;this.$buefy.dialog.prompt({message:"Add Settlement Event to Lantern Year "+t+":",inputAttrs:{required:!0},trapFocus:!0,onConfirm:function(e){n.setYearLoading(t,!0),d["a"].collection("campaigns/".concat(n.currentCampaign,"/timeline")).doc(t.toString()).update({settlementEvents:d["b"].firestore.FieldValue.arrayUnion(e)}).then((function(){n.setYearLoading(t,!1)}))}})},addShowdown:function(t){var n=this;this.$buefy.dialog.prompt({message:"Add Showdown to Lantern Year "+t+': <p class="is-size-7">You can include a level separated by a colon (":").</p>',inputAttrs:{required:!0},trapFocus:!0,onConfirm:function(e){n.setYearLoading(t,!0);var r=e.trim().split(":"),i=u(r,2),a=i[0],o=i[1];o||(o=0),d["a"].collection("campaigns/".concat(n.currentCampaign,"/timeline")).doc(t.toString()).update({showdowns:d["b"].firestore.FieldValue.arrayUnion({name:a,level:o})}).then((function(){n.setYearLoading(t,!1)}))}})},confirmQuarry:function(t){var n=this;this.setYearLoading(t,!0),d["a"].collection("campaigns/".concat(this.currentCampaign,"/timeline")).doc(t.toString()).update({quarry:this.selectingQuarry+" Lv. "+this.sQLevel}).then((function(){n.selectingQuarry=null,n.sQLevel=null,n.setYearLoading(t,!1)}))},flagSuccess:function(t,n){var e=this;this.setYearLoading(t,!0),d["a"].collection("campaigns/".concat(this.currentCampaign,"/timeline")).doc(t.toString()).update({successful:n}).then((function(){e.setYearLoading(t,!1)}))},changeYear:function(t){var n=this;this.$buefy.dialog.confirm({message:"Change to Lantern Year "+t+"?",onConfirm:function(){d["a"].collection("campaigns").doc(n.currentCampaign).update({year:t})}})},showEndeavors:function(t){var n='<button data-v-e945440a="" type="button" class="button is-small circle-icon is-black is-rounded disabled"><span class="icon is-small"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="asterisk" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-asterisk fa-w-16 fa-1x"><path fill="currentColor" d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z" class=""></path></svg></span></button>',e=this.timeline[t],r=e.endeavors,i="";i=null!==r&&void 0!==r&&r.length?r.map((function(t){return'<p class="content">'+n+" "+t+"</p>"})).join("<hr />"):"<p>No Endeavors spent this lantern year.</p>",this.$buefy.dialog.alert({title:"Endeavors Spent",message:"".concat(i),confirmText:"OK"})}}},v=p,g=(e("ae9b"),e("0c7c")),h=Object(g["a"])(v,r,i,!1,null,"15ed1f96",null);n["default"]=h.exports},fb6a:function(t,n,e){"use strict";var r=e("23e7"),i=e("861d"),a=e("e8b5"),o=e("23cb"),c=e("50c4"),s=e("fc6a"),u=e("8418"),l=e("b622"),f=e("1dde"),d=e("ae40"),p=f("slice"),v=d("slice",{ACCESSORS:!0,0:0,1:2}),g=l("species"),h=[].slice,y=Math.max;r({target:"Array",proto:!0,forced:!p||!v},{slice:function(t,n){var e,r,l,f=s(this),d=c(f.length),p=o(t,d),v=o(void 0===n?d:n,d);if(a(f)&&(e=f.constructor,"function"!=typeof e||e!==Array&&!a(e.prototype)?i(e)&&(e=e[g],null===e&&(e=void 0)):e=void 0,e===Array||void 0===e))return h.call(f,p,v);for(r=new(void 0===e?Array:e)(y(v-p,0)),l=0;p<v;p++,l++)p in f&&u(r,l,f[p]);return r.length=l,r}})}}]);
//# sourceMappingURL=chunk-7d19052e.411f74ed.js.map