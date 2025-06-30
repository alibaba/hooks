---
title: useDeepCompareLayoutEffect
nav: Hooks
group:
  title: Effect
  order: 5
order: 9
toc: content
demo:
  cols: 2
---

Usage is the same as `useLayoutEffect`, but deps are compared with [react-fast-compare](https://www.npmjs.com/package/react-fast-compare).

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useDeepCompareLayoutEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
);
```
