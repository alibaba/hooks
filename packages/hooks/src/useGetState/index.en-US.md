---
nav:
  path: /hooks
---

# ueGetState

Add a getter method to the return value of `React.useState` to get the latest value

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState, getState] = ueGetState<S>(initialState: S | (() => S)): [S, (nextState: S | ((prevState: S) => S)) => void, () => S]
```