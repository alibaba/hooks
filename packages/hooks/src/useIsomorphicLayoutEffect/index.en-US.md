---
nav:
  path: /hooks
---

# useIsomorphicLayoutEffect

In SSR mode, the following warning will appear when useLayoutEffect is used

> ⚠️ Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://fb.me/react-uselayouteffect-ssr for common fixes.

To avoid this warning, useIsomorphicLayoutEffect can be used instead of useLayoutEffect.

The source code of useIsomorphicLayoutEffect is:

```javascript
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : noop;
```

Return useLayoutEffect for browser environment and a no-op in non-browser environments to avoid SSR warnings.

For more information, please refer to [useLayoutEffect and SSR](https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a)
