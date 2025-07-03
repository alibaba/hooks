---
title: useLockFn
nav: Hooks
group:
  title: Effect
  order: 5
order: 14
toc: content
demo:
  cols: 2
---

用于给一个异步函数增加竞态锁，防止并发执行。

## 代码演示

<code src="./demo/demo1.tsx"></code>

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
