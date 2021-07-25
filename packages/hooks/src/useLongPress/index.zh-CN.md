---
title: useLongPress
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useLongPress

<Tag lang="zh-CN" tags="ssr"></Tag>

监听目标元素的长按事件。

## 代码演示

<code src="./demo/demo1.tsx"/>

## API

```typescript
type Target = Element | (() => Element) | React.MutableRefObject<Element>;

useLongPress(
  onClickAway: (event: MouseEvent | TouchEvent) => void,
  target: Target | Target[],
  delay?: number
);
```

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| onClickAway | 触发函数  | `(event: MouseEvent | TouchEvent) => void` | -      |
| target | DOM 节点或者 Ref，支持数组 | `Target` \| `Target[]` | - |
| delay | 长按时间 | `number` |
