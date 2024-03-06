---
title: useTimeout
nav: Hooks
group:
  title: Effect
  order: 5
order: 12
toc: content
demo:
  cols: 2
---

一个可以处理 setTimeout 计时器函数的 Hook。

## 代码演示

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>

## API

```typescript
useTimeout(
  fn: () => void,
  delay?: number | undefined
): fn: () => void;
```

### Params

| 参数  | 说明                                                                       | 类型                    |
| ----- | -------------------------------------------------------------------------- | ----------------------- |
| fn    | 待执行函数                                                                 | `() => void`            |
| delay | 定时时间（单位为毫秒）,支持动态变化，，当取值为 `undefined` 时会停止计时器 | `number` \| `undefined` |

### Result

| 参数         | 说明       | 类型         |
| ------------ | ---------- | ------------ |
| clearTimeout | 清除定时器 | `() => void` |
