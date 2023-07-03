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

### 提供与useSafeState相同的功能，组件卸载后异步回调内的 状态改变 不再执行，避免因组件卸载后更新状态而导致的内存泄漏
<code src="./demo/demo5.tsx"/>

### 注意

<code src="./demo/demo4.tsx" />

## API

```js
const state = useReactive(
  initialState: Record<string, any>,
  options?: {
    safe?: boolean
  }
);
```

## 参数

| 参数         | 说明           | 类型                  | 默认值 |
| ------------ | -------------- | --------------------- | ------ |
| initialState | 当前的数据对象 | `Record<string, any>` | -      |
| options | 配置组件卸载后异步回调内的状态行为    | `Record<string, boolean>`  | -            |

### Options

| 参数      | 说明                     | 类型      | 默认值  |
|-----------|--------------------------|-----------|---------|
| safe      | 设置组件卸载后异步回调内的状态更新是否需要执行                     | `boolean` | `false` |
