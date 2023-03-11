---
nav:
  path: /hooks
---

# useRafTimeout

A hook implements with `requestAnimationFrame` for better performance. The API is consistent with `useTimeout`. the advantage is that will not trigger function when the page is not rendering, such as page hiding or minimization.

> `requestAnimationFrame` will automatically downgrade to `setTimeout` in node environment

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Advanced usage

<code src="./demo/demo2.tsx" />

## API

```typescript
useRafTimeout(
  fn: () => void,
  delay?: number | undefined,
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
