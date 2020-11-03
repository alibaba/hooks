---
title: useLockFn
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

# useLockFn

用于给一个异步函数增加竞态锁，防止并发执行。

## 代码演示

### 避免重复提交

<code src="./demo/demo1.tsx" />

## API

```typescript
function useLockFn<P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>
): fn: (...args: P) => Promise<V | undefined>
```

### Result

| 参数 | 说明                      | 类型                      |
|------|---------------------------|---------------------------|
| fn   | 增加了竞态锁的函数 | `(...args: any[]) => any` |

### Params

| 参数           | 说明             | 类型                      | 默认值 |
|----------------|------------------|---------------------------|--------|
| fn             | 需要增加竞态锁的函数 | `(...args: any[]) => any` | -      |

