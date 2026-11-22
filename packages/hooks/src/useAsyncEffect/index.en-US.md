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

When a cancelled effect reaches a `yield` checkpoint in the generator body, the hook closes the generator and runs the `finally` blocks entered during closure. Use `await` for asynchronous cleanup inside `finally`. If cancellation closes a generator already suspended at a `yield` inside `finally`, the remaining statements in that block may be skipped.

## API

```typescript
function useAsyncEffect(
  effect: () => AsyncGenerator | Promise<void> | (() => void),
  deps: DependencyList
);
```
