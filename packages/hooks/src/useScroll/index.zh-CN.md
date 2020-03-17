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
```
interface Position {
  left: number;
  top: number;
}

type Target = HTMLElement | Document;

function useScroll<T extends Target>(): [Position, MutableRefObject<T>]
function useScroll<T extends Target>(arg: Target | (() => Target)): [Position]
```

### Result

| 参数 | 说明     | 类型 |
|------|----------|------|
| position | 滚动容器当前的滚动位置 | `{x: number, y: number}`  |
| ref | 当未传入任何参数时，将 ref 绑定给需监听的节点 | `RefObject<HTMLElement>` |

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| dom? | 可选项，如果未传入则会监听返回结果中的 ref，否则会监听传入的节点  | HTMLElement \| Document \| (() => HTMLElement) \| (() => Document) \| undefined | -      |
