---
nav:
  path: /hooks
---

# useMouse

监听鼠标位置

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 传入 DOM 元素

<code src="./demo/demo2.tsx" />

## API

```typescript
const state: {
  screenX: number, 
  screenY: number, 
  clientX: number, 
  clientY: number,
  pageX: number,
  pageY: number,
  elementX: number,
  elementY: number,
  elementH: number,
  elementW: number,
  elementPosX: number,
  elementPosY: number,
} = useMouse(target?: Target);
```

### Params

| 参数    | 说明                   | 类型     |
|--------|------------------------|----------|
| target | DOM 节点或者 Ref | `Element` \| `() => Element` \| `MutableRefObject<Element>` | - |

### Result

| 参数    | 说明                   | 类型     |
|---------|------------------------|----------|
| screenX | 距离显示器左侧的距离   | `number` |
| screenY | 距离显示器顶部的距离   | `number` |
| clientX | 距离当前视窗左侧的距离 | `number` |
| clientY | 距离当前视窗顶部的距离 | `number` |
| pageX   | 距离完整页面左侧的距离 | `number` |
| pageY   | 距离完整页面顶部的距离 | `number` |
| elementX | 距离 DOM 节点左侧的距离   | `number` |
| elementY | 距离 DOM 节点顶部的距离   | `number` |
| elementH | DOM 节点的高 | `number` |
| elementW | DOM 节点的宽 | `number` |
| elementPosX | DOM 节点距离完整页面左侧的距离 | `number` |
| elementPosY | DOM 节点距离完整页面顶部的距离 | `number` |
