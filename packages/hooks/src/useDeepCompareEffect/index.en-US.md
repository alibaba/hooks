---
title: useDeepCompareEffect
nav: Hooks
group:
  title: Effect
  order: 5
order: 8
toc: content
demo:
  cols: 2
---

Usage is the same as `useEffect`, but deps are compared with [react-fast-compare](https://www.npmjs.com/package/react-fast-compare).

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useDeepCompareEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
);
```
