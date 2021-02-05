---
title: useSize
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useSize

一个用于监听 dom 节点尺寸变化的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 传入 DOM 节点

<code src="./demo/demo2.tsx" />

### 获取所有尺寸系数

<code src="./demo/demo3.tsx" />

## API

```typescript
const size = useSize(target, options?: Options);
```

### 参数

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM 节点或者 Refs  | `HTMLElement` \| `(() => HTMLElement)` \| `MutableRefObject` | -      |

### 配置项

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| observe | 是否启用观察模式  | `boolean` | true      |

### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| size  | dom 节点的尺寸                         | `{ x: number, y: number, width: number, height: number, top: number, right: number, bottom: number, left: number }`    |
