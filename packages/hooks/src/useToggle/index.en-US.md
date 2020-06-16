---
title: useToggle
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
legacy: /state/use-toggle
---

# useToggle

A hook that switch value between two states.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Advanced usage

<code src="./demo/demo2.tsx" />

## API

```javascript
const {
  state, 
  toggle,
  setLeft,
  setRight
} = useToggle(
  defaultValue?: boolean,
);

const {
  state, 
  toggle,
  setLeft,
  setRight
} = useToggle(
  defaultValue: any = false,
  reverseValue?: any,
);
```

### Result

| Property | Description                                         | Type                 |
|----------|--------------------------------------|----------------------|
| state  | state value                         | boolean              |
| toggle | Trigger state change, accept two optional parameters | (defaultValue: any = false, reverseValue?: any) => void |
| setLeft | Set default value | () => void |
| setRight | Set reverse value | () => void |

### Params

| Property | Description                                 | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| defaultValue | Optional，set a default value  | number \| string \| boolean \| undefined | false      |
| reverseValue | Optional，set a reverse value  | number \| string \| boolean \| undefined | -      |
