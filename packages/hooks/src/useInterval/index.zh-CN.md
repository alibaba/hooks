---
title: useInterval
nav: Hooks
group:
  title: Effect
  order: 5
order: 10
toc: content
demo:
  cols: 2
---

一个可以处理 setInterval 的 Hook。

## 代码演示

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>

## API

```typescript
useInterval(
  fn: () => void,
  delay?: number | undefined,
  options?: Options
): fn: () => void;
```

### Params

| 参数    | 说明                                            | 类型                    |
| ------- | ----------------------------------------------- | ----------------------- |
| fn      | 要定时调用的函数                                | `() => void`            |
| delay   | 间隔时间，当设置值为 `undefined` 时会停止计时器 | `number` \| `undefined` |
| options | 配置计时器的行为                                | `Options`               |

### Options

| 参数      | 说明                     | 类型      | 默认值  |
| --------- | ------------------------ | --------- | ------- |
| immediate | 是否在首次渲染时立即执行 | `boolean` | `false` |

### Result

| 参数          | 说明       | 类型         |
| ------------- | ---------- | ------------ |
| clearInterval | 清除定时器 | `() => void` |
