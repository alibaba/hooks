---
title: useToggle
nav: Hooks
group:
  title: State
  order: 4
order: 3
toc: content
demo:
  cols: 2
---

A hook that toggle states.

## Examples

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>

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
