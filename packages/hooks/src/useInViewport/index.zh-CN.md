---
title: useInViewport
group:
  title: Dom
  path: /dom
  order: 500
---

# useInViewport

一个用于判断dom元素是否在可视范围之内的 Hook

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx" />

### 懒加载（用于监听同一组件内后渲染节点）

<code src="./demo/demo2.tsx" />

## API

```
const [ inViewPort, ref? ] = useInViewport(dom);
```

### Result

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| inViewPort  | 判断dom元素是否在可视范围之内的标志                          | boolean    |
| ref     | 当未传入任何参数时，将 ref 绑定给需监听的节点      | -        |

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| dom? | 可选项，如果未传入则会监听返回结果中的 ref，否则会监听传入的节点  | HTMLElement \| (() => HTMLElement) \| undefined | -      |
