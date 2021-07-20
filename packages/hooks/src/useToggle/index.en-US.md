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

A hook that switch value between two states.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Advanced usage

<code src="./demo/demo2.tsx" />

## API

```typescript
const [state, { toggle, set, setLeft, setRight }] = useToggle(
  defaultValue?: boolean,
);

const [state, { toggle, set, setLeft, setRight }] = useToggle(
  defaultValue: any,
  reverseValue: any,
);
```

### Params

| Property     | Description                   | Type  | Default |
|--------------|-------------------------------|-------|---------|
| defaultValue | Optional，set a default value | `any` | false   |
| reverseValue | Optional，set a reverse value | `any` | -       |

### Result

| Property | Description   | Type      |
|----------|---------------|-----------|
| state    | state value   | -         |
| actions  | Operation set | `Actions` |

### Actions

| Property | Description      | Type                    |
|----------|------------------|-------------------------|
| toggle   | Toggle state     | `() => void`            |
| set      | Set state        | `(state?: any) => void` |
| setLeft  | Set defaultValue | `() => void`            |
| setRight | Set reverseValue | `() => void`            |
