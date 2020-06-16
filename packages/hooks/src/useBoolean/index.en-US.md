---
title: useBoolean
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
  order: 11
legacy: /state/use-boolean
---

# useBoolean

A hook that elegantly manages boolean values.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
const [ state, { toggle, setTrue, setFalse }] = useBoolean(
  defaultValue?: boolean,
);
```

### Params

| Property | Description                                 | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| defaultValue | Optional，set a default value  | boolean \| undefined | false      |

### Result

| Property | Description                                         | Type                 |
|----------|--------------------------------------|----------------------|
| state  | State value | boolean |
| actions | Operation set | object |

### Actions
| Property | Description                                         | Type                 |
|----------|--------------------------------------|----------------------|
| toggle | Trigger state change, accept an optional parameter | (value?: any) => void |
| setTrue | Set state value true | () => void |
| setFalse | Set state value false | () => void |
