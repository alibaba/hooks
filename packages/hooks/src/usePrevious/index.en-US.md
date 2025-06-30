---
title: usePrevious
nav: Hooks
group:
  title: State
  order: 4
order: 12
toc: content
demo:
  cols: 2
---

A Hook to return the previous state.

## Examples

<code src="./demo/demo1.tsx"></code>
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
