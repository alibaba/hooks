---
title: useDebounceUpdateEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useDebounceUpdateEffect

为 `useEffect` 增加防抖的能力，但只在依赖更新时执行。

## 代码演示

### 基础使用

<code src="./demo/demo1.tsx" />

## API

```javascript
useDebounceUpdate(
  effect: () => (void | (() => void | undefined)),
  deps?: any[],
  options?: object
);
```

### 参数

| 参数 | 说明                                              | 类型                    | 默认值 |
|------|---------------------------------------------------|-------------------------|--------|
| effect   | 副作用函数                                | Function | -       |
| deps | 依赖数组 | any[] \| undefined | undefined |
| options  | 配置防抖的行为，详见下面的 Options                                          | object                  | {}    |

### Options

| 参数  | 说明                     | 类型   | 默认值 |
|-------|--------------------------|--------|--------|
| wait | 超时时间，单位为毫秒 | number | 1000 |
| leading | 是否在上升沿触发副作用函数 | boolean | false |
| trailing | 是否在下降沿触发副作用函数 | boolean | true |
