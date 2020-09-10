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

A hook that switch value between two states.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Advanced usage

<code src="./demo/demo2.tsx" />

## API

```typescript
const [state, { toggle, setLeft, setRight }] = useToggle(
  defaultValue?: boolean,
);

const [state, { toggle, setLeft, setRight }] = useToggle(
  defaultValue: any = false,
  reverseValue?: any,
);
```

### Params

| Property     | Description                  | Type                                     | Default |
| ------------ | ---------------------------- | ---------------------------------------- | ------- |
| defaultValue | Optional，set a default value | `number` \| `string` \| `boolean` \| `undefined` | false   |
| reverseValue | Optional，set a reverse value | `number` \| `string` \| `boolean` \| `undefined` | -       |

### Result

| Property | Description   | Type    |
| -------- | ------------- | ------- |
| state    | state value   | - |
| actions  | Operation set | `Actions`  |

### Actions

| Property | Description                                          | Type                  |
| -------- | ---------------------------------------------------- | --------------------- |
| toggle   | Trigger state change                                 | `(state?: any) => void` |
| setLeft  | Set defaultValue                                    | `() => void`            |
| setRight | Set reverseValue                                    | `() => void`            |
