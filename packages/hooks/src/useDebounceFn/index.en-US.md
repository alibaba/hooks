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

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook that deal with the debounced function.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const {
  run,
  cancel,
  flush
} = useDebounceFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

### Params

| Property | Description                                                                   | Type                      | Default |
| -------- | ----------------------------------------------------------------------------- | ------------------------- | ------- |
| fn       | The function to debounce.                                                     | `(...args: any[]) => any` | -       |
| options  | Config for the debounce behaviors. See the Options section below for details. | `Options`                 | `{}`    |

### Options

| Property | Description                                           | Type      | Default |
|----------|-------------------------------------------------------|-----------|---------|
| wait     | The number of milliseconds to delay.                  | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.  | `boolean` | `false` |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean` | `true`  |

### Result

| Property | Description                                            | Type                      |
|----------|--------------------------------------------------------|---------------------------|
| run      | Invode and pass parameters to fn.                      | `(...args: any[]) => any` |
| cancel   | Cancel the invocation of currently debounced function. | `() => void`              |
| flush    | Immediately invoke currently debounced function.       | `() => void`              |
