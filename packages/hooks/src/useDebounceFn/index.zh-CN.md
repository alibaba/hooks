---
title: useDebounceFn
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useDebounceFn

<Tag lang="zh-CN" tags="ssr&crossPlatform"></Tag>

用来处理防抖函数的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const {
  run,
  cancel,
  flush
} = useDebounceFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

### Params

| 参数    | 说明                               | 类型                      | 默认值 |
|---------|------------------------------------|---------------------------|--------|
| fn      | 需要防抖执行的函数                 | `(...args: any[]) => any` | -      |
| options | 配置防抖的行为，详见下面的 Options | `Options`                 | `{}`   |

### Options

| 参数     | 说明                     | 类型      | 默认值  |
|----------|--------------------------|-----------|---------|
| wait     | 超时时间，单位为毫秒     | `number`  | `1000`  |
| leading  | 是否在延迟开始前调用函数 | `boolean` | `false` |
| trailing | 是否在延迟开始后调用函数 | `boolean` | `true`  |

### Result

| 参数   | 说明                               | 类型                      |
|--------|------------------------------------|---------------------------|
| run    | 触发执行 fn，函数参数将会传递给 fn | `(...args: any[]) => any` |
| cancel | 取消当前防抖                       | `() => void`              |
| flush  | 当前防抖函数立即调用               | `() => void`              |

