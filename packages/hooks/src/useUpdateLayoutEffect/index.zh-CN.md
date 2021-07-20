---
title: useUpdateLayoutEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useUpdateLayoutEffect

<Tag lang="zh-CN" tags="ssr&crossPlatform"></Tag>

忽略首次执行，只在依赖更新时执行的 useLayoutEffect hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

API 与 React.useLayoutEffect 完全一致。

```typescript
useUpdateLayoutEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```
