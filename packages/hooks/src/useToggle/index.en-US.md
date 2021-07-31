---
title: useToggle
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useToggle

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook that toggles states.

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

| Property     | Description                   | Type  | Default |
|--------------|-------------------------------|-------|---------|
| defaultValue | The default value. `Optional` | `T` | `false`   |
| reverseValue | The reverse value. `Optional` | `U` | -       |

### Result

| Property | Description   | Type      |
|----------|---------------|-----------|
| state    | Current value of the state  | -         |
| actions  | A set of methods to update state value | `Actions` |

### Actions

| Property | Description      | Type                    |
|----------|------------------|-------------------------|
| toggle   | A function to toggle the state     | `() => void`            |
| set      | A function to set state        | `(state: T | U) => void` |
| setLeft  | A function to set state to `defaultValue` | `() => void`            |
| setRight | A function to set state to `reverseValue` if `reverseValue` is available. Otherwise set it to the reverse of `defaultValue` | `() => void`            |
