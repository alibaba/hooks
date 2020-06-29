---
title: useCookieState
nav:
  title: Hooks
  path: /hooks
group:
  title: State Hooks
  path: /state
legacy: /state/use-cookie-state
---

# useCookieState

A Hook for persisting state into cookie.

## Examples

### Persist state into cookie

<code src="./demo/demo1.tsx" />

### Persist objects

<code src="./demo/demo2.tsx" />

### Persist objects with function updater

<code src="./demo/demo3.tsx" />

## API

```typescript
interface IOptions<T = any> {
  defaultValue?: T | (previousState?: T) => T;
  timestamp?: number;
  path?: string;
  expires?: Date;
}

const [state, setState] = useCookieState<T>(
  key: string,
  options?: IOptions,
): [T | undefined, (value?: T | (previousState?: T) => T) => void]
```
If you want to delete this record from document.cookie, you can use `setState()` or `setState(undefined)`.
