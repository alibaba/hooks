---
title: useDebounceEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useDebounceEffect

<Tag lang="zh-CN" tags="ssr&crossPlatform"></Tag>

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
|---------|------------------------------------|------------------|--------|
| effect  | 执行函数                           | `EffectCallback` | -      |
| deps    | 依赖数组                           | `DependencyList` | -      |
| options | 配置防抖的行为，详见下面的 Options | `Options`        | `{}`   |

### Options

| 参数     | 说明                       | 类型      | 默认值  |
|----------|----------------------------|-----------|---------|
| wait     | 超时时间，单位为毫秒       | `number`  | `1000`  |
| leading  | 是否在超时开始前触发副作用函数 | `boolean` | `false` |
| trailing | 是否在超时结束后触发副作用函数 | `boolean` | `true`  |
