---
nav:
  path: /hooks
---

# useThrottle

A hook that deal with the throttled value.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const throttledValue = useThrottle(
  value: any,
  options?: Options
);
```

### Params

| Property | Description                        | Type      | Default |
| -------- | ---------------------------------- | --------- | ------- |
| value    | The value to throttle.             | `any`     | -       |
| options  | Config for the throttle behaviors. | `Options` | -       |

### Options

| Property | Description                                           | Type      | Default |
| -------- | ----------------------------------------------------- | --------- | ------- |
| wait     | The number of milliseconds to delay.                  | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.  | `boolean` | `true`  |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean` | `true`  |
