---
nav:
  path: /hooks
---

# usePrevious

A Hook to return the previous state.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Custom shouldUpdate function

<code src="./demo/demo2.tsx" />

## API

```typescript
const previousState: T = usePrevious<T>(
  state: T,
  shouldUpdate?: (prev: T | undefined, next: T) => boolean
);
```

### Result

| Property      | Description        | Type |
| ------------- | ------------------ | ---- |
| previousState | The previous value | `T`  |

### Params

| Property     | Description                                                   | Type                                         | Default                      |
| ------------ | ------------------------------------------------------------- | -------------------------------------------- | ---------------------------- |
| state        | The state that needs to be tracked                            | `T`                                          | -                            |
| shouldUpdate | Optional. Customize whether the state value should be updated | `(prev: T \| undefined, next: T) => boolean` | `(a, b) => !Object.is(a, b)` |
