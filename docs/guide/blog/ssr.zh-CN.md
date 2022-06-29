# React Hooks & SSR

服务端渲染（Server-Side Rendering），是指由服务侧完成页面的 HTML 结构拼接的页面处理技术。一般用于解决 SEO 问题和首屏加载速度问题。

由于 SSR 是在非浏览器环境执行 JS 代码，所以会出现很多问题。本文主要介绍 React Hooks 在 SSR 模式下常见问题及解决方案。

> 更多关于 SSR 的介绍可以看 UmiJS 的文档《[服务端渲染（SSR）](https://umijs.org/zh-CN/docs/ssr#服务端渲染（ssr）)》。

## 问题一：DOM/BOM 缺失

SSR 是在 node 环境下运行 React 代码，而此时 window、document、navigator 等全局属性没有。如果直接使用了这些属性，就会报错 `window is not defined, document is not defined, navigator is not defined` 等。

常见的错误用法是在 Hooks 执行过程中，直接使用了 document 等全局属性。

```js
import React, { useState } from 'react';

export default () => {
  const [state, setState] = useState(document.visibilityState);
  return state;
};
```

### 解决方案

1. 将访问 DOM/BOM 的方法放在 useEffect/useLayoutEffect 中（服务端不会执行），避免服务端执行时报错，例如：

```js
import React, { useState, useEffect } from 'react';

export default () => {
  const [state, setState] = useState();

  useEffect(() => {
    setState(document.visibilityState);
  }, []);

  return state;
};
```

2. 通过 `isBrowser` 来做环境判断

```js
import React, { useState } from 'react';

function isBrowser() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export default () => {
  const [state, setState] = useState(isBrowser() && document.visibilityState);

  return state;
};
```

## 问题二 useLayoutEffect Warning

如果使用了 `useLayoutEffect`，在 SSR 模式下，会出现以下警告

> ⚠️ Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://fb.me/react-uselayouteffect-ssr for common fixes.

### 解决方案

1. 使用 useEffect 代替 useLayoutEffect（废话）
2. 根据环境动态的指定是使用 useEffect 还是 useLayoutEffect。这是来自社区的一种 hack 解决方案，目前在 [react-redux](https://github.com/reduxjs/react-redux/blob/d16262582b2eeb62c05313fca3eb59dc0b395955/src/components/connectAdvanced.js#L40)、[react-use](https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts)、[react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/blob/master/src/view/use-isomorphic-layout-effect.js) 均使用的这种方案。

```js
import { useLayoutEffect, useEffect } from 'react';
const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;
```

## 总结：写 Hooks 时需要注意

1. 不要在非 useEffect/useLayoutEffect 中，直接使用 DOM/BOM 属性
2. 在非 useEffect/useLayoutEffect 使用 DOM/BOM 属性时，使用 `isBrowser` 判断是否在浏览器环境执行
3. 如果某个 Hook 需要接收 DOM/BOM 属性，需要支持函数形式传参。以 ahooks 的 useEventListener 举例，必须支持函数形式来指定 target 属性。

```diff
import React, { useState } from 'react';
import { useEventListener } from 'ahooks';

export default () => {
  const [value, setValue] = useState(0);

  const clickHandler = () => {
    setValue(value + 1);
  };

  useEventListener(
    'click',
    clickHandler,
    {
-       target: document.getElementById('click-btn')
+       target: () => document.getElementById('click-btn')
    }
  );

  return (
    <button id="click-btn" type="button">
      You click {value} times
    </button>
  );
};
```

4. 使用 `useIsomorphicLayoutEffect` 来代替 `useLayoutEffect`

## 参考资料

- [fix: useDocumentVisiblility support ssr](https://github.com/alibaba/hooks/pull/935/files)
- [UmiJS 服务端渲染](https://umijs.org/zh-CN/docs/ssr#window-is-not-defined-document-is-not-defined-navigator-is-not-defined)
- [useLayoutEffect and SSR](https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a)
