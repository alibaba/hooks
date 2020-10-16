---
title: useKeyPress
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useKeyPress

一个优雅的管理 keyup 和 keydown 键盘事件的 Hook，支持键盘组合键，定义键盘事件的 key 和 keyCode 别名输入 。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 使用别名

<code src="./demo/demo2.tsx" />

### 组合方式

<code src="./demo/demo3.tsx" />

### 进阶使用

<code src="./demo/demo4.tsx" />

### 自定义 DOM

<code src="./demo/demo5.tsx" />

## API

```typescript
useKeyPress(
  keyFilter: KeyFilter, 
  eventHandler: EventHandler = noop, 
  options?: Options
)
```

### Params

> Tips: keyType 为键盘事件中的 key 和 keyCode

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| keyFilter | 支持键盘事件中的 key 和 keyCode，支持回调方式返回 boolean 判断，支持别名使用  | `keyType` \| `Array<keyType>` \| `(event: KeyboardEvent) => boolean` | -      |
| eventHandler | 事件回调函数  | `(event: KeyboardEvent) => void` | -      |
| options | 可选配置项，见 Options | `Options`               | -              |

### Options

| 参数            | 说明                                                   | 类型                              | 默认值 |
|-----------------|--------------------------------------------------------|-----------------------------------|--------|
| events | 触发事件  |  Array<keydown \| keyup\> | `['keydown']`     |
| target | DOM 节点或者 Ref 对象  | `() => HTMLElement` \| `HTMLElement` \| `React.MutableRefObject` | - |

## Remarks

1.全部的按键别名

```javascript
enter
tab
delete (捕获“删除”和“退格”键)
esc
space
up
down
left
right
```

2.修饰键

```javascript
ctrl
alt
shift
meta
```
