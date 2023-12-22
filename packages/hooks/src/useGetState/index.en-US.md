---
nav:
  path: /hooks
---

# useGetState

Add a getter method to the return value of `React.useState` to get the latest value

## Examples

### Default usage 1

<code src="./demo/demo1.tsx" />

### Default usage 2

After setState, you can immediately obtain the latest state value
<code src="./demo/demo2.tsx" />

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
