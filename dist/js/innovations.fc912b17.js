(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["innovations"],{"7db0":function(t,n,i){"use strict";var o=i("23e7"),a=i("b727").find,s=i("44d2"),e=i("ae40"),c="find",r=!0,l=e(c);c in[]&&Array(1)[c]((function(){r=!1})),o({target:"Array",proto:!0,forced:r||!l},{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),s(c)},"8dc7":function(t,n,i){"use strict";i("ae94")},"9cec":function(t,n,i){"use strict";i("f4ac")},ae94:function(t,n,i){},bec2:function(t,n,i){"use strict";i.r(n);var o=function(){var t=this,n=t.$createElement,i=t._self._c||n;return!t.showLoading&&t.user&&t.campaign?i("div",{staticClass:"column is-12"},[i("div",{staticClass:"columns is-multiline"},[i("div",{staticClass:"column is-12"},[i("h1",{staticClass:"title"},[t._v(" Innovations Researched "),i("b-field",{staticClass:"is-pulled-right",staticStyle:{"margin-top":".25em"},attrs:{label:"Sort by","label-position":"on-border"}},[i("b-select",{attrs:{icon:"sort"},model:{value:t.sortBy,callback:function(n){t.sortBy=n},expression:"sortBy"}},[i("option",{attrs:{value:"year"}},[t._v("Lantern Year Innovated")]),i("option",{attrs:{value:"name"}},[t._v("Innovation Name")])])],1)],1)]),0===t.researched.length?i("div",{staticClass:"column is-12"},[t._v(" Your settlement has not gained any innovations yet. ")]):t._e(),t._l(t.researched,(function(n){return i("div",{key:n.id,staticClass:"column is-3"},[n.innovation?i("article",{staticClass:"panel innovation",class:t.category[n.innovation.category],attrs:{id:n.id}},[i("div",{staticClass:"panel-heading"},[i("b-tooltip",{staticClass:"is-pulled-left",attrs:{label:"Lantern Year Innovated",position:"is-top",type:"is-dark"}},[i("b-button",{staticClass:"is-pulled-left",attrs:{rounded:"",type:"is-dark",size:"is-small"}},[i("strong",[t._v(t._s(n.year))])])],1),i("b-tooltip",{attrs:{label:t.capitalize(n.innovation.category),type:"is-dark",position:"is-top"}},[i("b-icon",{attrs:{icon:t.icon[n.innovation.category],size:"is-small"}})],1),i("span",{staticClass:"is-size-6",staticStyle:{"margin-left":".5em"}},[t._v(t._s(n.innovation.name))]),i("b-dropdown",{staticClass:"is-pulled-right",attrs:{"aria-role":"list",position:"is-bottom-left"}},[i("b-button",{attrs:{slot:"trigger",type:t.category[n.innovation.category]},slot:"trigger"},[i("b-icon",{attrs:{icon:"ellipsis-h"}})],1),i("b-dropdown-item",{attrs:{"aria-role":"listItem"},on:{click:function(i){return t.returnToDeck(n)}}},[i("b-icon",{attrs:{icon:"trash-alt",size:"is-small",type:"is-danger"}}),t._v("Return to Deck")],1)],1)],1),i("div",{staticClass:"panel-block"},[i("InnovationDesc",{attrs:{innovation:n.innovation}})],1),n.innovation.consequences?i("div",{staticClass:"panel-block"},[i("p",[t._v("Added "),i("strong",[t._v(t._s(n.innovation.consequences.length))]),t._v(" innovations to the deck.")])]):t._e()]):i("article",[t._v("WARNING: No Innovation Found for "+t._s(n.id))])])})),t._m(0),t.showDeck?i("div",{staticClass:"column is-12"},[i("div",{staticClass:"columns is-multiline"},[t.showDeck?i("div",{staticClass:"column is-12"},[i("h1",{staticClass:"title"},[t._v("In Deck")])]):t._e(),t._l(t.deck,(function(n){return i("div",{key:n.id,staticClass:"column is-3"},[i("article",{staticClass:"panel",class:t.category[n.innovation.category]},[i("div",{staticClass:"panel-heading"},[i("b-tooltip",{attrs:{label:t.capitalize(n.innovation.category),type:"is-dark",position:"is-top"}},[i("b-icon",{attrs:{icon:t.icon[n.innovation.category],size:"is-small"}})],1),i("span",{staticClass:"is-size-6"},[t._v(t._s(n.innovation.name))]),i("b-dropdown",{staticClass:"is-pulled-right",attrs:{"aria-role":"list",position:"is-bottom-left"}},[i("b-button",{attrs:{slot:"trigger",type:t.category[n.innovation.category]},slot:"trigger"},[i("b-icon",{attrs:{icon:"ellipsis-h"}})],1),i("b-dropdown-item",{attrs:{"aria-role":"listItem"},on:{click:function(i){return t.researchInnovation(n)}}},[i("b-icon",{attrs:{icon:"plus-square",size:"is-small",type:"is-success"}}),t._v("Research")],1),i("b-dropdown-item",{attrs:{"aria-role":"listItem"},on:{click:function(i){return t.removeFromDeck(n)}}},[i("b-icon",{attrs:{icon:"trash-alt",size:"is-small",type:"is-danger"}}),t._v("Remove")],1)],1)],1)])])})),i("div",{staticClass:"column is-12"},[i("b-button",{attrs:{type:"is-warning","icon-left":"exclamation-circle"},on:{click:t.promptAdd}},[t._v("Add Any Innovation To Deck")]),i("b-modal",{attrs:{"has-modal-card":"","trap-focus":"","destroy-on-hide":!1,"aria-role":"dialog","aria-modal":""},scopedSlots:t._u([{key:"default",fn:function(n){return[i("InnovationAdd",{attrs:{innovations:t.innovations,campaign:t.campaign},on:{close:n.close,add:t.addToDeck}})]}}],null,!1,57795896),model:{value:t.showAddInnovation,callback:function(n){t.showAddInnovation=n},expression:"showAddInnovation"}})],1)],2)]):i("div",{staticClass:"column is-12"},[i("b-button",{attrs:{type:"is-info",expanded:""},on:{click:function(n){n.preventDefault(),t.showDeck=!0}}},[t._v("Show Innovation Deck")])],1)],2)]):t._e()},a=[function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"column is-12"},[i("hr")])}],s=(i("4de4"),i("7db0"),i("4160"),i("d81d"),i("b0c0"),i("159b"),i("5530")),e=i("2f62"),c=i("dc59"),r=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[i("header",{staticClass:"modal-card-head"},[i("p",{staticClass:"modal-card-title"},[t._v("Add Innovation")]),i("button",{staticClass:"delete",attrs:{type:"button"},on:{click:t.close}})]),i("section",{staticClass:"modal-card-body"},[i("p",{staticClass:"content"},[t._v(" Select an Innovation to add to your Innovation Deck. "),i("b-message",{attrs:{type:"is-warning"}},[t._v("This list contains all innovations.")])],1),i("b-field",{attrs:{label:"Innovation","label-position":"on-border"}},[i("b-select",{attrs:{placeholder:"Add Innovation",icon:"flask",required:"",expanded:""},model:{value:t.innovation,callback:function(n){t.innovation=n},expression:"innovation"}},t._l(t.innovations,(function(n){return i("option",{key:n.id,domProps:{value:n.id}},[t._v(t._s(n.name))])})),0)],1)],1),i("footer",{staticClass:"modal-card-foot"},[i("button",{staticClass:"button",attrs:{type:"button"},on:{click:t.close}},[t._v("Cancel")]),i("button",{staticClass:"button is-success",on:{click:t.select}},[t._v("Add Innovation")])])])},l=[],d={name:"AddInnovation",props:["innovations","campaign"],data:function(){return{innovation:null}},methods:{select:function(){var t=this.innovation;this.innovation=null,this.$emit("add",t)},close:function(){this.innovation=null,this.$emit("close")}}},u=d,v=i("0c7c"),p=Object(v["a"])(u,r,l,!1,null,null,null),m=p.exports,f=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"content inno-fields"},[t.innovation.flavor?i("div",{staticClass:"flavor",domProps:{innerHTML:t._s(t.innovation.flavor)}}):t._e(),t.innovation.provides?i("div",t._l(t.innovation.provides,(function(n){return i("b-button",{key:n,staticClass:"yellow-box is-static",attrs:{expanded:"",type:"is-dark"},on:{click:function(t){t.preventDefault()}}},[i("strong",[t._v(t._s(n))])])})),1):t._e(),t.innovation.increaseLimit?i("div",[i("b-button",{staticClass:"brown-box is-static",attrs:{expanded:"",type:"is-dark"},on:{click:function(t){t.preventDefault()}}},[i("strong",[t._v("+1 Survival Limit")])])],1):t._e(),t.innovation.departingSurvival?i("div",[i("strong",[t._v("Departing Survivors")]),t._v(" gain +1 survival. ")]):t._e(),t.innovation.description?i("div",{domProps:{innerHTML:t._s(t.innovation.description)}}):t._e(),t.innovation.actions?i("div",t._l(t.innovation.actions,(function(t){return i("Action",{key:t.name,attrs:{action:t}})})),1):t._e(),t.innovation.build?i("div",t._l(t.innovation.build,(function(n){return i("div",{key:n.name,staticClass:"box build"},[i("div",{staticClass:"level"},[i("div",{staticClass:"level-left"},[i("div",{staticClass:"level-item"},[t._l(t.getRange(n.cost),(function(t){return i("a",{key:t,staticClass:"bl-endeavor is-size-3",staticStyle:{color:"black",background:"white","border-radius":"5em"},on:{click:function(t){t.preventDefault()}}},[i("br")])})),i("strong",[t._v("Build")])],2),i("div",{staticClass:"level-item"},[t._v(" "+t._s(n.name)+" ")])]),i("div",{staticClass:"level-right"},[i("div",{staticClass:"content"},t._l(n.resources,(function(n){return i("div",{key:n.material,staticClass:"field"},[i("div",{staticClass:"control"},[i("div",{staticClass:"tags has-addons"},[i("span",{staticClass:"tag is-dark"},[t._v(t._s(n.qty)+"x")]),i("span",{staticClass:"tag is-black"},[t._v(t._s(n.material))])])])])})),0)])])])})),0):t._e()])},h=[],b=(i("d3b7"),i("ddb0"),i("2909")),g=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"action content"},[i("section",{staticClass:"field is-grouped",staticStyle:{width:"100%"}},[i("p",{staticClass:"left light-brown"},t._l(t.action.cost,(function(t){return i("a",{key:t,staticClass:"bl-endeavor is-size-3",staticStyle:{color:"black",background:"white","border-radius":"5em"}},[i("br")])})),0),i("p",{staticClass:"right brown"},[t.action.name?i("strong",[t._v(t._s(t.action.name)+" — ")]):t._e(),t.action.description?i("span",{domProps:{innerHTML:t._s(t.action.description)}}):t._e()])]),t.action.results?i("table",{staticClass:"table is-striped"},[i("tbody",t._l(t.action.results,(function(n,o){return i("tr",{key:o},[i("td",{staticClass:"left",domProps:{innerHTML:t._s(n.roll)}}),i("td",{staticClass:"right",domProps:{innerHTML:t._s(n.result)}})])})),0)]):t._e()])},y=[],_={name:"Action",props:["action"]},k=_,C=(i("ed8b"),Object(v["a"])(k,g,y,!1,null,null,null)),I=C.exports,w={name:"InnovationDescription",props:["innovation"],components:{Action:I},methods:{getRange:function(t){return Object(b["a"])(Array(t).keys())}}},A=w,D=(i("9cec"),Object(v["a"])(A,f,h,!1,null,null,null)),T=D.exports,x={name:"Innovations",data:function(){return{showDeck:!1,showAddInnovation:!1,sortBy:"year"}},components:{InnovationAdd:m,InnovationDesc:T},computed:Object(s["a"])(Object(s["a"])({},Object(e["c"])(["innovations","innovated"])),{},{category:function(){return{starting:"is-black",science:"is-info",home:"is-danger",education:"is-success",faith:"is-light",art:"is-warning",music:"is-primary",other:"is-white"}},icon:function(){return{starting:"seedling",science:"flask",home:"home",education:"book-open",faith:"cross",art:"theater-masks",music:"music",other:"star"}},researched:function(){var t=this;return this.innovated.filter((function(t){return t.innovated})).map((function(n){return n.innovation=t.innovations.find((function(t){return t.id===n.id})),n})).sort((function(n,i){return n[t.sortBy]>i[t.sortBy]?1:i[t.sortBy]>n[t.sortBy]?-1:0}))},deck:function(){var t=this;return this.innovated.filter((function(t){return t.deck})).map((function(n){return n.innovation=t.innovations.find((function(t){return t.id===n.id})),n}))}}),methods:{innovatedThisYear:function(){var t=this;return this.innovated.filter((function(n){return n.year===t.campaign.year})).length>0},returnToDeck:function(t){var n=this;this.$buefy.dialog.confirm({message:"Are you sure?  This is a relatively rare event.  <br /><em>This will NOT remove any consequences of this Innovation from the deck.</em>",trapFocus:!0,closeOnConfirm:!0,onConfirm:function(){n.setLoading(!0),c["a"].collection("campaigns/".concat(n.campaign.id,"/innovations")).doc(t.id).update({deck:!0,innovated:!1,year:null}).then((function(){return n.setLoading(!1)}))}})},removeFromDeck:function(t){var n=this;this.$buefy.dialog.confirm({message:"Are you sure?  Removing Innovations from the deck is very rare.",trapFocus:!0,closeOnConfirm:!0,onConfirm:function(){n.setLoading(!0),c["a"].collection("campaigns/".concat(n.campaign.id,"/innovations")).doc(t.id).delete().then((function(){return n.setLoading(!1)}))}})},addToDeck:function(t){var n=this;this.showAddInnovation=!1,c["a"].collection("campaigns/".concat(this.campaign.id,"/innovations")).doc(t).set({deck:!0,innovated:!1,year:null}).then((function(){return n.$buefy.toast.open({message:"Added card to Innovation deck."})}))},promptAdd:function(){var t=this;this.$buefy.dialog.confirm({message:"This is pretty rare.  Are you sure?",trapFocus:!0,closeOnConfirm:!0,onConfirm:function(){t.showAddInnovation=!0}})},researchInnovation:function(t){var n=this,i=this.innovations.find((function(n){return t.id===n.id})),o="Research <strong>".concat(i.name,"</strong>?");this.innovatedThisYear()&&(o="Research <strong>".concat(i.name,"</strong>? <br /><em>You have already Innovated this year.  Make sure this is on purpose.</em>")),this.$buefy.dialog.confirm({message:o,trapFocus:!0,closeOnConfirm:!0,onConfirm:function(){var o;n.setLoading(!0),c["a"].collection("campaigns/".concat(n.campaign.id,"/innovations")).doc(t.id).update({deck:!1,innovated:!0,year:n.campaign.year}).then((function(){return n.setLoading(!1)})),null!==(o=i.consequences)&&void 0!==o&&o.length&&i.consequences.forEach((function(t){n.addToDeck(t)}))}})}}},L=x,O=(i("8dc7"),Object(v["a"])(L,o,a,!1,null,null,null));n["default"]=O.exports},d81d:function(t,n,i){"use strict";var o=i("23e7"),a=i("b727").map,s=i("1dde"),e=i("ae40"),c=s("map"),r=e("map");o({target:"Array",proto:!0,forced:!c||!r},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},ded9:function(t,n,i){},ed8b:function(t,n,i){"use strict";i("ded9")},f4ac:function(t,n,i){}}]);
//# sourceMappingURL=innovations.fc912b17.js.map