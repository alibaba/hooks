---
title: useSetState
nav: Hooks
group:
  title: State
  order: 4
order: 1
---

# useSetState

useSetState works similar to `this.setState` of class component, used to manage the state of object type.

## Examples

### Default usage

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const [state, setState] = useSetState<T extends Record<string, any>>(
  initialState: T = {} as T
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void]
```
