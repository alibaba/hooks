---
title: useFullscreen
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useFullscreen

一个用于处理 dom 全屏的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 图片全屏

<code src="./demo/demo2.tsx" />

## API

```typescript
const [isFullscreen, { setFull, exitFull, toggleFull }] = useFullScreen(target, options?:Options);
```

### Params

| 参数    | 说明                  | 类型          | 默认值 |
|---------|-----------------------|---------------|--------|
| target  | DOM 节点或者 Ref 对象 | `HTMLElement` \| `() => HTMLElement` \| `React.MutableRefObject`| -      |
| options | 设置(可选)            | `Options`     | -      |

### Options

| 参数       | 说明         | 类型       | 默认值 |
|------------|--------------|------------|--------|
| onExitFull | 监听退出全屏 | `()=>void` | -      |
| onFull     | 监听全屏     | `()=>void` | -      |

### Result

| 参数         | 说明     | 类型       |
|--------------|----------|------------|
| isFullscreen | 是否全屏 | `boolean`  |
| setFull      | 设置全屏 | `()=>void` |
| exitFull     | 退出全屏 | `()=>void` |
| toggleFull   | 切换全屏 | `()=>void` |
