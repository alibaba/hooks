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

Usage is the same as `useEffect`, but deps are compared with [lodash.isEqual](https://lodash.com/docs/4.17.15#isEqual).

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useDeepCompareEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
);
```
