---
title: useDebounce
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
  order: 7
legacy: /zh-CN/side-effect/use-debounce
---

# useDebounce

用来处理防抖值的 Hook。

## 代码演示

### 基础使用

<code src="./demo/demo1.tsx" />

## API

```javascript
const debouncedValue = useDebounce(
  value: any,
  options?: object
);
```

### 参数

| 参数  | 说明                     | 类型   | 默认值 |
|-------|--------------------------|--------|--------|
| value | 需要防抖的值         | any    | -      |
| options  | 配置防抖的行为，详见下面的 Options                  | object                  | {}    |


### Options

| 参数  | 说明                     | 类型   | 默认值 |
| wait | 超时时间，单位为毫秒 | number | 1000 |
| leading | 是否在上升沿触发副作用函数 | boolean | false |
| trailing | 是否在下降沿触发副作用函数 | boolean | true |
