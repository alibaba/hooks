---
title: useThrottle
nav: Hooks
group:
  title: State
  order: 4
order: 9
toc: content
demo:
  cols: 2
---

A hook that deal with the throttled value.

## Examples

<code src="./demo/demo1.tsx"></code>

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
