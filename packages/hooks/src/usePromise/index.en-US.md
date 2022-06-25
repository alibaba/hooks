---
nav:
  path: /hooks
---

# usePromise

Use promises with React lifecycle to avoid race condition and memory leak.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const getPromise: () => R = usePromise<R extends Promise<any>>(
  callback: () => R,
  deps: React.DependencyList
);
```
