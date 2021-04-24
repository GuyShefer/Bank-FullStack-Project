(this["webpackJsonpbank-project"]=this["webpackJsonpbank-project"]||[]).push([[0],{63:function(e,t,c){},64:function(e,t,c){},65:function(e,t,c){},72:function(e,t,c){},74:function(e,t,c){},93:function(e,t,c){},96:function(e,t,c){},97:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c(27),r=c.n(a),s=(c(63),c(64),c(31)),i=c(7),j=(c(65),c(1)),o=function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("header",{className:"header",children:Object(j.jsx)(s.b,{to:"/",children:Object(j.jsx)("div",{className:"logo",children:"Bank Project"})})})})},l=(c(72),function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("footer",{className:"footer",children:[Object(j.jsx)("a",{className:"footer-link",target:"_blank",rel:"noreferrer",href:"https://github.com/GuyShefer",children:"Github"}),Object(j.jsx)("a",{className:"footer-link",target:"_blank",rel:"noreferrer",href:"https://www.linkedin.com/in/guy-shefer-5330791b3/",children:"Linkedin"})]})})}),d=c(14),b=c.n(d),h=c(28),u=c(15),O=(c(74),c(36)),x=c(20),p=c.n(x),f=function(){var e=Object(n.useState)([]),t=Object(u.a)(e,2),c=t[0],a=t[1];return Object(n.useEffect)((function(){(function(){var e=Object(h.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("https://bank-fullstack-project.herokuapp.com/api/bank");case 2:t=e.sent,a(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("div",{className:"users-table",children:Object(j.jsxs)(O.a,{striped:!0,bordered:!0,hover:!0,variant:"dark",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"#"}),Object(j.jsx)("th",{children:"Email"}),Object(j.jsx)("th",{children:"Cash"}),Object(j.jsx)("th",{children:"Credit"}),Object(j.jsx)("th",{children:"Active"}),Object(j.jsx)("th",{children:"Actions"})]})}),Object(j.jsx)("tbody",{children:c.map((function(e,t){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:t+1}),Object(j.jsx)("td",{children:e.email}),Object(j.jsx)("td",{children:e.cash}),Object(j.jsx)("td",{children:e.credit}),Object(j.jsx)("td",{children:e.isActive?Object(j.jsx)("i",{className:"fas fa-user-check"}):Object(j.jsx)("i",{className:"fas fa-user-alt-slash"})}),Object(j.jsx)("td",{className:"action",children:Object(j.jsx)(s.b,{to:{pathname:"/user-actions/".concat(e._id),user:e},children:Object(j.jsx)("i",{className:"fas fa-external-link-alt"})})})]},t)}))})]})})})},m=(c(93),c(30)),k=c(42),v=c(24),g=c(9),C=c(16),y=function(){var e=Object(n.useState)(!1),t=Object(u.a)(e,2),c=t[0],a=t[1],r=Object(n.useState)({email:"",cash:0,credit:0,isActive:!1}),s=Object(u.a)(r,2),i=s[0],o=s[1],l=function(){a(!1)},d=function(){var e=Object(h.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.a.post("https://bank-fullstack-project.herokuapp.com/api/bank",i);case 3:t=e.sent,console.log(t.data),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:o({email:"",cash:0,credit:0,isActive:!1}),l();case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("main",{className:"main",children:[Object(j.jsx)(k.a,{collapseOnSelect:!0,expand:"lg",bg:"light",variant:"light",children:Object(j.jsx)(m.a,{className:"mr-auto",children:Object(j.jsx)(v.a,{variant:"outline-info",onClick:function(e){a(!0)},children:"Add New User"})})}),Object(j.jsxs)(g.a,{show:c,onHide:l,centered:!0,children:[Object(j.jsx)(g.a.Header,{closeButton:!0,children:Object(j.jsx)(g.a.Title,{children:"Create New User"})}),Object(j.jsxs)(g.a.Body,{children:[Object(j.jsx)(C.a.Label,{children:"Email address :"}),Object(j.jsx)(C.a.Control,{type:"email",placeholder:"Enter email",required:!0,onChange:function(e){return o({email:e.target.value,cash:i.cash,credit:i.credit,isActive:i.isActive})}}),Object(j.jsx)("br",{}),Object(j.jsx)(C.a.Label,{children:"Cash :"}),Object(j.jsx)(C.a.Control,{type:"number",min:"0",placeholder:"Enter Amount Of Cash",onChange:function(e){return o({email:i.email,cash:e.target.value,credit:i.credit,isActive:i.isActive})}}),Object(j.jsx)("br",{}),Object(j.jsx)(C.a.Label,{children:"Credit :"}),Object(j.jsx)(C.a.Control,{type:"number",min:"0",placeholder:"Enter Credit Number",onChange:function(e){return o({email:i.email,cash:i.cash,credit:e.target.value,isActive:i.isActive})}}),Object(j.jsx)("br",{}),Object(j.jsx)(C.a.Check,{type:"checkbox",label:"Active",onChange:function(e){return o({email:i.email,cash:i.cash,credit:i.credit,isActive:e.target.checked})}})]}),Object(j.jsxs)(g.a.Footer,{children:[Object(j.jsx)(v.a,{variant:"secondary",onClick:l,children:"Close"}),Object(j.jsx)(v.a,{variant:"primary",onClick:d,children:"Send"})]})]}),Object(j.jsx)("div",{className:"usersTable",children:Object(j.jsx)(f,{})})]})})},w=(c(95),c(96),function(e){var t=Object(n.useState)(e.history.location.user),c=Object(u.a)(t,1)[0],a=Object(n.useState)([]),r=Object(u.a)(a,2),s=r[0],i=r[1],o=Object(n.useState)(!1),l=Object(u.a)(o,2),d=l[0],x=l[1],f=Object(n.useState)(0),y=Object(u.a)(f,2),w=y[0],N=y[1],A=Object(n.useState)(""),S=Object(u.a)(A,2),_=S[0],L=S[1],B=Object(n.useState)(!1),E=Object(u.a)(B,2),F=E[0],H=E[1],T=Object(n.useState)(""),U=Object(u.a)(T,2),I=U[0],D=U[1],M=function(){x(!1),H(!1)},G=function(e){L(e.target.innerHTML),x(!0)};Object(n.useEffect)((function(){(function(){var e=Object(h.a)(b.a.mark((function e(t){var c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("https://bank-fullstack-project.herokuapp.com/api/bank/getUserOperationHistory/".concat(t));case 2:c=e.sent,i(c.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}})()(c._id)}),[c._id,w]);var J=function(){var e=Object(h.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Withdraw"!==_){e.next=6;break}return e.next=3,p.a.put("https://bank-fullstack-project.herokuapp.com/api/bank/withdrawCash",{id:c._id,cash:w});case 3:t=e.sent,e.next=16;break;case 6:if("Deposite"!==_){e.next=12;break}return e.next=9,p.a.put("https://bank-fullstack-project.herokuapp.com/api/bank/deposite",{id:c._id,cash:w});case 9:t=e.sent,e.next=16;break;case 12:if("Update Credit"!==_){e.next=16;break}return e.next=15,p.a.put("https://bank-fullstack-project.herokuapp.com/api/bank/updateCredit",{id:c._id,credit:w});case 15:t=e.sent;case 16:console.log(t.data),N(0),x(!1);case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),W=function(){var e=Object(h.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.put("https://bank-fullstack-project.herokuapp.com/api/bank/transferring",{receivingUserId:I,sendingUserId:c._id,amount:w});case 2:t=e.sent,console.log(t.data),N(0),H(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"userActionsContainer",children:[Object(j.jsx)(k.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark",children:Object(j.jsxs)(m.a,{className:"mr-auto",children:[Object(j.jsx)(m.a.Link,{onClick:G,children:"Withdraw"}),Object(j.jsx)(m.a.Link,{onClick:G,children:"Deposite"}),Object(j.jsx)(m.a.Link,{onClick:G,children:"Update Credit"}),Object(j.jsx)(m.a.Link,{onClick:function(){H(!0)},children:"Transfer Money"})]})}),Object(j.jsx)("div",{className:"operations-table",children:Object(j.jsxs)(O.a,{striped:!0,bordered:!0,hover:!0,size:"sm",className:"oper-table",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"#"}),Object(j.jsx)("th",{children:"Type"}),Object(j.jsx)("th",{children:"Description"})]})}),Object(j.jsx)("tbody",{children:s.map((function(e,t){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:t+1}),Object(j.jsx)("td",{children:e.operation_type}),Object(j.jsx)("td",{children:e.description})]},t)}))})]})}),Object(j.jsxs)(g.a,{show:d,onHide:M,centered:!0,children:[Object(j.jsx)(g.a.Header,{closeButton:!0,children:Object(j.jsx)(g.a.Title,{children:_})}),Object(j.jsx)(g.a.Body,{children:Object(j.jsx)(C.a.Control,{type:"number",value:w,min:"0",onChange:function(e){return N(e.target.value)}})}),Object(j.jsxs)(g.a.Footer,{children:[Object(j.jsx)(v.a,{variant:"secondary",onClick:M,children:"Close"}),Object(j.jsx)(v.a,{variant:"primary",onClick:J,children:"Send"})]})]}),Object(j.jsxs)(g.a,{show:F,onHide:M,centered:!0,children:[Object(j.jsx)(g.a.Header,{closeButton:!0,children:Object(j.jsx)(g.a.Title,{children:"Transferr Money"})}),Object(j.jsxs)(g.a.Body,{children:[Object(j.jsx)(C.a.Control,{type:"text",value:I,placeholder:"Reciving User Id",onChange:function(e){return D(e.target.value)}}),Object(j.jsx)("br",{}),Object(j.jsx)(C.a.Control,{type:"number",value:w,min:"0",placeholder:"Amount",onChange:function(e){return N(e.target.value)}})]}),Object(j.jsxs)(g.a.Footer,{children:[Object(j.jsx)(v.a,{variant:"secondary",onClick:M,children:"Close"}),Object(j.jsx)(v.a,{variant:"primary",onClick:W,children:"Send"})]})]})]})})});var N=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)(s.a,{children:[Object(j.jsx)(o,{}),Object(j.jsxs)("div",{children:[Object(j.jsx)(i.a,{path:"/",exact:!0,component:y}),Object(j.jsx)(i.a,{path:"/user-actions/:id",exact:!0,component:w})]}),Object(j.jsx)(l,{})]})})};r.a.render(Object(j.jsx)(N,{}),document.getElementById("root"))}},[[97,1,2]]]);
//# sourceMappingURL=main.8a529dff.chunk.js.map