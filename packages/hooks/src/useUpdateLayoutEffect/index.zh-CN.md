---
nav:
  path: /hooks
---

# useUpdateLayoutEffect

`useUpdateLayoutEffect` 用法等同于 `useLayoutEffect`，但是会忽略首次执行，只在依赖更新时执行。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

API 与 `React.useLayoutEffect` 完全一致。

```typescript
useUpdateLayoutEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```
