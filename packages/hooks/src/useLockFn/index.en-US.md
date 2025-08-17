---
nav:
  path: /hooks
---

# useLockFn

Add lock to an async function to prevent parallel executions.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

```typescript
function useLockFn<P extends any[] = any[], V = any>(
  fn: (...args: P) => Promise<V>
): fn: (...args: P) => Promise<V | undefined>;
```

### Result

| Property | Description                  | Type                               |
| -------- | ---------------------------- | ---------------------------------- |
| fn       | The async function with lock | `(...args: any[]) => Promise<any>` |

### Params

| Property | Description       | Type                               | Default |
| -------- | ----------------- | ---------------------------------- | ------- |
| fn       | An async function | `(...args: any[]) => Promise<any>` | -       |
