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

### 懒加载

<code src="./demo/demo2.tsx" />

## API

```javascript
// 如果没有 dom 参数，则会返回 ref
const [isHovering, ref] = useHover({
    onEnter?,
    onLeave?,
});

// 如果有 dom，不会返回 ref
const [isHovering] = useHover({
  dom?,
  onEnter?,
  onLeave?,
});
```

### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| isHovering  | 判断鼠标元素是否处于 hover 元素                  | boolean    |
| ref     | 当未传入任何参数时，将 ref 绑定给需监听的节点      | -        |

### 参数

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| dom | 可选项，如果未传入则会监听返回结果中的 ref，否则会监听传入的节点  | HTMLElement \| (() => HTMLElement) \| undefined | -      |
| onEnter | 监听进入 hover  | ()=>void | -      |
| onLeave | 监听离开 hover  | ()=>void | -      |
