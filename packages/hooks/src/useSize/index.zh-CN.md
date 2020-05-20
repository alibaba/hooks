---
title: useSize
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /zh-CN/dom/use-size
---

# useSize

一个用于监听 dom 节点尺寸变化的 Hook

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx" />

### 传入 DOM 节点

<code src="./demo/demo2.tsx" />

## API

```
const size = useSize(dom);
```

### Result

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| size  | dom 节点的尺寸                         | { width: number, height: number }    |

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| dom | DOM 节点或者 Refs  | HTMLElement \| React.RefObject | -      |
