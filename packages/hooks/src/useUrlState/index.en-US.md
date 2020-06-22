---
title: useUrlState
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
legacy: /state/use-url-state
---

# useUrlState

A hook that stores the state into url query parameters.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [ state, setState ] = useUrlState(key, initialState);
```

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| key | query param key | string | -      |
| initialState | initialState, same as useState                       | S \| () => S                    | -      |


### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| state  | same as useState                             | S    |
| setState     | same as useState                             |  (state: S) => void \| (() => ((state: S) => S))      |
