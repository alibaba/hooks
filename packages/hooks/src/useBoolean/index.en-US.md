---
title: useBoolean
nav: Hooks
group:
  title: State
  order: 4
order: 2
toc: content
demo:
  cols: 2
---

# useBoolean

A hook that elegantly manages boolean state.

## Examples

<code src="./demo/demo1.tsx"></code>

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
