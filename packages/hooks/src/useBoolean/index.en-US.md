---
title: useBoolean
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useBoolean

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook that elegantly manages boolean states.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [ state, { toggle, set, setTrue, setFalse }] = useBoolean(
  defaultValue?: boolean,
);
```

### Params

| Property     | Description                   | Type      | Default |
|--------------|-------------------------------|-----------|---------|
| defaultValue | the default value of the state. `Optional` | `boolean` | `false` |

### Result

| Property | Description   | Type      |
|----------|---------------|-----------|
| state    | Current value of the state | `boolean` |
| actions  | A set of methods to update state value | `Actions` |

### Actions

| Property | Description        | Type                       |
|----------|--------------------|----------------------------|
| toggle   | A function to toggle state value | `() => void`               |
| set      | A function to set state value    | `(value: boolean) => void` |
| setTrue  | A function to set state value to `true`  | `() => void`               |
| setFalse | A function to set state value to `false` | `() => void`               |
