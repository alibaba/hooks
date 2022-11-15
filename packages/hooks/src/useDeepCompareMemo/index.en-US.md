---
nav:
  path: /hooks
---

# useDeepCompareMemo

Usage is the same as `useMemo`, but deps are compared with [lodash.isEqual](https://lodash.com/docs/4.17.15#isEqual).

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useDeepCompareMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T;
```
