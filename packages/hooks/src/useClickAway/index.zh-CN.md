---
title: useClickAway
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useClickAway

<Tag lang="zh-CN" tags="ssr"></Tag>

监听目标元素外的点击事件。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 自定义 DOM

<code src="./demo/demo2.tsx" />

### 支持多个 DOM 对象

<code src="./demo/demo3.tsx" />

### 监听其它事件

<code src="./demo/demo4.tsx" />


## API

```typescript
type Target = Element | (() => Element) | React.MutableRefObject<Element>;

useClickAway(
  onClickAway: (event: MouseEvent | TouchEvent) => void,
  target: Target | Target[],
  eventName?: string
);
```

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| onClickAway | 触发函数  | `(event: MouseEvent | TouchEvent) => void` | -      |
| target | DOM 节点或者 Ref，支持数组 | `Target` \| `Target[]` | - |
| eventName | 指定需要监听的事件 | `string` | `click` |
