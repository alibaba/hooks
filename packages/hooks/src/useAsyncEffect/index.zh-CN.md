---
nav:
  path: /hooks
---

# useAsyncEffect

useEffect 支持异步函数。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx"></code>

### 中断执行

<code src="./demo/demo2.tsx"></code>

## API

```typescript
function useAsyncEffect(
  effect: () => AsyncGenerator | Promise,
  deps: DependencyList
);
```
