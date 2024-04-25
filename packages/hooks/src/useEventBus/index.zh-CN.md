---
nav:
  path: /hooks
---

# useEventBus

`useEventBus` 用法等同于 `Bus.$on`，但是可以依赖状态的值，依赖更新时重新挂载函数。订阅后任何地方都可以调用方法

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
// hooks 订阅
useEventBus('订阅方法名称',订阅回调方法,[依赖项]);
```
