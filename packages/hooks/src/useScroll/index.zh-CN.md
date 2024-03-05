---
title: useScroll
nav: Hooks
group:
  title: Dom
  order: 6
order: 17
toc: content
demo:
  cols: 2
---

# useScroll

监听元素的滚动位置。

## 代码演示

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>
<code src="./demo/demo3.tsx"></code>

## API

```typescript
const position = useScroll(target, shouldUpdate);
```

### Params

| 参数         | 说明                 | 类型                                                                        | 默认值       |
| ------------ | -------------------- | --------------------------------------------------------------------------- | ------------ |
| target       | DOM 节点或者 ref     | `Element` \| `Document` \| `(() => Element)` \| `MutableRefObject<Element>` | `document`   |
| shouldUpdate | 控制是否更新滚动信息 | `({ top: number, left: number }) => boolean`                                | `() => true` |

### Result

| 参数     | 说明                   | 类型                                         |
| -------- | ---------------------- | -------------------------------------------- |
| position | 滚动容器当前的滚动位置 | `{ left: number, top: number } \| undefined` |
