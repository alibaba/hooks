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

已取消的 effect 在生成器主体中到达 `yield` 检查点时，Hook 会关闭生成器，并执行关闭过程中进入的 `finally` 块。请在 `finally` 中使用 `await` 执行异步清理。如果生成器在关闭前已经停在 `finally` 内的 `yield`，该块的剩余语句可能被跳过。

## API

```typescript
function useAsyncEffect(
  effect: () => AsyncGenerator | Promise<void> | (() => void),
  deps: DependencyList
);
```
