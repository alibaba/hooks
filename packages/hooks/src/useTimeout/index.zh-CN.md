---
nav:
  path: /hooks
---

# useTimeout

一个可以处理 setTimeout 计时器函数的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />
<code src="./demo/demo2.tsx" />
<code src="./demo/demo3.tsx" />

## API

```typescript
useTimeout(
  fn: () => void,
  delay?: number | undefined
  options?: { defaultActive?: boolean }
): {
  clear: () => void;
  start: () => void;
  isActive: boolean;
};
```

### Params

| 参数                  | 说明                                                                       | 类型                    |
| --------------------- | -------------------------------------------------------------------------- | ----------------------- |
| fn                    | 待执行函数                                                                 | `() => void`            |
| delay                 | 定时时间（单位为毫秒）,支持动态变化，，当取值为 `undefined` 时会停止计时器 | `number` \| `undefined` |
| options.defaultActive | 是否挂载时启动                                                             | `boolean`               |

### Result

| 参数     | 说明                                   | 类型         |
| -------- | -------------------------------------- | ------------ |
| clear    | 清除定时器                             | `() => void` |
| start    | 启动定时器                             | `() => void` |
| isActive | 定时器运行状态，定时器运行后保持为true | `boolean`    |
