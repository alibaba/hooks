---
title: useUpdateEffect
nav: Hooks
group:
  title: Effect
  order: 5
order: 1
toc: content
demo:
  cols: 2
---

A hook alike `useEffect` but skips running the effect for the first time.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

The API is exactly the same as `React.useEffect`.

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```
