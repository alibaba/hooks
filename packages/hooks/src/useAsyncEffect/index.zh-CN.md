---
title: useAsyncEffect
nav: Hooks
group:
  title: Effect
  order: 5
order: 3
toc: content
demo:
  cols: 2
---

useEffect 支持异步函数。

## 代码演示

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>

## API

```typescript
function useAsyncEffect(
  effect: () => AsyncGenerator | Promise,
  deps: DependencyList
);
```
