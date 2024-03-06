---
title: useDebounce
nav: Hooks
group:
  title: State
  order: 4
order: 8
toc: content
demo:
  cols: 2
---

A hook that deal with the debounced value.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const debouncedValue = useDebounce(
  value: any,
  options?: Options
);
```

### Params

| Property | Description                        | Type      | Default |
| -------- | ---------------------------------- | --------- | ------- |
| value    | The value to debounce.             | `any`     | -       |
| options  | Config for the debounce behaviors. | `Options` | -       |

### Options

| Property | Description                                                         | Type      | Default |
| -------- | ------------------------------------------------------------------- | --------- | ------- |
| wait     | The number of milliseconds to delay.                                | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.                | `boolean` | `false` |
| trailing | Specify invoking on the trailing edge of the timeout.               | `boolean` | `true`  |
| maxWait  | The maximum time func is allowed to be delayed before it’s invoked. | `number`  | -       |
