---
title: useHover
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /zh-CN/dom/use-hover
---

# useHover
一个用于追踪 dom 元素是否有鼠标悬停的 Hook

## 代码演示

### 默认用法

<code src="./demo/demo1.tsx" />

### 传入 DOM 元素

<code src="./demo/demo2.tsx" />

## API

```javascript
const isHovering = useHover({
  target,
  onEnter,
  onLeave,
});
```

### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| isHovering  | 判断鼠标元素是否处于 hover 元素                  | boolean    |

### 参数

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM 节点或者 Ref 对象  | (() => HTMLElement) | React.RefObject | - |
| onEnter | 监听进入 hover  | ()=>void | -      |
| onLeave | 监听离开 hover  | ()=>void | -      |
