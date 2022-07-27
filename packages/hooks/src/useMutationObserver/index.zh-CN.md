---
nav:
  path: /hooks
---

# useMutationObserver

一个监听指定的 DOM 树发生变化的 Hook，参考 [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useMutationObserver(
  callback: MutationCallback,
  target: Target,
  options?: MutationObserverInit,
);
```

### Params

| 参数     | 说明             | 类型                                                                | 默认值 |
| -------- | ---------------- | ------------------------------------------------------------------- | ------ |
| callback | 触发的回调函数   | `(mutations: MutationRecord[], observer: MutationObserver) => void` | -      |
| target   | DOM 节点或者 Ref | `Element` \| `() => Element` \| `MutableRefObject<Element>`         | -      |
| options  | 设置项           | `MutationObserverInit`                                              | `{}`   |

### Options

配置项请参考 [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#parameters)
