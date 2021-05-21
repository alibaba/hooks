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

Handle the async effect of components.

## 代码演示

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

## API

```typescript
type CleanUpWith = (cleanUp: () => void) => void;
function useAsyncEffect(
  effect: (cleanUpWith: CleanUpWith) => Promise<void>,
  deps: DependencyList
);
```
