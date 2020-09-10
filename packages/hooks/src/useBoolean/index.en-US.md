---
title: useBoolean
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
  order: 11
---

# useBoolean

A hook that elegantly manages boolean values.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [ state, { toggle, setTrue, setFalse }] = useBoolean(
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
| state    | State value   | `boolean` |
| actions  | Operation set | `Actions` |

### Actions
| Property | Description                                        | Type                        |
|----------|----------------------------------------------------|-----------------------------|
| toggle   | Trigger state change, accept an optional parameter | `(value?: boolean) => void` |
| setTrue  | Set state value true                               | `() => void`                |
| setFalse | Set state value false                              | `() => void`                |
