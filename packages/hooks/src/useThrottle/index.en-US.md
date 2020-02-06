---
title: useThrottle
group:
  title: SideEffect
  path: /side-effect
  order: 700
---

# useThrottle

A hook that handle the throttle value.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
const ThrottledValue = useThrottle(
  value: any,
  wait: number
);
```

### Params

| Property | Description                  | Type   | Default |
|----------|------------------------------|--------|---------|
| value    | value that requires throttle | any    | -       |
| wait     | wait time in milliseconds    | number | 1000    |