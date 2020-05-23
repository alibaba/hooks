---
title: useFullscreen
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /zh-CN/dom/use-full-screen
---

# useFullscreen

一个用于处理 dom 全屏的 Hook

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

## API

```ts
const {
   isFullscreen,
   setFull,
   exitFull
} = useFullScreen({
  target,
  onExitFull?,
  onFull?,
});
```

### Result

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| isFullscreen  | 是否全屏                          | boolean    |
| setFull  | 设置全屏                          | ()=>void    |
| exitFull  | 退出全屏                          | ()=>void    |
| target | DOM 节点或者 Ref 对象  | (() => HTMLElement) | React.RefObject | - |

### Options

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| dom | 可选项，如果未传入则会监听返回结果中的 ref，否则会监听传入的节点  | HTMLElement \| (() => HTMLElement) \| undefined | -      |
| onExitFull | 监听退出全屏  | ()=>void | -      |
| onFull | 监听全屏  | ()=>void | -      |
