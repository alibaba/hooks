---
nav:
  path: /hooks
---

# useTimeout

A hook that handles the `setTimeout` timer function.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />
<code src="./demo/demo2.tsx" />

## API

```typescript
useTimeout(
  fn: () => void,
  delay?: number | undefined
): fn: () => void;
```

### Params

| Property | Description                                                                                                            | Type                    |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| fn       | The function to be executed after `delay` milliseconds.                                                                | `() => void`            |
| delay    | The number of milliseconds to wait before executing the function. The timer will be cancelled if delay is `undefined`. | `number` \| `undefined` |

### Result

| Property     | Description   | Type         |
| ------------ | ------------- | ------------ |
| clearTimeout | clear timeout | `() => void` |
