---
title: useEventTarget
nav: Hooks
group:
  title: Dom
  order: 6
order: 5
toc: content
demo:
  cols: 2
---

A hook that encapsulates `onChange` and `value` logic for form controls that obtains value through `event.target.value`. It also supports custom transformer and reset functionalities.

## Example

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>

## API

```typescript
const [value, { onChange, reset }] = useEventTarget<T, U>(Options<T, U>);
```

### Result

| Property | Description                                 | Type                                    |
| -------- | ------------------------------------------- | --------------------------------------- |
| value    | component value                             | `T`                                     |
| onChange | callback when value changes                 | `(e: { target: { value: T } }) => void` |
| reset    | function to reset the value to initialValue | `() => void`                            |

### Options

| Property     | Description                                | Type              | Default |
| ------------ | ------------------------------------------ | ----------------- | ------- |
| initialValue | initial value                              | `T`               | -       |
| transformer  | custom transform function applied to value | `(value: U) => T` | -       |
