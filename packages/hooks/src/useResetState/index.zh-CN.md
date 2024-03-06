---
title: useResetState
nav: Hooks
group:
  title: State
  order: 4
order: 16
toc: content
demo:
  cols: 2
---

提供重置 state 方法的 Hooks，用法与 `React.useState` 基本一致。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const [state, setState, resetState] = useResetState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, () => void]
```
