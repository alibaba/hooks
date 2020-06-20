---
title: useThrottle
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
  order: 7
legacy: /side-effect/use-throttle
---

# useThrottle

A hook that handle the throttle value.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
const throttledValue = useThrottle(
  value: any,
  options?: object
);
```

### Params

| Property | Description                  | Type   | Default |
|----------|------------------------------|--------|---------|
| value    | value that requires throttle | any    | -       |
| options  | Config the throttle behavior. See the Options section below.                                                    | object                  | {}    |

### Options

| Property | Description                  | Type   | Default |
|----------|------------------------------|--------|---------|
| wait | The number of milliseconds to delay. | number | 1000 |
| leading | Specify invoking on the leading edge of the timeout. | boolean | true |
| trailing | Specify invoking on the trailing edge of the timeout. | boolean | true |
