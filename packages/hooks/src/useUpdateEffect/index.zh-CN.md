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

`useUpdateEffect` 用法等同于 `useEffect`，但是会忽略首次执行，只在依赖更新时执行。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

API 与 `React.useEffect` 完全一致。

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```
