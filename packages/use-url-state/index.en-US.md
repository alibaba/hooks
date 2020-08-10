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

> This hook relies on useLocation & useHistory from `react-router`, to use this hook, you need to first install
`@ahooksjs/use-url-state` and then `import useUrlState from '@ahooksjs/use-url-state'`;

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

## API

```typescript
const [state, setState] = useUrlState(initialState, options);
```


### Params

| Property | Description                         | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| initialState | initialState, same as useState      | S \| () => S                    | -      |
| options | url config                  | UrlConfig                    | -      |

### Options

| Property | Description                            | Type                   | Default |
|------|--------------|--------|--------|
| navigateMode | type of history navigate mode | 'push' \| 'replace' | 'replace'    |

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| state  | same as useState                             | S    |
| setState     | same as useState                             |  (state: S) => void \| (() => ((state: S) => S))      |
