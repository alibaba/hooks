---
nav:
  path: /hooks
---

# useImmediateEffect

A hook alike `useEffect` but calls the effect immediately instead of after render when dependencies changed.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

The API is exactly the same as `React.useEffect`.

```typescript
useImmediateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```
