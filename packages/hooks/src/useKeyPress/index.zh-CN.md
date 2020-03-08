---
title: useKeyPress
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /zh-CN/dom/use-key-press
---

# useKeyPress

一个优雅的管理 keyup 和 keydown 键盘事件的 Hook，支持键盘组合键，定义键盘事件的 key 和 keyCode 别名输入 。

## 代码演示

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

<code src="./demo/demo3.tsx" />

<code src="./demo/demo4.tsx" />

<code src="./demo/demo5.tsx" />

## API

```javascript
const ref = useKeyPress(
  keyFilter: KeyFilter, 
  eventHandler: EventHandler = noop, 
  options?: Options
)
```

### Result

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| ref     | 当未传入任何 target 时，将 ref 绑定给需监听的节点      | -        |

### 参数

> Tips: keyType 为键盘事件中的 key 和 keyCode

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| keyFilter | 支持键盘事件中的 key 和 keyCode，支持回调方式返回 boolean 判断，支持别名使用  | keyType \| Array<keyType\> \| ((event: KeyboardEvent) => boolean) | -      |
| eventHandler | 事件回调函数  | (event: KeyboardEvent) => void | () => {}      |
| options | 可选配置项，见 Options | -                | -              |   |

### Options

| 参数            | 说明                                                   | 类型                              | 默认值 |
|-----------------|--------------------------------------------------------|-----------------------------------|--------|
| events | 触发事件  |  Array<keydown \| keyup\> | ['keydown']     |
| target | Optional, listens for ref in returned results if not passed in, otherwise listens for incoming nodes, and listens for window by default  | window \| HTMLElement \| (() => HTMLElement) \| undefined | window     |

## 备注

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
