---
title: useGetState
nav: Hooks
group:
  title: State
  order: 4
order: 15
toc: content
demo:
  cols: 2
---

# useGetState

Add a getter method to the return value of `React.useState` to get the latest value

## Examples

<code src="./demo/demo1.tsx"></code>

## TypeScript definition

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
