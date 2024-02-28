---
title: useAsyncEffect
nav: Hooks
group:
  title: Effect
  order: 5
order: 3
toc: content
---

# useAsyncEffect

useEffect support async function.

## 代码演示

### Default usage

<code src="./demo/demo1.tsx"></code>

### Break off

<code src="./demo/demo2.tsx"></code>

## API

```typescript
function useAsyncEffect(
  effect: () => AsyncGenerator | Promise,
  deps: DependencyList
);
```
