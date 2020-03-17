---
title: useEventListener
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /zh-CN/dom/use-event-listener
---

# useEventListener

优雅使用 EventListener 的 Hook。

## 代码演示

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />


## API

```javascript
function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { capture?: boolean; once?: boolean; passive?: boolean; },
): MutableRefObject<T>;

function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { dom: Dom, capture?: boolean; once?: boolean; passive?: boolean; },
): void

type Target = HTMLElement | Window;
type Options = { dom?: Dom; capture?: boolean; once?: boolean; passive?: boolean; }
type Dom = Target | (() => Target) | null;

```


### 参数

| 参数    | 说明     | 类型                   | 默认值 |
|---------|----------|------------------------|--------|
| eventName | 事件名称 | string | -      |
| handler | 处理函数 | Function | -      |
| options | 设置(可选) | Options |   -   |

### Options

| 参数    | 说明     | 类型                   | 默认值 |
|---------|----------|------------------------|--------|
| dom | 可选项，如果未传入则会监听返回结果中的 ref ，否则会监听传入的节点	 | HTMLElement \| (() => HTMLElement) \| null   | Window      |
| capture | 可选项，listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。	 | boolean  |    -   |
| once | 可选项，listener 在添加之后最多只调用一次。如果是 true ， listener 会在其被调用之后自动移除。	 | boolean   |    -   |
| passive | 可选项，设置为 true 时，表示 listener 永远不会调用 preventDefault() 。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。	 | boolean   |    -   |

### 返回

| 参数 | 说明     | 类型 |
|------|----------|------|
| ref | 当未传入任何参数时，将 ref 绑定给需监听的节点 | `RefObject<HTMLElement>` |

