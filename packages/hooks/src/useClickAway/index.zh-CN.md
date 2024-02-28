---
title: useClickAway
nav: Hooks
group:
  title: Dom
  order: 6
order: 2
toc: content
---

# useClickAway

监听目标元素外的点击事件。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx"></code>

### 自定义 DOM

<code src="./demo/demo2.tsx"></code>

### 支持多个 DOM 对象

<code src="./demo/demo3.tsx"></code>

### 监听其它事件

<code src="./demo/demo4.tsx"></code>

### 支持多个事件

<code src="./demo/demo5.tsx"></code>

### 支持 shadow DOM

<code src="./demo/demo6.tsx"></code>

## API

```typescript
type Target = Element | (() => Element) | React.MutableRefObject<Element>;
type DocumentEventKey = keyof DocumentEventMap;

useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: Target | Target[],
  eventName?: DocumentEventKey | DocumentEventKey[]
);
```

### Params

| 参数        | 说明                         | 类型                                       | 默认值  |
| ----------- | ---------------------------- | ------------------------------------------ | ------- |
| onClickAway | 触发函数                     | `(event: T) => void`                       | -       |
| target      | DOM 节点或者 Ref，支持数组   | `Target` \| `Target[]`                     | -       |
| eventName   | 指定需要监听的事件，支持数组 | `DocumentEventKey` \| `DocumentEventKey[]` | `click` |
