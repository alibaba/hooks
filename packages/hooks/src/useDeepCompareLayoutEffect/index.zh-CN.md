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

# useDeepCompareLayoutEffect

用法与 useLayoutEffect 一致，但 deps 通过 [lodash isEqual](https://lodash.com/docs/4.17.15#isEqual) 进行深比较。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useDeepCompareLayoutEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
);
```
