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
<code src="./demo/demo3.tsx" />

## API

```typescript
useTimeout(
  fn: () => void,
  delay?: number | undefined
  options?: { defaultActive?: boolean }
): {
  clear: () => void;
  start: () => void;
  isActive: boolean;
};
```

### Params

| Property              | Description                                                                                                            | Type                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| fn                    | The function to be executed after `delay` milliseconds.                                                                | `() => void`            |
| delay                 | The number of milliseconds to wait before executing the function. The timer will be cancelled if delay is `undefined`. | `number` \| `undefined` |
| options.defaultActive | setTimeout runs on mount if defaultActive is `true`                                                                    | boolean                 |

### Result

| Property | Description                                                                                    | Type         |
| -------- | ---------------------------------------------------------------------------------------------- | ------------ |
| clear    | clear timeout                                                                                  | `() => void` |
| start    | start timeout                                                                                  | `() => void` |
| isActive | indicates whether setTimeout is active, remains `true` after setTimeout is running or finished | `boolean`    |
