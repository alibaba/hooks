---
nav:
  path: /hooks
---

# useInterval

一个可以处理 setInterval 的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 进阶使用

<code src="./demo/demo2.tsx" />

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
