---
title: useEventListener
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useEventListener

优雅使用 addEventListener 的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 监听 keydown 事件

<code src="./demo/demo2.tsx" />

## API

```typescript
useEventListener(
  eventName: string,
  handler: Function,
  options?: Options,
)
```

### Params

| 参数      | 说明       | 类型       | 默认值 |
|-----------|------------|------------|--------|
| eventName | 事件名称   | `string`   | -      |
| handler   | 处理函数   | `Function` | -      |
| options   | 设置(可选) | `Options`  | -      |

### Options

| 参数    | 说明                                                                                                                                           | 类型                        | 默认值 |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|--------|
| target  | DOM 节点或者 Ref 对象                               | `(() => HTMLElement)` \| `HTMLElement` \| `React.MutableRefObject` \| `Window` \| `Document` | `window`    |
| capture | 可选项，listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。                                                                         | `boolean`                     | `false`      |
| once    | 可选项，listener 在添加之后最多只调用一次。如果是 true，listener 会在其被调用之后自动移除。                                                  | `boolean`                     | `false`      |
| passive | 可选项，设置为 true 时，表示 listener 永远不会调用 preventDefault() 。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。 | `boolean`                     | `false`      |
