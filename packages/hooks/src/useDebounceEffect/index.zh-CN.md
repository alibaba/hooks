---
nav:
  path: /hooks
---

# useDebounceEffect

为 `useEffect` 增加防抖的能力。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: Options
);
```

### Params

| 参数    | 说明                               | 类型             | 默认值 |
| ------- | ---------------------------------- | ---------------- | ------ |
| effect  | 执行函数                           | `EffectCallback` | -      |
| deps    | 依赖数组                           | `DependencyList` | -      |
| options | 配置防抖的行为，详见下面的 Options | `Options`        | -      |

### Options

| 参数     | 说明                     | 类型      | 默认值  |
| -------- | ------------------------ | --------- | ------- |
| wait     | 等待时间，单位为毫秒     | `number`  | `1000`  |
| leading  | 是否在在延迟开始前调用   | `boolean` | `false` |
| trailing | 是否在在延迟结束后调用   | `boolean` | `true`  |
| maxWait  | 最大等待时间，单位为毫秒 | `number`  | -       |
