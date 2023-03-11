---
nav:
  path: /hooks
---

# useSafeState

It is exactly the same with `React.useState` , but after the component is unmounted, the `setState` in the asynchronous callback will no longer be executed to avoid memory leakage caused by updating the state after the component is unmounted.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState] = useSafeState(initialState);
```
