---
title: useIsomorphicLayoutEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useIsomorphicLayoutEffect

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

In SSR mode, the following warning will appear when use useLayoutEffect

> ⚠️ Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://fb.me/react-uselayouteffect-ssr for common fixes.

To avoid this warning, useIsomorphicLayoutEffect can be used instead of useLayoutEffect.


The source code of useIsomorphicLayoutEffect is:

```javascript
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
```

UseEffect is returned in a non-browser environment, and useLayoutEffect is returned in a browser environment.

For more information, please refer to [useLayoutEffect and SSR](https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a)