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

```javascript
const ref = useClickAway(
  onClickAway: (event: KeyboardEvent) => void,
  dom?: RefType,
);
```

### Result

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| ref     | 当未传入任何参数时，将 ref 绑定给需监听的节点      | -        |

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| onClickAway | 触发事件的函数  | (event) => void | -      |
| dom? | 可选项，如果未传入则会监听返回结果中的 ref，否则会监听传入的节点  | HTMLElement \| (() => HTMLElement) \| undefined | -      |
