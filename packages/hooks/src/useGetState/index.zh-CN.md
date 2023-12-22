---
nav:
  path: /hooks
---

# useGetState

给 `React.useState` 增加了一个 getter 方法，以获取当前最新值。

## 代码演示

### 基础用法 1

<code src="./demo/demo1.tsx" />

### 基础用法 2

setState 之后可以立即获取最新的 state 值
<code src="./demo/demo2.tsx" />

## 类型定义

```typescript
import { Dispatch, SetStateAction } from 'react';
type GetStateAction<S> = () => S;

function useGetState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];
function useGetState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>, GetStateAction<S | undefined>];
```

## API

```typescript
const [state, setState, getState] = useGetState<S>(initialState)
```
