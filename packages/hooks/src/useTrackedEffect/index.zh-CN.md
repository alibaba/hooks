---
nav:
  path: /hooks
---

# useTrackedEffect

追踪是哪个依赖变化触发了 `useEffect` 的执行。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

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
