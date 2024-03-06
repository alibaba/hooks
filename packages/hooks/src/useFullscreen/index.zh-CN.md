---
title: useFullscreen
nav: Hooks
group:
  title: Dom
  order: 6
order: 9
toc: content
demo:
  cols: 2
---

管理 DOM 全屏的 Hook。

## 代码演示

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>
<code src="./demo/demo3.tsx"></code>
<code src="./demo/demo4.tsx"></code>

## API

```typescript
const [isFullscreen, {
  enterFullscreen,
  exitFullscreen,
  toggleFullscreen,
  isEnabled,
}] = useFullScreen(
  target,
  options?: Options
);
```

### Params

| 参数    | 说明             | 类型                                                        | 默认值 |
| ------- | ---------------- | ----------------------------------------------------------- | ------ |
| target  | DOM 节点或者 ref | `Element` \| `() => Element` \| `MutableRefObject<Element>` | -      |
| options | 设置             | `Options`                                                   | -      |

### Options

| 参数           | 说明                                                                   | 类型                                                   | 默认值  |
| -------------- | ---------------------------------------------------------------------- | ------------------------------------------------------ | ------- |
| onExit         | 退出全屏触发                                                           | `() => void`                                           | -       |
| onEnter        | 全屏触发                                                               | `() => void`                                           | -       |
| pageFullscreen | 是否是页面全屏。当参数类型为对象时，可以设置全屏元素的类名和 `z-index` | `boolean` \| `{ className?: string, zIndex?: number }` | `false` |

### Result

| 参数             | 说明         | 类型         |
| ---------------- | ------------ | ------------ |
| isFullscreen     | 是否全屏     | `boolean`    |
| enterFullscreen  | 设置全屏     | `() => void` |
| exitFullscreen   | 退出全屏     | `() => void` |
| toggleFullscreen | 切换全屏     | `() => void` |
| isEnabled        | 是否支持全屏 | `boolean`    |
