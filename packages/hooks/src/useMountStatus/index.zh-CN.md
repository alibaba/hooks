---
title: useMountStatus
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useMount

获取组件挂载或卸载状态的 hook

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const getMountStatus: () => boolean = useMountStatus;
```

### Result

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| getMountStatus   | 若当前组件已经挂载则返回true，否则返回false | `() => boolean` | -      |
