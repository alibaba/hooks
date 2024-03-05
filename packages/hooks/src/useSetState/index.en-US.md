---
title: useSetState
nav: Hooks
group:
  title: State
  order: 4
order: 1
toc: content
demo:
  cols: 2
---

# useSetState

useSetState works similar to `this.setState` of class component, used to manage the state of object type.

## Examples

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>

## API

```typescript
const [state, setState] = useSetState<T>(initialState);
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
