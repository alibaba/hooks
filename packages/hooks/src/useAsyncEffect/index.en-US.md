---
nav:
  path: /hooks
---

# useAsyncEffect

useEffect support async function.

## 代码演示

### Default usage

<code src="./demo/demo1.tsx" />

### Break off

<code src="./demo/demo2.tsx" />

When a cancelled effect reaches a `yield` checkpoint, its async generator is closed so that `finally` blocks can release resources.

## API

```typescript
function useAsyncEffect(
  effect: () => AsyncGenerator | Promise<void> | (() => void),
  deps: DependencyList
);
```
