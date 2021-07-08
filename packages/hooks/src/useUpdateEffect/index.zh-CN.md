---
title: useUpdateEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useUpdateEffect

<Tag lang="zh-CN" tags="ssr&crossPlatform"></Tag>

忽略首次执行，只在依赖更新时执行的 useEffect hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

API 与 React.useEffect 完全一致。

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```