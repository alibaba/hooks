---
title: useUpdateLayoutEffect
nav: Hooks
group:
  title: Effect
  order: 5
order: 2
toc: content
demo:
  cols: 2
---

# useUpdateLayoutEffect

A hook alike `useLayoutEffect` but skips running the effect for the first time.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

The API is exactly the same as `React.useLayoutEffect`.

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```
