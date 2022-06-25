---
nav:
  path: /hooks
---

# useDeepCompareLayoutEffect

在 React 的生命週期中使用 Promise 来避免竞争条件和内存泄露。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const getPromise: () => R = usePromise<R extends Promise<any>>(
  callback: () => R,
  deps: React.DependencyList
);
```
