---
nav:
  path: /hooks
---

# useDeepCompareEffect

Usage is the same as `useEffect`, but deps are compared with [lodash.isEqual](https://lodash.com/docs/4.17.15#isEqual).

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
