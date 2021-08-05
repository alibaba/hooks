---
title: useDebounce
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useDebounce

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook that deal with the debounced value.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const debouncedValue = useDebounce(
  value: any,
  options?: Options
);
```

### Params

| Property | Description                                                                   | Type      | Default |
| -------- | ----------------------------------------------------------------------------- | --------- | ------- |
| value    | The value to debounce.                                                        | `any`     | -       |
| options  | Config for the debounce behaviors. See the Options section below for details. | `Options` | `{}`    |

### Options

| Property | Description                                           | Type      | Default |
| -------- | ----------------------------------------------------- | --------- | ------- |
| wait     | The number of milliseconds to delay.                  | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.  | `boolean` | `false` |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean` | `true`  |
