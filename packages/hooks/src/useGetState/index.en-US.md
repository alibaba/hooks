---
nav:
  path: /hooks
---

# useGetState

Add a getter method to the return value of `React.useState` to get the latest value

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

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
