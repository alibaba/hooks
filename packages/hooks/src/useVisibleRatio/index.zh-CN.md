---
title: useVisibleRatio
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /zh-CN/dom/use-visible-ratio
---

# useVisibleRatio

一个用于显示 dom 元素可见区域占元素高度比例/百分比的 Hook

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx" />

### 传入 DOM 元素

<code src="./demo/demo2.tsx" />

## API

```ts
const visibleRatio = useVisibleRatio(target);
```

### 参数

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM element or Ref Object | HTMLElement \| (() => HTMLElement) \| React.MutableRefObject |   - |

### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| visibleRatio  | dom 元素可见区域占元素高度比例/百分比（两位小数）| number    |
