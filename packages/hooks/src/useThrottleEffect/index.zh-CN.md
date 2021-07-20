---
title: useThrottleEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useThrottleEffect

<Tag lang="zh-CN" tags="ssr&crossPlatform"></Tag>

为 `useEffect` 增加节流的能力。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: Options
);
```

### Params

| 参数    | 说明                               | 类型             | 默认值 |
|---------|------------------------------------|------------------|--------|
| effect  | 副作用函数                         | `EffectCallback` | -      |
| deps    | 依赖数组                           | `DependencyList` | -      |
| options | 配置节流的行为，详见下面的 Options | `Options`        | `{}`   |

### Options

| 参数     | 说明                       | 类型      | 默认值 |
|----------|----------------------------|-----------|--------|
| wait     | 超时时间，单位为毫秒       | `number`  | `1000` |
| leading  | 是否在上升沿触发副作用函数 | `boolean` | `true` |
| trailing | 是否在下降沿触发副作用函数 | `boolean` | `true` |
