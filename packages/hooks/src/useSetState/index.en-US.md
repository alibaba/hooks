---
nav:
  path: /hooks
---

# useSetState

useSetState works similar to `this.setState` of class component, used to manage the state of object type.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Updating with callback

<code src="./demo/demo2.tsx" />

## API

```typescript
const [state, setState] = useSetState<T>(initialState);
const [partialState, setPartialState] = useSetState<T>();
```

### Result

| Property | Description          | Type                                                                                  | Default |
| -------- | -------------------- | ------------------------------------------------------------------------------------- | ------- |
| state    | Current state        | `T`; `Partial<T>` when `initialState` is omitted                                      | -       |
| setState | Update current state | `SetState<T>`; `SetState<Partial<T>>` when `initialState` is omitted                   | -       |

### Params

| Property     | Description   | Type           | Default |
| ------------ | ------------- | -------------- | ------- |
| initialState | Initial state | `T \| () => T` | `{}`    |
