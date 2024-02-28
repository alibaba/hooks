---
title: usePrevious
nav: Hooks
group:
  title: State
  order: 4
order: 12
toc: content
---

# usePrevious

A Hook to return the previous state.

## Examples

### Default usage

<code src="./demo/demo1.tsx"></code>

### Custom shouldUpdate function

<code src="./demo/demo2.tsx"></code>

## API

```typescript
const previousState: T = usePrevious<T>(
  state: T,
  shouldUpdate?: (prev: T | undefined, next: T) => boolean
);
```

### Result

| Property      | Description        | Type |
| ------------- | ------------------ | ---- |
| previousState | The previous value | `T`  |

### Params

| Property     | Description                                                   | Type                                         | Default                      |
| ------------ | ------------------------------------------------------------- | -------------------------------------------- | ---------------------------- |
| state        | The state that needs to be tracked                            | `T`                                          | -                            |
| shouldUpdate | Optional. Customize whether the state value should be updated | `(prev: T \| undefined, next: T) => boolean` | `(a, b) => !Object.is(a, b)` |
