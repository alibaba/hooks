---
nav:
  path: /hooks
---

# useRafTimeout

用 `requestAnimationFrame` 模拟实现 `setTimeout`，API 和 `useTimeout` 保持一致，好处是可以在页面不渲染的时候不触发函数执行，比如页面隐藏或最小化等。

> Node 环境下 `requestAnimationFrame` 会自动降级到 `setTimeout`

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 进阶使用

<code src="./demo/demo2.tsx" />

## API

```typescript
useRafTimeout(
  fn: () => void,
  delay?: number | undefined,
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
