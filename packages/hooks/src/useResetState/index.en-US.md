---
nav:
  path: /hooks
---

# useResetState

useResetState works similar to `React.useState`, it provides a `reset` method

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState, resetState] = useResetState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, () => void]
```
