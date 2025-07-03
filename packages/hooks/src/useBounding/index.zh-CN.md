---
nav:
  path: /hooks
---

# useBounding

一个获取元素的大小及其相对于视口位置的 Hook，参考 [getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const rect: {
  width: number,
  height: number,
  left: number,
  right: number,
  top: number,
  bottom: number,
  x: number,
  y: number,
} = useBounding(
  target: Target,
  options?: UseBoundingOptions,
);
```

### Params

| 参数    | 说明             | 类型                                                        | 默认值                                                       |
| ------- | ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| target  | DOM 节点或者 Ref | `Element` \| `() => Element` \| `MutableRefObject<Element>` | -                                                            |
| options | 设置项           | `UseBoundingOptions`                                        | `{ reset = true, windowResize = true, windowScroll = true }` |

### Options

| 参数         | 说明                                             | 类型      | 默认值 |
| ------------ | ------------------------------------------------ | --------- | ------ |
| reset        | 是否在组件卸载时将返回值中的各个属性重置为 0     | `boolean` | `true` |
| windowResize | 是否监听 `window` 对象的 `resize` 事件来触发更新 | `boolean` | `true` |
| windowScroll | 是否监听 `window` 对象的 `scroll` 事件来触发更新 | `boolean` | `true` |

### Result

| 参数   | 说明                                 | 类型     | 默认值 |
| ------ | ------------------------------------ | -------- | ------ |
| width  | DOM 节点的宽度                       | `number` | `0`    |
| height | DOM 节点的高度                       | `number` | `0`    |
| left   | DOM 节点左边缘距离当前视窗左侧的距离 | `number` | `0`    |
| right  | DOM 节点右边缘距离当前视窗左侧的距离 | `number` | `0`    |
| top    | DOM 节点上边缘距离当前视窗顶部的距离 | `number` | `0`    |
| bottom | DOM 节点下边缘距离当前视窗顶部的距离 | `number` | `0`    |
| x      | DOM 节点左边缘距离当前视窗左侧的距离 | `number` | `0`    |
| y      | DOM 节点上边缘距离当前视窗顶部的距离 | `number` | `0`    |
