---
nav:
  path: /hooks
---

# useInterval

A hook that handles the `setInterval` timer function.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Advanced usage

<code src="./demo/demo2.tsx" />

## API

```typescript
useInterval(
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
