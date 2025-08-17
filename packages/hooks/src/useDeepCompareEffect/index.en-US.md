---
nav:
  path: /hooks
---

# useDeepCompareEffect

Usage is the same as `useEffect`, but deps are compared with [react-fast-compare](https://www.npmjs.com/package/react-fast-compare).

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useDeepCompareEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
);
```
