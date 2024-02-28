---
title: useTimeout
nav: Hooks
group:
  title: Effect
  order: 5
order: 12
toc: content
---

# useTimeout

A hook that handles the `setTimeout` timer function.

## Examples

### Default usage

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>

## API

```typescript
useTimeout(
  fn: () => void,
  delay?: number | undefined
): fn: () => void;
```

### Params

| Property | Description                                                                                                            | Type                    |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| fn       | The function to be executed after `delay` milliseconds.                                                                | `() => void`            |
| delay    | The number of milliseconds to wait before executing the function. The timer will be cancelled if delay is `undefined`. | `number` \| `undefined` |

### Result

| Property     | Description   | Type         |
| ------------ | ------------- | ------------ |
| clearTimeout | clear timeout | `() => void` |
