---
title: useCounter
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useCounter

A hook that can manage the count.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
const [current, {
  inc,
  dec,
  set,
  reset
}] = useCounter(initialValue, {min, max});
```

### Result

| Property | Description                | Type                      |
|----------|----------------------------|---------------------------|
| current  | current count              | `number`                  |
| inc      | increment，default add 1   | `(delta?:number) => void` |
| dec      | decrement, default minus 1 | `(delta?:number) => void` |
| set      | set current count          | `(value: number` \| `((c: number) => number)) => void` |
| reset    | reset to initial value     | `() => void`              |

### Params

| Property     | Description             | Type     | Default |
|--------------|-------------------------|----------|---------|
| initialValue | initial count           | `number` | 0       |
| min          | min count               | `number` | -       |
| max          | max count               | `number` | -       |