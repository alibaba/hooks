---
nav:
  path: /hooks
---

# useGetState

给 `React.useState` 增加了一个 getter 方法，以获取当前最新值。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState, getState] = ueGetState<S>(initialState: S | (() => S)): [S, (nextState: S | ((prevState: S) => S)) => void, () => S]
```