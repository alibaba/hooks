---
nav:
  path: /hooks
---

# useBoolean

A hook that elegantly manages boolean state.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, { toggle, set, setTrue, setFalse }] = useBoolean(
  defaultValue?: boolean,
);
```

### Params

| Property     | Description                               | Type      | Default |
| ------------ | ----------------------------------------- | --------- | ------- |
| defaultValue | The default value of the state. Optional. | `boolean` | `false` |

### Result

| Property | Description                            | Type      |
| -------- | -------------------------------------- | --------- |
| state    | Current value                          | `boolean` |
| actions  | A set of methods to update state value | `Actions` |

### Actions

| Property | Description          | Type                       |
| -------- | -------------------- | -------------------------- |
| toggle   | Toggle state         | `() => void`               |
| set      | Set state            | `(value: boolean) => void` |
| setTrue  | Set state to `true`  | `() => void`               |
| setFalse | Set state to `false` | `() => void`               |
