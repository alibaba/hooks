---
nav:
  path: /hooks
---

# useUpdateLayoutEffect

A hook alike `useLayoutEffect` but skips running the effect for the first time.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

The API is exactly the same as `React.useLayoutEffect`.

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```
