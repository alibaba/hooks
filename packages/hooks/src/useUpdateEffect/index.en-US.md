---
nav:
  path: /hooks
---

# useUpdateEffect

A hook alike `useEffect` but skips running the effect for the first time.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

The API is exactly the same as `React.useEffect`.

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```
