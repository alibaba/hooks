---
title: useLocalStorageState
nav:
  title: Hooks
  path: /hooks
group:
  title: State Hooks
  path: /state
---

# useLocalStorageState

A Hook for persisting state into localStorage.

## Examples

### Persist state into localStorage

<code src="./demo/demo1.tsx" />

### Persist objects

<code src="./demo/demo2.tsx" />

### Persist objects with function updater

<code src="./demo/demo3.tsx" />

## API

```typescript
const [state, setState] = useLocalStorageState<T>(
  key: string,
  defaultValue?: T | (() => T),
): [T?, (value?: T | ((previousState: T) => T)) => void]
```

The API is very similiar to `useState`, but there is an extra `key` parameter for specifying the key of localStorage. The return value is the same as `useState`. When `setState` gets called, it will update the new value to localStorage automatically.

If you want to delete this record from localStorage, you can use `setState()` or `setState(undefined)`.
