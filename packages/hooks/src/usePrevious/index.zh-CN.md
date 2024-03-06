---
title: usePrevious
nav: Hooks
group:
  title: State
  order: 4
order: 12
toc: content
demo:
  cols: 2
---

保存上一次状态的 Hook。

## 代码演示

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>

## API

```typescript
const previousState: T = usePrevious<T>(
  state: T,
  shouldUpdate?: (prev: T | undefined, next: T) => boolean
);
```

### Result

| 参数          | 说明            | 类型 |
| ------------- | --------------- | ---- |
| previousState | 上次 state 的值 | `T`  |

### Params

| 参数         | 说明                       | 类型                                         | 默认值                       |
| ------------ | -------------------------- | -------------------------------------------- | ---------------------------- |
| state        | 需要记录变化的值           | `T`                                          | -                            |
| shouldUpdate | 可选，自定义判断值是否变化 | `(prev: T \| undefined, next: T) => boolean` | `(a, b) => !Object.is(a, b)` |
