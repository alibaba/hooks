---
nav:
  path: /hooks
---

# useSwipeEvent

用于监听手势划动事件。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useSwipeEvent(target, options: Options);
```

### Params

| 参数   | 说明             | 类型                                                          | 默认值 |
| ------ | ---------------- | ------------------------------------------------------------- | ------ |
| target | DOM 节点或者 ref | `Element` \| `(() => Element)` \| `MutableRefObject<Element>` | -      |

### Options

| 参数         | 说明                         | 类型                                        | 默认值 |
| ------------ | ---------------------------- | ------------------------------------------- | ------ |
| threshold    | 触发手势划动监听的最小距离   | `number`                                    | `50`   |
| maxTime      | 快速划动的最大时间，单位：ms | `number`                                    | `300`  |
| screenRatioX | 慢速划动时的横向屏幕比例     | `number`                                    | `0.5`  |
| screenRatioY | 慢速划动时的纵向屏幕比例     | `number`                                    | `0.3`  |
| onSwipeLeft  | 向左划动的回调函数           | `(distance: number, e: TouchEvent) => void` | -      |
| onSwipeRight | 向右划动的回调函数           | `(distance: number, e: TouchEvent) => void` | -      |
| onSwipeUp    | 向上划动的回调函数           | `(distance: number, e: TouchEvent) => void` | -      |
| onSwipeDown  | 向下划动的回调函数           | `(distance: number, e: TouchEvent) => void` | -      |
