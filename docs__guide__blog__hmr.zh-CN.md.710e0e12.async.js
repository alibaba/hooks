(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{zmoc:function(e,t,a){"use strict";a.r(t);var n=a("uLvW"),c=a.n(n),l=a("rGwC"),r=a("bnfh"),d=c.a.memo((e=>{e.demos;return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"markdown"},c.a.createElement("h1",{id:"react-hooks--react-refreshhmr"},c.a.createElement(l["AnchorLink"],{to:"#react-hooks--react-refreshhmr","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"React Hooks & react-refresh\uff08HMR\uff09"),c.a.createElement("h2",{id:"\u4ec0\u4e48\u662f-react-refresh"},c.a.createElement(l["AnchorLink"],{to:"#\u4ec0\u4e48\u662f-react-refresh","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"\u4ec0\u4e48\u662f react-refresh"),c.a.createElement("p",null,c.a.createElement(l["Link"],{to:"https://github.com/pmmmwh/react-refresh-webpack-plugin"},"react-refresh-webpack-plugin")," \u662f React \u5b98\u65b9\u63d0\u4f9b\u7684\u4e00\u4e2a \u6a21\u5757\u70ed\u66ff\u6362\uff08HMR\uff09\u63d2\u4ef6\u3002"),c.a.createElement("blockquote",null,c.a.createElement("p",null,'A Webpack plugin to enable "Fast Refresh" (also previously known as Hot Reloading) for React components.')),c.a.createElement("p",null,"\u5728\u5f00\u53d1\u73af\u5883\u7f16\u8f91\u4ee3\u7801\u65f6\uff0creact-refresh \u53ef\u4ee5\u4fdd\u6301\u7ec4\u4ef6\u5f53\u524d\u72b6\u6001\uff0c\u4ec5\u4ec5\u53d8\u66f4\u7f16\u8f91\u7684\u90e8\u5206\u3002\u5728 ",c.a.createElement(l["Link"],{to:"https://umijs.org/zh-CN/docs/fast-refresh"},"umi")," \u4e2d\u53ef\u4ee5\u901a\u8fc7 ",c.a.createElement("code",null,"fastRefresh: ","{","}"),"\u5feb\u901f\u5f00\u542f\u8be5\u529f\u80fd\u3002"),c.a.createElement("p",null,c.a.createElement("img",{src:"https://camo.githubusercontent.com/244b53f735f2a78cfbce79a3914600840cdedac545e5f309d32ac7be4fdb2517/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303631353937363932382d33633832353564642d396165342d343933342d613833322d3965643934636565353762632e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753234363633316564266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d666173742d726566726573682e676966266f726967696e4865696768743d363136266f726967696e57696474683d31303030266f726967696e616c547970653d62696e6172792673697a653d35313534393234267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7565316263613762312d393035362d343431392d613438382d6231393365366236643936",alt:"fast-refresh.gif"})),c.a.createElement("p",null,"\u8fd9\u5f20 gif \u52a8\u56fe\u5c55\u793a\u7684\u662f\u4f7f\u7528 react-refresh \u7279\u6027\u7684\u5f00\u53d1\u4f53\u9a8c\uff0c\u53ef\u4ee5\u770b\u51fa\uff0c\u4fee\u6539\u7ec4\u4ef6\u4ee3\u7801\u540e\uff0c\u5df2\u7ecf\u586b\u5199\u7684\u7528\u6237\u540d\u548c\u5bc6\u7801\u4fdd\u6301\u4e0d\u53d8\uff0c\u4ec5\u4ec5\u53ea\u6709\u7f16\u8f91\u7684\u90e8\u5206\u53d8\u66f4\u4e86\u3002"),c.a.createElement("h2",{id:"react-refresh-\u7684\u7b80\u5355\u539f\u7406"},c.a.createElement(l["AnchorLink"],{to:"#react-refresh-\u7684\u7b80\u5355\u539f\u7406","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"react-refresh \u7684\u7b80\u5355\u539f\u7406"),c.a.createElement("p",null,"\u5bf9\u4e8e Class \u7c7b\u7ec4\u4ef6\uff0creact-refresh \u4f1a\u4e00\u5f8b\u91cd\u65b0\u5237\u65b0\uff08remount\uff09\uff0c\u5df2\u6709\u7684 state \u4f1a\u88ab\u91cd\u7f6e\u3002\u800c\u5bf9\u4e8e\u51fd\u6570\u7ec4\u4ef6\uff0creact-refresh \u5219\u4f1a\u4fdd\u7559\u5df2\u6709\u7684 state\u3002\u6240\u4ee5 react-refresh \u5bf9\u51fd\u6570\u7c7b\u7ec4\u4ef6\u4f53\u9a8c\u4f1a\u66f4\u597d\u3002 \u672c\u7bc7\u6587\u7ae0\u4e3b\u8981\u8bb2\u89e3 React Hooks \u5728 react-refresh \u6a21\u5f0f\u4e0b\u7684\u602a\u5f02\u884c\u4e3a\uff0c\u73b0\u5728\u6211\u6765\u770b\u4e0b react-refresh \u5bf9\u51fd\u6570\u7ec4\u4ef6\u7684\u5de5\u4f5c\u673a\u5236\u3002"),c.a.createElement("ul",null,c.a.createElement("li",null,"\u5728\u70ed\u66f4\u65b0\u65f6\u4e3a\u4e86\u4fdd\u6301\u72b6\u6001\uff0c",c.a.createElement("code",null,"useState")," \u548c ",c.a.createElement("code",null,"useRef")," \u7684\u503c\u4e0d\u4f1a\u66f4\u65b0\u3002"),c.a.createElement("li",null,"\u5728\u70ed\u66f4\u65b0\u65f6\uff0c",c.a.createElement(l["Link"],{to:"https://github.com/facebook/react/issues/21019#issuecomment-800650091"},"\u4e3a\u4e86\u89e3\u51b3\u67d0\u4e9b\u95ee\u9898"),"\uff0c",c.a.createElement("code",null,"useEffect"),"\u3001",c.a.createElement("code",null,"useCallback"),"\u3001",c.a.createElement("code",null,"useMemo")," \u7b49\u4f1a\u91cd\u65b0\u6267\u884c\u3002")),c.a.createElement("blockquote",null,c.a.createElement("p",null,'When we update the code, we need to "clean up" the effects that hold onto past values (e.g. passed functions), and "setup" the new ones with updated values. Otherwise, the values used by your effect would be stale and "disagree" with value used in your rendering, which makes Fast Refresh much less useful and hurts the ability to have it work with chains of custom Hooks.')),c.a.createElement("p",null,c.a.createElement("img",{src:"https://camo.githubusercontent.com/d9452c7cb9035fd422d9be908d1815ad25f0ca496d938fc3962d317c6d29fc61/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303631383030393232392d63656261323438342d656430612d343336392d393731612d3636353931383933313238642e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753737313339373665266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d4b617074757265253230323032312d30352d3130253230617425323031312e33372e35342e676966266f726967696e4865696768743d383736266f726967696e57696474683d31323534266f726967696e616c547970653d62696e6172792673697a653d31373038383131267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7561343663386239322d656234342d343862372d383634352d3738323232623438646464",alt:"Kapture 2021-05-10 at 11.37.54.gif"})),c.a.createElement("p",null,"\u5982\u4e0a\u56fe\u6240\u793a\uff0c\u5728\u6587\u672c\u4fee\u6539\u4e4b\u540e\uff0c",c.a.createElement("code",null,"state")," \u4fdd\u6301\u4e0d\u53d8\uff0c",c.a.createElement("code",null,"useEffect")," \u88ab\u91cd\u65b0\u6267\u884c\u4e86\u3002"),c.a.createElement("h2",{id:"react-refresh-\u5de5\u4f5c\u673a\u5236\u5bfc\u81f4\u7684\u95ee\u9898"},c.a.createElement(l["AnchorLink"],{to:"#react-refresh-\u5de5\u4f5c\u673a\u5236\u5bfc\u81f4\u7684\u95ee\u9898","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"react-refresh \u5de5\u4f5c\u673a\u5236\u5bfc\u81f4\u7684\u95ee\u9898"),c.a.createElement("p",null,"\u5728\u4e0a\u8ff0\u5de5\u4f5c\u673a\u5236\u4e0b\uff0c\u4f1a\u5e26\u6765\u5f88\u591a\u95ee\u9898\uff0c\u63a5\u4e0b\u6765\u6211\u4f1a\u4e3e\u51e0\u4e2a\u5177\u4f53\u7684\u4f8b\u5b50\u3002"),c.a.createElement("h3",{id:"\u7b2c\u4e00\u4e2a\u95ee\u9898"},c.a.createElement(l["AnchorLink"],{to:"#\u7b2c\u4e00\u4e2a\u95ee\u9898","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"\u7b2c\u4e00\u4e2a\u95ee\u9898"),c.a.createElement(r["a"],{code:"import React, { useEffect, useState } from 'react';\n\nexport default () => {\n  const [count, setState] = useState(0);\n\n  useEffect(() => {\n    setState((s) => s + 1);\n  }, []);\n\n  return <div>{count}</div>;\n};",lang:"js"}),c.a.createElement("p",null,"\u4e0a\u9762\u7684\u4ee3\u7801\u5f88\u7b80\u5355\uff0c\u5728\u6b63\u5e38\u6a21\u5f0f\u4e0b\uff0c",c.a.createElement("code",null,"count"),"\u503c\u6700\u5927\u4e3a ",c.a.createElement("code",null,"1"),"\u3002\u56e0\u4e3a ",c.a.createElement("code",null,"useEffect")," \u53ea\u4f1a\u5728\u521d\u59cb\u5316\u7684\u65f6\u5019\u6267\u884c\u4e00\u6b21\u3002 \u4f46\u5728 react-refresh \u6a21\u5f0f\u4e0b\uff0c\u6bcf\u6b21\u70ed\u66f4\u65b0\u7684\u65f6\u5019\uff0c",c.a.createElement("code",null,"state")," \u4e0d\u53d8\uff0c\u4f46 ",c.a.createElement("code",null,"useEffect")," \u91cd\u65b0\u6267\u884c\uff0c\u5c31\u4f1a\u5bfc\u81f4 ",c.a.createElement("code",null,"count")," \u7684\u503c\u4e00\u76f4\u5728\u9012\u589e\u3002"),c.a.createElement("p",null,c.a.createElement("img",{src:"https://camo.githubusercontent.com/82528f255af3a88133d66824de55dd1f6e665030caf0bae81291951d5fe75943/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303631393831313739312d34383161323862302d396262642d343938302d626635322d3731313561633336363262352e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753263313732313030266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d4b617074757265253230323032312d30352d3130253230617425323031322e30392e34372e676966266f726967696e4865696768743d383736266f726967696e57696474683d31323534266f726967696e616c547970653d62696e6172792673697a653d31333532383932267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7533346432653861302d333430642d346638632d383039302d6232346638303433623266",alt:"Kapture 2021-05-10 at 12.09.47.gif"})),c.a.createElement("p",null,"\u5982\u4e0a\u56fe\u6240\u793a\uff0c",c.a.createElement("code",null,"count")," \u968f\u7740\u6bcf\u4e00\u6b21\u70ed\u66f4\u65b0\u5728\u9012\u589e\u3002"),c.a.createElement("h3",{id:"\u7b2c\u4e8c\u4e2a\u95ee\u9898"},c.a.createElement(l["AnchorLink"],{to:"#\u7b2c\u4e8c\u4e2a\u95ee\u9898","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"\u7b2c\u4e8c\u4e2a\u95ee\u9898"),c.a.createElement("p",null,"\u5982\u679c\u4f60\u4f7f\u7528\u4e86 ",c.a.createElement(l["Link"],{to:"https://github.com/alibaba/hooks/blob/release/v2.x/packages/hooks/src/useUpdateEffect/index.ts"},"ahooks v2")," \u6216\u8005 ",c.a.createElement(l["Link"],{to:"https://github.com/streamich/react-use/blob/master/docs/useUpdateEffect.md"},"react-use")," \u7684 ",c.a.createElement("code",null,"useUpdateEffect"),"\uff0c\u5728\u70ed\u66f4\u65b0\u6a21\u5f0f\u4e0b\u4e5f\u4f1a\u6709\u4e0d\u7b26\u5408\u9884\u671f\u7684\u884c\u4e3a\u3002"),c.a.createElement(r["a"],{code:"import React, { useEffect } from 'react';\nimport useUpdateEffect from './useUpdateEffect';\n\nexport default () => {\n  useEffect(() => {\n    console.log('\u6267\u884c\u4e86 useEffect');\n  }, []);\n\n  useUpdateEffect(() => {\n    console.log('\u6267\u884c\u4e86 useUpdateEffect');\n  }, []);\n\n  return <div>hello world</div>;\n};",lang:"javascript"}),c.a.createElement("p",null,c.a.createElement("code",null,"useUpdateEffect")," \u4e0e ",c.a.createElement("code",null,"useEffect"),"\u76f8\u6bd4\uff0c\u5b83\u4f1a\u5ffd\u7565\u7b2c\u4e00\u6b21\u6267\u884c\uff0c\u53ea\u6709\u5728 deps \u53d8\u5316\u65f6\u624d\u4f1a\u6267\u884c\u3002\u4ee5\u4e0a\u4ee3\u7801\u7684\u5728\u6b63\u5e38\u6a21\u5f0f\u4e0b\uff0c",c.a.createElement("code",null,"useUpdateEffect")," \u662f\u6c38\u8fdc\u4e0d\u4f1a\u6267\u884c\u7684\uff0c\u56e0\u4e3a deps \u662f\u7a7a\u6570\u7ec4\uff0c\u6c38\u8fdc\u4e0d\u4f1a\u53d8\u5316\u3002 \u4f46\u5728 react-refresh \u6a21\u5f0f\u4e0b\uff0c\u70ed\u66f4\u65b0\u65f6\uff0c",c.a.createElement("code",null,"useUpdateEffect")," \u548c ",c.a.createElement("code",null,"useEffect")," \u540c\u65f6\u6267\u884c\u4e86\u3002"),c.a.createElement("p",null,c.a.createElement("img",{src:"https://camo.githubusercontent.com/18000e2859234c5ca4d7613985dab82cba0a654cca53a9df5bc63dfcd126cce7/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032312f6769662f3138393335302f313632303632303739373138392d36613561366434302d616637372d343339642d616462632d3230666430343664636663302e67696623636c69656e7449643d7563376235663533362d656661652d342666726f6d3d64726f702669643d753065323737343631266d617267696e3d2535426f626a6563742532304f626a656374253544266e616d653d4b617074757265253230323032312d30352d3130253230617425323031322e32362e31392e676966266f726967696e4865696768743d383736266f726967696e57696474683d31323534266f726967696e616c547970653d62696e6172792673697a653d373937383135267374617475733d646f6e65267374796c653d6e6f6e65267461736b49643d7564613336343363622d386435312d346437322d626461322d3362333431353762313530",alt:"Kapture 2021-05-10 at 12.26.19.gif"})),c.a.createElement("p",null,"\u9020\u6210\u8fd9\u4e2a\u95ee\u9898\u7684\u539f\u56e0\uff0c\u5c31\u662f ",c.a.createElement("code",null,"useUpdateEffect")," \u7528 ",c.a.createElement("code",null,"ref")," \u6765\u8bb0\u5f55\u4e86\u5f53\u524d\u662f\u4e0d\u662f\u7b2c\u4e00\u6b21\u6267\u884c\uff0c\u89c1\u4e0b\u9762\u7684\u4ee3\u7801\u3002"),c.a.createElement(r["a"],{code:"import { useEffect, useRef } from 'react';\n\nconst useUpdateEffect: typeof useEffect = (effect, deps) => {\n  const isMounted = useRef(false);\n\n  useEffect(() => {\n    if (!isMounted.current) {\n      isMounted.current = true;\n    } else {\n      return effect();\n    }\n  }, deps);\n};\n\nexport default useUpdateEffect;",lang:"javascript"}),c.a.createElement("p",null,"\u4e0a\u9762\u4ee3\u7801\u7684\u5173\u952e\u5728 ",c.a.createElement("code",null,"isMounted")),c.a.createElement("ul",null,c.a.createElement("li",null,"\u521d\u59cb\u5316\u65f6\uff0c",c.a.createElement("code",null,"useEffect")," \u6267\u884c\uff0c\u6807\u8bb0 ",c.a.createElement("code",null,"isMounted")," \u4e3a ",c.a.createElement("code",null,"true")),c.a.createElement("li",null,"\u70ed\u66f4\u65b0\u540e\uff0c",c.a.createElement("code",null,"useEffect")," \u91cd\u65b0\u6267\u884c\u4e86\uff0c\u6b64\u65f6 ",c.a.createElement("code",null,"isMounted")," \u4e3a ",c.a.createElement("code",null,"true"),"\uff0c\u5c31\u5f80\u4e0b\u6267\u884c\u4e86")),c.a.createElement("h3",{id:"\u7b2c\u4e09\u4e2a\u95ee\u9898"},c.a.createElement(l["AnchorLink"],{to:"#\u7b2c\u4e09\u4e2a\u95ee\u9898","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"\u7b2c\u4e09\u4e2a\u95ee\u9898"),c.a.createElement("p",null,"\u6700\u521d\u53d1\u73b0\u8fd9\u4e2a\u95ee\u9898\uff0c\u662f ahooks \u7684 ",c.a.createElement("code",null,"useRequest")," \u5728\u70ed\u66f4\u65b0\u540e\uff0c",c.a.createElement("code",null,"loading")," \u4f1a\u4e00\u76f4\u4e3a ",c.a.createElement("code",null,"true"),"\u3002\u7ecf\u8fc7\u5206\u6790\uff0c\u539f\u56e0\u5c31\u662f\u4f7f\u7528 ",c.a.createElement("code",null,"isUnmount")," ref \u6765\u6807\u8bb0\u7ec4\u4ef6\u662f\u5426\u5378\u8f7d\u3002"),c.a.createElement(r["a"],{code:"import React, { useEffect, useState } from 'react';\n\nfunction getUsername() {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve('test');\n    }, 1000);\n  });\n}\n\nexport default function IndexPage() {\n  const isUnmount = React.useRef(false);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    setLoading(true);\n    getUsername().then(() => {\n      if (isUnmount.current === false) {\n        setLoading(false);\n      }\n    });\n    return () => {\n      isUnmount.current = true;\n    };\n  }, []);\n\n  return loading ? <div>loading</div> : <div>hello world</div>;\n}",lang:"javascript"}),c.a.createElement("p",null,"\u5982\u4e0a\u4ee3\u7801\u6240\u793a\uff0c\u5728\u70ed\u66f4\u65b0\u65f6\uff0c",c.a.createElement("code",null,"isUnmount.current")," \u53d8\u4e3a\u4e86 ",c.a.createElement("code",null,"true"),"\uff0c\u5bfc\u81f4\u4e8c\u6b21\u6267\u884c\u65f6\uff0c\u4ee3\u7801\u4ee5\u4e3a\u7ec4\u4ef6\u5df2\u7ecf\u5378\u8f7d\u4e86\uff0c\u4e0d\u518d\u54cd\u5e94\u5f02\u6b65\u64cd\u4f5c\u3002"),c.a.createElement("h2",{id:"\u5982\u4f55\u89e3\u51b3\u8fd9\u4e9b\u95ee\u9898"},c.a.createElement(l["AnchorLink"],{to:"#\u5982\u4f55\u89e3\u51b3\u8fd9\u4e9b\u95ee\u9898","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"\u5982\u4f55\u89e3\u51b3\u8fd9\u4e9b\u95ee\u9898"),c.a.createElement("h3",{id:"\u65b9\u6848\u4e00"},c.a.createElement(l["AnchorLink"],{to:"#\u65b9\u6848\u4e00","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"\u65b9\u6848\u4e00"),c.a.createElement("p",null,"\u7b2c\u4e00\u4e2a\u89e3\u51b3\u65b9\u6848\u662f\u4ece\u4ee3\u7801\u5c42\u9762\u89e3\u51b3\uff0c\u4e5f\u5c31\u662f\u8981\u6c42\u6211\u4eec\u5728\u5199\u4ee3\u7801\u7684\u65f6\u5019\uff0c\u65f6\u65f6\u80fd\u60f3\u8d77\u6765 react-refresh \u6a21\u5f0f\u4e0b\u7684\u602a\u5f02\u884c\u4e3a\u3002 \u6bd4\u5982 ",c.a.createElement("code",null,"useUpdateEffect")," \u6211\u4eec\u5c31\u53ef\u4ee5\u5728\u521d\u59cb\u5316\u6216\u8005\u70ed\u66ff\u6362\u65f6\uff0c\u5c06 ",c.a.createElement("code",null,"isMounted")," ref \u521d\u59cb\u5316\u6389\u3002\u5982\u4e0b\uff1a"),c.a.createElement(r["a"],{code:"import { useEffect, useRef } from 'react';\n\nconst useUpdateEffect: typeof useEffect = (effect, deps) => {\n  const isMounted = useRef(false);\n\n+  useEffect(() => {\n+  \tisMounted.current = false;\n+  }, []);\n\n  useEffect(() => {\n    if (!isMounted.current) {\n      isMounted.current = true;\n    } else {\n      return effect();\n    }\n  }, deps);\n};\n\nexport default useUpdateEffect;",lang:"diff"}),c.a.createElement("p",null,"\u8fd9\u4e2a\u65b9\u6848\u5bf9\u4e0a\u9762\u7684\u95ee\u9898\u4e8c\u548c\u4e09\u90fd\u662f\u6709\u6548\u7684\u3002"),c.a.createElement("h3",{id:"\u65b9\u6848\u4e8c"},c.a.createElement(l["AnchorLink"],{to:"#\u65b9\u6848\u4e8c","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"\u65b9\u6848\u4e8c"),c.a.createElement("p",null,"\u6839\u636e",c.a.createElement(l["Link"],{to:"https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md#reset"},"\u5b98\u65b9\u6587\u6863"),"\uff0c\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u5728\u6587\u4ef6\u4e2d\u6dfb\u52a0\u4ee5\u4e0b\u6ce8\u91ca\u6765\u89e3\u51b3\u8fd9\u4e2a\u95ee\u9898\u3002"),c.a.createElement(r["a"],{code:"/* @refresh reset */",lang:"javascript"}),c.a.createElement("p",null,"\u6dfb\u52a0\u8fd9\u4e2a\u95ee\u9898\u540e\uff0c\u6bcf\u6b21\u70ed\u66f4\u65b0\uff0c\u90fd\u4f1a remount\uff0c\u4e5f\u5c31\u662f\u7ec4\u4ef6\u91cd\u65b0\u6267\u884c\u3002",c.a.createElement("code",null,"useState")," \u548c ",c.a.createElement("code",null,"useRef")," \u4e5f\u4f1a\u91cd\u7f6e\u6389\uff0c\u4e5f\u5c31\u4e0d\u4f1a\u51fa\u73b0\u4e0a\u9762\u7684\u95ee\u9898\u4e86\u3002"),c.a.createElement("h2",{id:"\u5b98\u65b9\u6001\u5ea6"},c.a.createElement(l["AnchorLink"],{to:"#\u5b98\u65b9\u6001\u5ea6","aria-hidden":"true",tabIndex:-1},c.a.createElement("span",{className:"icon icon-link"})),"\u5b98\u65b9\u6001\u5ea6"),c.a.createElement("p",null,"\u672c\u6765 React Hooks \u5df2\u7ecf\u6709\u86ee\u591a\u6f5c\u89c4\u5219\u4e86\uff0c\u5728\u4f7f\u7528 react-refresh \u65f6\uff0c\u8fd8\u6709\u6f5c\u89c4\u5219\u8981\u6ce8\u610f\u3002\u4f46\u5b98\u65b9\u56de\u590d\u8bf4\u8fd9\u662f\u9884\u671f\u884c\u4e3a\uff0c\u89c1\u8be5 ",c.a.createElement(l["Link"],{to:"https://github.com/facebook/react/issues/21019"},"issue"),"\u3002"),c.a.createElement("blockquote",null,c.a.createElement("p",null,'Effects are not exactly "mount"/"unmount" \u2014 they\'re more like "show"/"hide".'))))}));t["default"]=e=>{var t=c.a.useContext(l["context"]),a=t.demos;return c.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&l["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),c.a.createElement(d,{demos:a})}}}]);