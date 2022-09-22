---
nav:
  path: /hooks
---

# useDefault

This is a hook function that can use the default state value, if the initial state value is null and undefined, the default state value is adopted.

## Examples

### Default usage

<code src="./demo/demo.tsx" />

## API

```typescript
const [state,setState] = useDefault(defaultState,initialState);
```

#### Params

| Property     | Description   | Type | Default |
| ------------ | ------------- | ---- | ------- |
| defaultState | default state | T    | -       |
| initialState | initial state | T    | -       |

#### Return

| Property | Description      | Type                          | Default |
| -------- | ---------------- | ----------------------------- | ------- |
| state    | the state        | T                             | -       |
| setState | update the state | `Dispatch<SetStateAction<U>>` | -       |
