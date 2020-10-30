---
title: useReactive
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

## useReactive

提供一种数据响应式的操作体验,定义数据状态不需要写`useState` , 直接修改属性即可刷新视图。

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx" />


### 数组操作

<code src="./demo/demo2.tsx" />


## API

```js
let state = useReactive(initialValue: object);
```

## initialState

| 参数         | 说明           | 类型     | 默认值 |
|--------------|----------------|----------|--------|
| initialState | 当前的数据对象 | `object` | -      |
