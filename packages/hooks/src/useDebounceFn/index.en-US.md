---
title: useDebounceFn
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
legacy: /side-effect/use-debounce-fn
---

# useDebounceFn

A hook that handle the debounce function.

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
} = useDebounceFn(
  fn: (...args: any[]) => any,
  wait: number
);

const {
  run,
  cancel
} = useDebounceFn(
  fn: (...args: any[]) => any,
  deps: any[],
  wait: number
);
```

### Result

| Property | Description                               | Type                    |
|----------|-------------------------------------------|-------------------------|
| run      | trigger fn, parameters will be send to fn | (...args: any[]) => any |
| cancel   | cancel current debounce                   | () => void              |

### Params

| Property | Description                                                                  | Type                    | Default |
|----------|------------------------------------------------------------------------------|-------------------------|---------|
| fn       | function that requires debounce                                              | (...args: any[]) => any | -       |
| deps     | dependent array, if the array changes, it will trigger fn after waiting time | any[]                   | -       |
| wait     | wait time in milliseconds                                                    | number                  | 1000    |
