---
nav:
  path: /hooks
---

# useImmediateEffect

`useImmediateEffect` 用法类似于 `useEffect`，但是在依赖项变更后，会立刻执行副作用函数，而非在渲染结束后。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

API 与 `React.useEffect` 完全一致。

```typescript
useImmediateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```
