---
nav:
  path: /hooks
---

# useLockFn

用于给一个异步函数增加竞态锁，防止并发执行。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
function useLockFn<P extends any[] = any[], V = any>(
  fn: (...args: P) => Promise<V>
): fn: (...args: P) => Promise<V | undefined>;
```

### Result

| 参数 | 说明               | 类型                               |
| ---- | ------------------ | ---------------------------------- |
| fn   | 增加了竞态锁的函数 | `(...args: any[]) => Promise<any>` |

### Params

| 参数 | 说明                 | 类型                               | 默认值 |
| ---- | -------------------- | ---------------------------------- | ------ |
| fn   | 需要增加竞态锁的函数 | `(...args: any[]) => Promise<any>` | -      |
