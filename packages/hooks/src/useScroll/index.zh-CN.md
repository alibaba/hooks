---
title: useScroll
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /zh-CN/dom/use-scroll
---

# useScroll

获取元素的滚动状态。


## 代码演示

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

## API

```ts
const pisition = useScroll(target);
```

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM 节点或者 Ref 对象  |  HTMLElement \| (() => HTMLElement) \| Document \| React.MutableRefObject  | Document    |

### Result

| 参数 | 说明     | 类型 |
|------|----------|------|
| position | 滚动容器当前的滚动位置 | `{left: number, top: number}`  |
