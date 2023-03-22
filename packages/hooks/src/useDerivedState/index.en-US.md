---
nav:
  path: /hooks
---

# useDerivedState

Derive states to implement semi-controlled patterns, such as: When you want an onChange event to be triggered when a Modal is off, or when you want a verification logic to be carried out before an onChange is triggered in a controlled mode, the onChange event is triggered successfully. In short, it applies to scenarios where an onChange is interrupted

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [internalValue, setInternalValue] = useDerivedState<T>(value);
```

### Result

| Property         | Description          | Type                                                                                      | Default |
| ---------------- | -------------------- | ----------------------------------------------------------------------------------------- | ------- |
| internalValue    | Current state        | `T`                                                                                       | -       |
| setInternalValue | Update current state | `(state: Partial<T> \| null) => void` \| `((prevState: T) => Partial<T> \| null) => void` | -       |

### Params

| Property | Description     | Type | Default |
| -------- | --------------- | ---- | ------- |
| value    | be derivedState | `T`  | -       |
