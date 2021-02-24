---
title: useSafeState
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

# useSafeState
It is exactly the same with React.useState , but after the component is unloaded, the setstate in the asynchronous callback is no longer executed to avoid memory leakage caused by updating the state after the component is unloaded



## Examples


<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState] = useSafeState(initialState)
```

