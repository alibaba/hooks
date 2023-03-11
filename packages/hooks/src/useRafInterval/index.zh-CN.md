---
nav:
  path: /hooks
---

# useRafInterval

用 `requestAnimationFrame` 模拟实现 `setInterval`，API 和 `useInterval` 保持一致，好处是可以在页面不渲染的时候停止执行定时器，比如页面隐藏或最小化等。

请注意，如下两种情况下很可能是不适用的，优先考虑 `useInterval` ：

- 时间间隔小于 `16ms`
- 希望页面不渲染的情况下依然执行定时器

> Node 环境下 `requestAnimationFrame` 会自动降级到 `setInterval`

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 进阶使用

<code src="./demo/demo2.tsx" />

## API

```typescript
useRafInterval(
  fn: () => void,
  delay?: number | undefined,
  options?: Options
): fn: () => void;
```

### Params

| 参数    | 说明                                        | 类型                    |
| ------- | ------------------------------------------- | ----------------------- |
| fn      | 要定时调用的函数                            | `() => void`            |
| delay   | 间隔时间，当取值 `undefined` 时会停止计时器 | `number` \| `undefined` |
| options | 配置计时器的行为                            | `Options`               |

### Options

| 参数      | 说明                     | 类型      | 默认值  |
| --------- | ------------------------ | --------- | ------- |
| immediate | 是否在首次渲染时立即执行 | `boolean` | `false` |

### Result

| 参数          | 说明       | 类型         |
| ------------- | ---------- | ------------ |
| clearInterval | 清除定时器 | `() => void` |
