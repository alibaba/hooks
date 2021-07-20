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

A hook that elegantly manages boolean values.

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
| defaultValue | Optional，set a default value | `boolean` | `false` |

### Result

| Property | Description   | Type      |
|----------|---------------|-----------|
| state    | Current State | `boolean` |
| actions  | Operation set | `Actions` |

### Actions
| Property | Description        | Type                       |
|----------|--------------------|----------------------------|
| toggle   | Toggle state       | `() => void`               |
| set      | Set state          | `(value: boolean) => void` |
| setTrue  | Set state to true  | `() => void`               |
| setFalse | Set state to false | `() => void`               |
