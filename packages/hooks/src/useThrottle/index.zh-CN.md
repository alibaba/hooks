---
title: useThrottle
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
  order: 7
---

# useThrottle

用来处理节流值的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const throttledValue = useThrottle(
  value: any,
  options?: Options
);
```

### Params

| 参数    | 说明                               | 类型      | 默认值 |
|---------|------------------------------------|-----------|--------|
| value   | 需要节流的值                       | `any`     | -      |
| options | 配置节流的行为，详见下面的 Options | `Options` | `{}`   |


### Options

| 参数     | 说明                       | 类型      | 默认值 |
|----------|----------------------------|-----------|--------|
| wait     | 超时时间，单位为毫秒       | `number`  | `1000` |
| leading  | 是否在上升沿触发副作用函数 | `boolean` | `true` |
| trailing | 是否在下降沿触发副作用函数 | `boolean` | `true` |
