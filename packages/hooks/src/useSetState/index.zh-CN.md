---
nav:
  path: /hooks
---

# useSetState

管理 object 类型 state 的 Hooks，用法与 class 组件的 `this.setState` 基本一致。与 `this.setState` 相比多了一个 `resetState` 方法，用来将状态重置为初始值。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState, resetState] = useSetState<T extends Record<string, any>>(
  initialState: T = {} as T
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void, () => void]
```
