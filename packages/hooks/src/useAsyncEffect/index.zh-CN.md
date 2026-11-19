---
nav:
  path: /hooks
---

# useAsyncEffect

useEffect 支持异步函数。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 中断执行

<code src="./demo/demo2.tsx" />

已清理的 effect 到达 `yield` 检查点时，会关闭异步生成器，使 `finally` 中的资源清理逻辑得到执行。

## API

```typescript
function useAsyncEffect(
  effect: () => AsyncGenerator | Promise<void> | (() => void),
  deps: DependencyList
);
```
