---
nav:
  path: /hooks
---

# useSetState

useSetState works similar to `this.setState` of class component, used to manage the state of object type.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState] = useSetState(initialState);
```

### Result

| Property | Description          | Type                                                                                      | Default |
| -------- | -------------------- | ----------------------------------------------------------------------------------------- | ------- |
| state    | Current state        | `T`                                                                                       | -       |
| setState | Update current state | `(state: Partial<T> \| null) => void` \| `((prevState: T) => Partial<T> \| null) => void` | -       |

### Params

| Property     | Description   | Type           | Default |
| ------------ | ------------- | -------------- | ------- |
| initialState | Initial state | `T \| () => T` | -       |
