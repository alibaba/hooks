(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{"1DhI":function(e,t,n){"use strict";var r=n("uLvW"),u=n("sJN1"),a=n("cxPF"),c=n("FBt5"),i=e=>{c["a"]&&(Object(a["b"])(e)||console.error("useUnmount expected parameter is a function, got ".concat(typeof e)));var t=Object(u["a"])(e);Object(r["useEffect"])((()=>()=>{t.current()}),[])};t["a"]=i},"6iQ9":function(e,t,n){"use strict";var r=n("sJN1"),u=n("pL46"),a=n("OXPr");function c(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c=n.enable,i=void 0===c||c,o=Object(r["a"])(t);Object(a["a"])((()=>{if(i){var t=Object(u["a"])(n.target,window);if(null!==t&&void 0!==t&&t.addEventListener){var r=e=>o.current(e),a=Array.isArray(e)?e:[e];return a.forEach((e=>{t.addEventListener(e,r,{capture:n.capture,once:n.once,passive:n.passive})})),()=>{a.forEach((e=>{t.removeEventListener(e,r,{capture:n.capture})}))}}}}),[e,n.capture,n.once,n.passive,i],n.target)}t["a"]=c},"9D8e":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("iojd"),u=n("uLvW"),a=n("6iQ9");function c(e,t){var n=Object(u["useState"])(!1),c=Object(r["a"])(n,2),i=c[0],o=c[1],l=t||{},s=l.onFocus,f=l.onBlur,d=l.onChange;return Object(a["a"])("focusin",(e=>{i||(null===s||void 0===s||s(e),null===d||void 0===d||d(!0),o(!0))}),{target:e}),Object(a["a"])("focusout",(e=>{var t,n;!i||null!==(t=e.currentTarget)&&void 0!==t&&null!==(n=t.contains)&&void 0!==n&&n.call(t,e.relatedTarget)||(null===f||void 0===f||f(e),null===d||void 0===d||d(!1),o(!1))}),{target:e}),i}},FBt5:function(e,t,n){"use strict";var r=!1;t["a"]=r},OXPr:function(e,t,n){"use strict";var r=n("uLvW"),u=n("bnh6"),a=Object(u["a"])(r["useEffect"]);t["a"]=a},bnh6:function(e,t,n){"use strict";var r=n("uLvW"),u=n("1DhI"),a=n("j0E5"),c=n("pL46"),i=e=>{var t=(t,n,i)=>{var o=Object(r["useRef"])(!1),l=Object(r["useRef"])([]),s=Object(r["useRef"])([]),f=Object(r["useRef"])();e((()=>{var e,r=Array.isArray(i)?i:[i],u=r.map((e=>Object(c["a"])(e)));if(!o.current)return o.current=!0,l.current=u,s.current=n,void(f.current=t());u.length===l.current.length&&Object(a["a"])(l.current,u)&&Object(a["a"])(s.current,n)||(null===(e=f.current)||void 0===e||e.call(f),l.current=u,s.current=n,f.current=t())})),Object(u["a"])((()=>{var e;null===(e=f.current)||void 0===e||e.call(f),o.current=!1}))};return t};t["a"]=i},cxPF:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"b",(function(){return u})),n.d(t,"e",(function(){return a})),n.d(t,"a",(function(){return c})),n.d(t,"c",(function(){return i})),n.d(t,"f",(function(){return o}));var r=e=>null!==e&&"object"===typeof e,u=e=>"function"===typeof e,a=e=>"string"===typeof e,c=e=>"boolean"===typeof e,i=e=>"number"===typeof e,o=e=>"undefined"===typeof e},j0E5:function(e,t,n){"use strict";function r(e,t){if(e===t)return!0;for(var n=0;n<e.length;n++)if(!Object.is(e[n],t[n]))return!1;return!0}n.d(t,"a",(function(){return r}))},oEPf:function(e,t,n){"use strict";var r=!("undefined"===typeof window||!window.document||!window.document.createElement);t["a"]=r},pL46:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("cxPF"),u=n("oEPf");function a(e,t){var n;if(u["a"])return e?(n=Object(r["b"])(e)?e():"current"in e?e.current:e,n):t}},rpZe:function(e,t,n){"use strict";n.r(t);var r=n("9D8e"),u=n("uLvW"),a=n.n(u);t["default"]=()=>{var e=Object(r["a"])((()=>document.getElementById("focus-area")));return a.a.createElement("div",null,a.a.createElement("div",{id:"focus-area",style:{padding:16,backgroundColor:e?"red":"",border:"1px solid gray"}},a.a.createElement("label",{style:{display:"block"}},"First Name: ",a.a.createElement("input",null)),a.a.createElement("label",{style:{display:"block",marginTop:16}},"Last Name: ",a.a.createElement("input",null))),a.a.createElement("p",null,"isFocusWithin: ",JSON.stringify(e)))}},sJN1:function(e,t,n){"use strict";var r=n("uLvW");function u(e){var t=Object(r["useRef"])(e);return t.current=e,t}t["a"]=u},"vdy+":function(e,t,n){"use strict";n.r(t);var r=n("HUp4"),u=n("uLvW"),a=n.n(u),c=n("9D8e");t["default"]=()=>{var e=Object(u["useRef"])(null),t=Object(c["a"])(e,{onFocus:()=>{r["a"].info("focus")},onBlur:()=>{r["a"].info("blur")}});return a.a.createElement("div",null,a.a.createElement("div",{ref:e,style:{padding:16,backgroundColor:t?"red":"",border:"1px solid gray"}},a.a.createElement("label",{style:{display:"block"}},"First Name: ",a.a.createElement("input",null)),a.a.createElement("label",{style:{display:"block",marginTop:16}},"Last Name: ",a.a.createElement("input",null))),a.a.createElement("p",null,"isFocusWithin: ",JSON.stringify(t)))}}}]);