---
nav:
  path: /hooks
---

# useToggle

A hook that toggle states.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Advanced usage

<code src="./demo/demo2.tsx" />

## API

```typescript
const [state, { toggle, set, setLeft, setRight }] = useToggle(defaultValue?: boolean);

const [state, { toggle, set, setLeft, setRight }] = useToggle<T>(defaultValue: T);

const [state, { toggle, set, setLeft, setRight }] = useToggle<T, U>(defaultValue: T, reverseValue: U)
```

### Params

| Property     | Description                 | Type | Default |
| ------------ | --------------------------- | ---- | ------- |
| defaultValue | The default value. Optional | `T`  | `false` |
| reverseValue | The reverse value. Optional | `U`  | -       |

### Result

| Property | Description                            | Type      |
| -------- | -------------------------------------- | --------- |
| state    | Current state                          | -         |
| actions  | A set of methods to update state value | `Actions` |

### Actions

| Property | Description                                                                                                   | Type                      |
| -------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| toggle   | Toggle state                                                                                                  | `() => void`              |
| set      | Set state                                                                                                     | `(state: T \| U) => void` |
| setLeft  | Set state to `defaultValue`                                                                                   | `() => void`              |
| setRight | Set state to `reverseValue` if `reverseValue` is available. Otherwise set it to the reverse of `defaultValue` | `() => void`              |
