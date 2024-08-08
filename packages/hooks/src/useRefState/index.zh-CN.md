---
nav:
  path: /hooks
---

# useRefState

处理闭包问题，在 useState 的基础上多了一个获取最新 state 的函数

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## 类型定义

```typescript
import { Dispatch, SetStateAction } from 'react';
type GetStateAction<S> = () => S;

function useGetState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];
function useGetState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>, GetStateAction<S | undefined>];
```

## API

```typescript
const [value, setValue, getValue] = useRefState<S>(initialState);
```
