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

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook that manages the state of a counter.

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
}] = useCounter(initialValue, {min, max});
```

### Result

| Property | Description                | Type                      |
|----------|----------------------------|---------------------------|
| current  | Current counter value | `number`                  |
| inc      | Increment current value, by 1 if not specified    | `(delta?:number) => void` |
| dec      | Decrement current value, by 1 if not specified | `(delta?:number) => void` |
| set      | Set current value  | `(value: number` \| `((c: number) => number)) => void` |
| reset    | Reset current value to initial value    | `() => void`              |

### Params

| Property     | Description             | Type     | Default |
|--------------|-------------------------|----------|---------|
| initialValue | Initial count           | `number` | `0`     |
| min          | Min count               | `number` | -       |
| max          | Max count               | `number` | -       |