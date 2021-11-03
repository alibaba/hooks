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

It is exactly the same with useState, but after the component is unmount, the setState is no longer executed to avoid memory leakage.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState] = useSafeState(initialState)
```

