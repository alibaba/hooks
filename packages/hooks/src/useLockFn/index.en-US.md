---
title: useLockFn
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

# useLockFn

Add lock to an async function to prevent parallel executions.

## Examples

### Prevent duplicated submits

<code src="./demo/demo1.tsx" />

## API

```typescript
function useLockFn<P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>
): fn: (...args: P) => Promise<V | undefined>
```

### Result

| Property | Description                  | Type                      |
|----------|------------------------------|---------------------------|
| fn       | The async function with lock | `(...args: any[]) => any` |

### Params

| Property       | Description       | Type                      | Default |
|----------------|-------------------|---------------------------|---------|
| fn             | An async function | `(...args: any[]) => any` | -       |
