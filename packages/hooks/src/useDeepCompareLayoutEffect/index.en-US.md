---
nav:
  path: /hooks
---

# useDeepCompareLayoutEffect

Usage is the same as `useLayoutEffect`, but deps are compared with [react-fast-compare](https://www.npmjs.com/package/react-fast-compare).

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useDeepCompareLayoutEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
);
```
