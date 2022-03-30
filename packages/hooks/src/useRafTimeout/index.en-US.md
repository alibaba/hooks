---
nav:
  path: /hooks
---

# useRafTimeout

A hook implements with `requestAnimationFrame` for better performance. The API is consistent with `useTimeout`.

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
);
```

### Params

| Property | Description                                                                                                                                                   | Type                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| fn       | The function to be executed every `delay` milliseconds.                                                                                                       | `() => void`            |
| delay    | The time in milliseconds, the timer should delay in between executions of the specified function. The timer will be cancelled if delay is set to `undefined`. | `number` \| `undefined` |
