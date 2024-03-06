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

用法与 useEffect 一致，但 deps 通过 [lodash isEqual](https://lodash.com/docs/4.17.15#isEqual) 进行深比较。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useDeepCompareEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
);
```
