---
title: useThrottleFn
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useThrottleFn

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook that handle the throttle function.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

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

| Property | Description                                                  | Type                      | Default |
|----------|--------------------------------------------------------------|---------------------------|---------|
| fn       | The function to throttle.                                    | `(...args: any[]) => any` | `-`     |
| options  | Config the throttle behavior. See the Options section below. | `Options`                 | `{}`    |

### Options

| Property | Description                                           | Type      | Default |
|----------|-------------------------------------------------------|-----------|---------|
| wait     | The number of milliseconds to delay.                  | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.  | `boolean` | `true`  |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean` | `true`  |

### Result

| Property | Description                               | Type                      |
|----------|-------------------------------------------|---------------------------|
| run      | Trigger fn, parameters will be send to fn | `(...args: any[]) => any` |
| cancel   | Cancel current throttle                   | `() => void`              |
| flush    | Immediately invoke current throttle       | `() => void`              |
