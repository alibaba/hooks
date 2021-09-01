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

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

It is exactly the same with useState, but after the component is unloaded, the setstate is no longer executed to avoid memory leakage caused by updating the state after the component is unloaded.


## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState] = useSafeState(initialState)
```

