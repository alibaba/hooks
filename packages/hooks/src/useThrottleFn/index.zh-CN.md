---
title: useThrottleFn
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useThrottleFn

用来处理节流函数的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const {
  run,
  cancel
} = useThrottleFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

### Params

| 参数    | 说明                               | 类型                      | 默认值 |
|---------|------------------------------------|---------------------------|--------|
| fn      | 需要节流执行的函数                 | `(...args: any[]) => any` | -      |
| options | 配置节流的行为，详见下面的 Options | `Options`                 | `{}`   |

### Options

| 参数     | 说明                       | 类型      | 默认值 |
|----------|----------------------------|-----------|--------|
| wait     | 超时时间，单位为毫秒       | `number`  | `1000` |
| leading  | 是否在上升沿触发副作用函数 | `boolean` | `true` |
| trailing | 是否在下降沿触发副作用函数 | `boolean` | `true` |

### Result

| 参数   | 说明                               | 类型                       |
|--------|------------------------------------|----------------------------|
| run    | 触发执行 fn，函数参数将会传递给 fn | `(...args: any[]) => any` |
| cancel | 取消当前节流                       | `() => void`               |
| flush  | 当前节流立即调用                   | `() => void`               |
