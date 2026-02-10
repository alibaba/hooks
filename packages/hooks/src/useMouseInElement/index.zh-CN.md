---
nav:
  path: /hooks
---

# useMouseInElement

一个监听当前鼠标是不是在指定的 DOM 上的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const { isInside } = useMouseInElement(target: Target);
```

### Params

| 参数        | 说明                                    | 类型                                                        | 默认值    |
| ----------- | --------------------------------------- | ----------------------------------------------------------- | --------- |
| target      | DOM 节点或者 Ref                        | `Element` \| `() => Element` \| `MutableRefObject<Element>` | -         |
| callback    | 状态变更时处于dom内部触发一次回调函数   | (result: Result) => {}                                      | undefined |
| outCallback | 状态变更时不处于dom内部触发一次回调函数 | (result: Result) => void                                    | undefined |

### Result

| 参数        | 说明                           | 类型      |
| ----------- | ------------------------------ | --------- |
| clientX     | 距离当前视窗左侧的距离         | `number`  |
| clientY     | 距离当前视窗顶部的距离         | `number`  |
| elementH    | 指定元素的高                   | `number`  |
| elementW    | 指定元素的宽                   | `number`  |
| elementPosX | 指定元素距离完整页面左侧的距离 | `number`  |
| elementPosY | 指定元素距离完整页面顶部的距离 | `number`  |
| isInside    | 鼠标是否在当前元素上           | `boolean` |
