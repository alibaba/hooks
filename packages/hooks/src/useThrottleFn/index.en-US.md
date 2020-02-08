---
title: useThrottleFn
group:
  title: SideEffect
  path: /side-effect
  order: 700
---

# useThrottleFn

A Hook that handles function throttling.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Using deps properly

<code src="./demo/demo2.tsx" />

## API

```javascript
const {
  run,
  cancel
} = useThrottleFn(
  fn: (...args: any[]) => any,
  wait: number
);

const {
  run,
  cancel
} = useThrottleFn(
  fn: (...args: any[]) => any,
  deps: any[],
  wait: number
);
```

### Result

| Property | Description                               | Type                    |
|----------|-------------------------------------------|-------------------------|
| run      | trigger fn, parameters will be send to fn | (...args: any[]) => any |
| cancel   | cancel current throttle                   | () => void              |

### Params

| Property | Description                                                                  | Type                    | Default |
|----------|------------------------------------------------------------------------------|-------------------------|---------|
| fn       | function that requires throttle                                              | (...args: any[]) => any | -       |
| deps     | dependent array, if the array changes, it will trigger fn throttling after throttling | any[]                   | -       |
| wait     | Throttling interval in milliseconds
                                                    | number                  | 1000    |