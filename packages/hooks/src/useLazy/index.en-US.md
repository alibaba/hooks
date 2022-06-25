---
nav:
  path: /hooks
---

# useLazy

A hook to lazily get a memoized value, potentially solving useEffect double call in React 18 Strict Mode.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const lazyCallback: () => T = useLazy<T>(
  callback: () => T,
  deps: DependencyList
);
```
