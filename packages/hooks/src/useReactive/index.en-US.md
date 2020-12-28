---
title: useReactive
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

## useReactive

It offers data reactivity when manipulating states and views, in which case `useState`  is unnecessary for state definition. Modifying properties will automatically lead to view rerendering.

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

### Array

<code src="./demo/demo2.tsx" />

### Computed Properties

<code src="./demo/demo3.tsx" />

### notice

<code  src="./demo/demo4.tsx" desc="`useReactive` returns a proxy object which always has the same reference. If `useEffect`, `useMemo`, `useCallback` and props passed to child component rely on the proxy, none of the above will be invoked by any changes to the proxy."  />

## API

```js
const state = useReactive(initialValue:object);
```

## Params

| Params       | Description   | Type     | Default |
|--------------|---------------|----------|---------|
| initialState | current state | `object` | -       |

