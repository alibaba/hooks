---
title: useSet
group:
  title: State1
  path: /state1
  order: 600
---

# useSet

A hook that elegantly manages boolean values.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
const [
  set,
  {
    add,
    has,
    remove,
    reset
  }
] = useSet(initialValue?);
```

### Result

| Property | Description                                         | Type                 |
|----------|--------------------------------------|----------------------|
| state  | State value                         | boolean              |
| toggle | Trigger state change, accept an optional parameter | (value?: any) => void |
| setTrue | Set state value true | () => void |
| setFalse | Set state value false | () => void |

### Params

| Property | Description                                 | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| defaultValue | Optional，set a default value  | boolean \| undefined | false      |
