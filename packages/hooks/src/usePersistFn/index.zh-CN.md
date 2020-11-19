---
title: usePersistFn
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

# usePersistFn

持久化 function 的 Hook。

> 参考 [如何从 useCallback 读取一个经常变化的值？](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback)
>
> 在某些场景中，你可能会需要用 useCallback 记住一个回调，但由于内部函数必须经常重新创建，记忆效果不是很好，导致子组件重复 render。对于超级复杂的子组件，重新渲染会对性能造成影响。通过 usePersistFn，可以保证函数地址永远不会变化。


## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
type noop = (...args: any[]) => any;

const fn = usePersistFn<T extends noop>(
  fn: T,
);
```

### Result

| 参数 | 说明                      | 类型                      |
|------|---------------------------|---------------------------|
| fn   | 引用地址永远不会变化的 fn | `(...args: any[]) => any` |

### Params

| 参数 | 说明             | 类型                      | 默认值 |
|------|------------------|---------------------------|--------|
| fn   | 需要持久化的函数 | `(...args: any[]) => any` | -      |
