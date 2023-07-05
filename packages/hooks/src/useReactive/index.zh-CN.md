---
nav:
  path: /hooks
---

## useReactive

提供一种数据响应式的操作体验，定义数据状态不需要写`useState`，直接修改属性即可刷新视图。

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx" />

### 数组操作

<code src="./demo/demo2.tsx" />

### 计算属性

<code src="./demo/demo3.tsx" />

### 注意

<code src="./demo/demo4.tsx" />

## API

```js
const state = useReactive(initialState: Record<string, any>);
```

## 参数

| 参数         | 说明           | 类型                  | 默认值 |
| ------------ | -------------- | --------------------- | ------ |
| initialState | 当前的数据对象 | `Record<string, any>` | -      |

## FAQ

### `useReactive` 和 `Map`、`Set` 一起使用时报错或无效？

`useReactive` 目前不兼容 `Map`、`Set`。

相关 issues：[#2239](https://github.com/alibaba/hooks/discussions/2239)
