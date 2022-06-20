---
nav:
  path: /hooks
---

# useCounter

A hook that manage counter.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

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
