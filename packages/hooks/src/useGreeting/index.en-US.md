---
nav:
path: /hooks
---

# useGreeting

A hook that returns a greeting message based on the current time.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const greeting = useGreeting();
```

### Params

| Property  | Description                                                                                          | Type                        | Default |
| --------- | ---------------------------------------------------------------------------------------------------- | --------------------------- | ------- |
| prefix    | add optionally a string before the state of the day                                                  | `string`                    |         |
| suffix    | add optionally a string after the state of the day                                                   | `string`                    |         |
| transform | Optionally transform (morning/afternoon/evening/night) into uppercase/capitalize first letter letter | `uppercase` \| `capitalize` | -       |

### Result

| Property | Description            | Type     |
| -------- | ---------------------- | -------- |
| greeting | day state with options | `string` |
