(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{"25QV":function(e,t,n){"use strict";var r=n("uLvW"),u=()=>{var e=Object(r["useRef"])(!1);return Object(r["useEffect"])((()=>(e.current=!1,()=>{e.current=!0})),[]),e};t["a"]=u},"CyT/":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("iojd"),u=n("uLvW"),a=n("L2hj");function c(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=Object(a["a"])(!!e),n=Object(r["a"])(t,2),c=n[0],o=n[1],s=o.toggle,i=o.set,l=Object(u["useMemo"])((()=>{var e=()=>i(!0),t=()=>i(!1);return{toggle:s,set:e=>i(!!e),setTrue:e,setFalse:t}}),[]);return[c,l]}},L2hj:function(e,t,n){"use strict";var r=n("iojd"),u=n("uLvW");function a(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0,n=Object(u["useState"])(e),a=Object(r["a"])(n,2),c=a[0],o=a[1],s=Object(u["useMemo"])((()=>{var n=void 0===t?!e:t,r=()=>o((t=>t===e?n:e)),u=e=>o(e),a=()=>o(e),c=()=>o(n);return{toggle:r,set:u,setLeft:a,setRight:c}}),[]);return[c,s]}t["a"]=a},gT5F:function(e,t,n){"use strict";n.r(t);var r=n("iojd"),u=n("HUp4"),a=n("25QV"),c=n("CyT/"),o=n("uLvW"),s=n.n(o),i=()=>{var e=Object(a["a"])();return Object(o["useEffect"])((()=>{setTimeout((()=>{e.current||u["a"].info("component is alive")}),3e3)}),[]),s.a.createElement("p",null,"Hello World!")};t["default"]=()=>{var e=Object(c["a"])(!0),t=Object(r["a"])(e,2),n=t[0],u=t[1].toggle;return s.a.createElement(s.a.Fragment,null,s.a.createElement("button",{type:"button",onClick:u},n?"unmount":"mount"),n&&s.a.createElement(i,null))}}}]);