---
title: useCounter
nav: Hooks
group:
  title: Scene
  order: 2
order: 11
toc: content
demo:
  cols: 2
---

A hook that manage counter.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const [current, {
  inc,
  dec,
  set,
  reset
}] = useCounter(initialValue, { min, max });
```

### Result

| Property | Description                          | Type                                                   |
| -------- | ------------------------------------ | ------------------------------------------------------ |
| current  | Current value                        | `number`                                               |
| inc      | Increment, default delta is 1        | `(delta?: number) => void`                             |
| dec      | Decrement, default delta is 1        | `(delta?: number) => void`                             |
| set      | Set current value                    | `(value: number` \| `((c: number) => number)) => void` |
| reset    | Reset current value to initial value | `() => void`                                           |

### Params

| Property     | Description   | Type     | Default |
| ------------ | ------------- | -------- | ------- |
| initialValue | Initial count | `number` | `0`     |
| min          | Min count     | `number` | -       |
| max          | Max count     | `number` | -       |
