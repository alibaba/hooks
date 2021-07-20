---
title: useAsyncEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
  order: 7
---

# useAsyncEffect

用于处理异步的副作用。

## 代码演示

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

## API

```typescript
function useAsyncEffect(
  effect: () => AsyncGenerator | Promise,
  deps: DependencyList
);
```
