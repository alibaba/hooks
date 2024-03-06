---
title: useTrackedEffect
nav: Hooks
group:
  title: Dev
  order: 8
order: 1
toc: content
demo:
  cols: 2
---

追踪是哪个依赖变化触发了 `useEffect` 的执行。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useTrackedEffect(
  effect: (changes: [], previousDeps: [], currentDeps: []) => (void | (() => void | undefined)),
  deps?: deps,
)
```

API 与 `React.useEffect` 基本一致，不过第一个函数会接收 `changes`、`previousDeps`、`currentDeps` 三个参数。

- changes：变化的依赖 index 数组
- previousDeps：上一个依赖
- currentDeps：当前依赖
