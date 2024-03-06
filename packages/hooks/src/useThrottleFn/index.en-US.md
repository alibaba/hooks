---
title: useThrottleFn
nav: Hooks
group:
  title: Effect
  order: 5
order: 6
toc: content
demo:
  cols: 2
---

A hook that deal with the throttled function.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const {
  run,
  cancel,
  flush
} = useThrottleFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

### Params

| Property | Description                       | Type                      | Default |
| -------- | --------------------------------- | ------------------------- | ------- |
| fn       | The function to throttle.         | `(...args: any[]) => any` | -       |
| options  | Config for the throttle behaviors | `Options`                 | -       |

### Options

| Property | Description                                           | Type      | Default |
| -------- | ----------------------------------------------------- | --------- | ------- |
| wait     | The number of milliseconds to delay.                  | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.  | `boolean` | `true`  |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean` | `true`  |

### Result

| Property | Description                                            | Type                      |
| -------- | ------------------------------------------------------ | ------------------------- |
| run      | Invoke and pass parameters to fn.                      | `(...args: any[]) => any` |
| cancel   | Cancel the invocation of currently throttled function. | `() => void`              |
| flush    | Immediately invoke currently throttled function        | `() => void`              |
