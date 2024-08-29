---
nav:
  path: /hooks
---

# useRefState

To deal with the closure problem, there is an additional function to get the latest state on the basis of useState

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
const [value, setValue, getValue] = useRefState(false);
```
