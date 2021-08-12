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

### 基本使用

<code src="./demo/demo1.tsx"/>

### 移除光标不取消事件

<code src="./demo/demo2.tsx"/>

## API

```typescript
type Target = Element | (() => Element) | React.MutableRefObject<Element>;

const isPressing = useLongPress(
  onLongPress: (event: MouseEvent | TouchEvent) => void,
  target: Target ,
  options?: {
    delay?: number,
    cancelOnMovement?: boolean,
  }
);
```

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| onLongPress | 触发函数  | `(event: MouseEvent \| TouchEvent) => void` | -      |
| target | DOM 节点或者 Ref  | `Target`  | - |
| options | 可选配置项，见 Options  | `Options` | - |

### Options
| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| delay | 长按时间 | `number` | `1500`
| cancelOnMovement | 当光标移除目标是否失效 | `boolean` | `true`


### Result
| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| isPressing |  是否处于按压状态 | `boolean` | -      |

