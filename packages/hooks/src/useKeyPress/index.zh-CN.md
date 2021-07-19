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

<Tag lang="zh-CN" tags="ssr"></Tag>

监听键盘按键，支持组合键，支持按键别名。

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
  eventHandler: EventHandler, 
  options?: Options
)
```

### Params

> Tips: keyType 为键盘事件中的 key 和 keyCode

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| keyFilter | 支持键盘事件中的 key 和 keyCode，支持回调方式返回 boolean 判断，支持别名使用  | `keyType` \| `keyType[]` \| `(event: KeyboardEvent) => boolean` | -      |
| eventHandler | 回调函数  | `(event: KeyboardEvent) => void` | -      |
| options | 可选配置项，见 Options | `Options`               | -              |

### Options

| 参数            | 说明                                                   | 类型                              | 默认值 |
|-----------------|--------------------------------------------------------|-----------------------------------|--------|
| events | 触发事件  |  `('keydown' \| 'keyup')[]` | `['keydown']`     |
| target | DOM 节点或者 ref  | `() => Element` \| `Element` \| `MutableRefObject<Element>` | - |

## Remarks

1.全部的按键别名

```text
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

```text
ctrl
alt
shift
meta
```
