---
title: useClickAway
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
  order: 13
legacy: /zh-CN/dom/use-click-away
---

# useClickAway

优雅的管理目标元素外点击事件的 Hook。

## 代码演示

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

## API

```ts
useClickAway(
  onClickAway: (event: MouseEvent | TouchEvent) => void,
  target: (() => HTMLElement) | HTMLElement | React.MutableRefObject,
);
```

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| onClickAway | 触发事件的函数  | (event) => void | -      |
| target | DOM 节点或者 Ref 对象  | (() => HTMLElement) \| HTMLElement \| React.MutableRefObject | - |
