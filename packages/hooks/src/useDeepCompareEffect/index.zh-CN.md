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

用法与 useEffect 一致，但 deps 通过 [react-fast-compare](https://www.npmjs.com/package/react-fast-compare) 进行深比较。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useDeepCompareEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
);
```
