---
nav:
  path: /hooks
---

# useRafInterval

A hook implements with `requestAnimationFrame` for better performance. The API is consistent with `useInterval`, the advantage is that the execution of the timer can be stopped when the page is not rendering, such as page hiding or minimization.

Please note that the following two cases are likely to be inapplicable, and `useInterval` is preferred:

- the time interval is less than `16ms`
- want to execute the timer when page is not rendering;

> `requestAnimationFrame` will automatically downgrade to `setInterval` in node environment

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Advanced usage

<code src="./demo/demo2.tsx" />

## API

```typescript
useRafInterval(
  fn: () => void,
  delay?: number | undefined,
  options?: Options
): fn: () => void;
```

### Params

| Property | Description                                                                                                                                                   | Type                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| fn       | The function to be executed every `delay` milliseconds.                                                                                                       | `() => void`            |
| delay    | The time in milliseconds, the timer should delay in between executions of the specified function. The timer will be cancelled if delay is set to `undefined`. | `number` \| `undefined` |
| options  | Config of the interval behavior.                                                                                                                              | `Options`               |

### Options

| Property  | Description                                                            | Type      | Default |
| --------- | ---------------------------------------------------------------------- | --------- | ------- |
| immediate | Whether the function should be executed immediately on first execution | `boolean` | `false` |

### Result

| Property      | Description    | Type         |
| ------------- | -------------- | ------------ |
| clearInterval | clear interval | `() => void` |
