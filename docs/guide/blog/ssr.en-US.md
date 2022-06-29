# React Hooks & SSR

Server-Side Rendering refers to the page processing technology where the HTML structure of the page is spliced on the server side. Generally used to solve SEO problems and speed up the first screen.

Since SSR executes JS code in a non-browser environment, there will be many problems. This article mainly introduces the common problems and solutions of React Hooks in SSR mode.

## Problem 1: DOM/BOM is missing

SSR is to run React code in a node environment, while global properties such as window, document, and navigator are not available at this time. If you use these properties directly, you will get errors like `window is not defined, document is not defined, navigator is not defined`, etc.

A common misuse is that global properties, such as document, are used directly during the execution of Hooks.

```js
import React, { useState } from 'react';

export default () => {
  const [state, setState] = useState(document.visibilityState);
  return state;
};
```

### Solution

1. Put the code of accessing the DOM/BOM in useEffect/useLayoutEffect (the server will not execute it) to avoid errors when the server executes, for example:

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

2. Differentiate the environments by `isBrowser`

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

## Problem 2: useLayoutEffect Warning

If `useLayoutEffect` is used, the following warning will appear in SSR mode

> ⚠️ Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://fb.me/react-uselayouteffect-ssr for common fixes.

### Solution

1. Use useEffect instead of useLayoutEffect (nonsense)
2. Dynamically specify whether to use useEffect or useLayoutEffect according to the environment. This is a hack solution from the community, currently in [react-redux](https://github.com/reduxjs/react-redux/blob/d16262582b2eeb62c05313fca3eb59dc0b395955/src/components/connectAdvanced.js#L40), [react-use](https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts), [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/blob/master/src/view/use-isomorphic-layout-effect.js).

```js
import { useLayoutEffect, useEffect } from 'react';
const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;
```

## Summary: Need to pay attention when writing Hooks

1. Do not use DOM/BOM properties directly in non-useEffect/useLayoutEffect
2. When using DOM/BOM properties other than useEffect/useLayoutEffect, use `isBrowser` to determine whether to execute in the browser environment
3. If a Hook needs to receive DOM/BOM properties, it needs to support passing the properties via a function type parameter. Take the useEventListener of ahooks as an example, it must support the function type to specify the target option.

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

4. Use `useIsomorphicLayoutEffect` instead of `useLayoutEffect`

## Reference

- [fix: useDocumentVisiblility support ssr](https://github.com/alibaba/hooks/pull/935/files)
- [UmiJS 服务端渲染](https://umijs.org/docs/ssr#window-is-not-defined-document-is-not-defined-navigator-is-not-defined)
- [useLayoutEffect and SSR](https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a)
