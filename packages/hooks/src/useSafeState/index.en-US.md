---
title: useSafeState
nav: Hooks
group:
  title: State
  order: 4
order: 14
toc: content
demo:
  cols: 2
---

It is exactly the same with `React.useState` , but after the component is unmounted, the `setState` in the asynchronous callback will no longer be executed to avoid memory leakage caused by updating the state after the component is unmounted.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const [state, setState] = useSafeState(initialState);
```
