---
nav:
  path: /hooks
---

# useRafTimeout

用 `requestAnimationFrame` 模拟实现 `setTimeout`，API 和 `useTimeout` 保持一致

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
);
```

### Params

| 参数    | 说明                                        | 类型                    |
|---------|---------------------------------------------|-------------------------|
| fn      | 要定时调用的函数                            | `() => void`            |
| delay   | 间隔时间，当取值 `undefined` 时会停止计时器 | `number` \| `undefined` |
