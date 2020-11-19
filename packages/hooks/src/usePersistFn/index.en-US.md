---
title: usePersistFn
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

# usePersistFn

Hooks for persistent functions.

> Reference [How to read an often-changing value from useCallback?](https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback)
>
> In some rare cases you might need to memoize a callback with useCallback but the memoization doesn’t work very well because the inner function has to be re-created too often. For super-complex subcomponents, re-rendering can impact performance. With usePersistFn, you can guarantee that the function reference will never change.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
type noop = (...args: any[]) => any;

const fn = usePersistFn<T extends noop>(
  fn: T
);
```

### Result

| Property | Description                            | Type                      |
|----------|----------------------------------------|---------------------------|
| fn       | Fn the reference address never changes | `(...args: any[]) => any` |

### Params

| Property | Description                        | Type                      | Default |
|----------|------------------------------------|---------------------------|---------|
| fn       | Functions that require persistence | `(...args: any[]) => any` | -       |
