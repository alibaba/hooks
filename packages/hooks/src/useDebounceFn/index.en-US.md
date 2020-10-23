---
title: useDebounceFn
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useDebounceFn

A hook that handle the debounce function.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
const {
  run,
  cancel
} = useDebounceFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

### Params

| Property | Description                                                  | Type                      | Default |
|----------|--------------------------------------------------------------|---------------------------|---------|
| fn       | The function to debounce.                                    | `(...args: any[]) => any` | -       |
| options  | Config the debounce behavior. See the Options section below. | `Options`                 | `{}`    |

### Options

| Property | Description                                           | Type      | Default |
|----------|-------------------------------------------------------|-----------|---------|
| wait     | The number of milliseconds to delay.                  | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.  | `boolean` | `false` |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean` | `true`  |

### Result

| Property | Description                               | Type         |
|----------|-------------------------------------------|--------------|
| run      | trigger fn, parameters will be send to fn | `(...args: any[]) => any` |
| cancel   | cancel current debounce                   | `() => void` |
| flush    | immediately invoke current debounce       | `() => void` |
