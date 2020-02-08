---
title: useSize
group:
  title: Dom
  path: /dom
  order: 500
---

# useSize

一个用于监听 dom 节点尺寸变化的 Hook

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx" />

### 懒加载（用于监听同一组件内后渲染节点）

<code src="./demo/demo2.tsx" />

### 监听提前渲染节点

<code src="./demo/demo3.tsx" />

## API

```
const [ state, ref? ] = useSize(dom);
```

### Result

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| state  | dom 节点的尺寸和位置                          | { width: number, height: number }    |
| ref     | 当未传入任何参数时，将 ref 绑定给需监听的节点      | -        |

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| dom? | 可选项，如果未传入则会监听返回结果中的 ref，否则会监听传入的节点  | HTMLElement \| (() => HTMLElement) \| undefined | -      |
