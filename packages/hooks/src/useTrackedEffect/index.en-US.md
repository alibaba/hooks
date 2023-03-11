---
nav:
  path: /hooks
---

# useTrackedEffect

A hook of useEffect that allow us to track which dependencies caused the effect to trigger.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useTrackedEffect(
  effect: (changes: [], previousDeps: [], currentDeps: []) => (void | (() => void | undefined)),
  deps?: deps,
)
```

The API is alike `React.useEffect`, but the first function will receive three parameters: `changes`, `previousDeps`, and `currentDeps`.

- changes: Index of changed dependencies
- previousDeps: Last deps
- currentDeps: Current deps
