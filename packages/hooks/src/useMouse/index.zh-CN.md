---
title: useMouse
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useMouse

一个跟踪鼠标位置的 Hook

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const state: {
  screenX: number, 
  screenY: number, 
  clientX: number, 
  clientY: number,
  pageX: number,
  pageY: number,
} = useMouse();
```

### 结果

| 参数    | 说明                   | 类型     |
|---------|------------------------|----------|
| screenX | 距离显示器左侧的距离   | `number` |
| screenY | 距离显示器顶部的距离   | `number` |
| clientX | 距离当前视窗左侧的距离 | `number` |
| clientY | 距离当前视窗顶部的距离 | `number` |
| pageX   | 距离完整页面顶部的距离 | `number` |
| pageY   | 距离完整页面顶部的距离 | `number` |
