---
title: useMap
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useMap

A hook that can manage the state of Map.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [
  map,
  {
    set, 
    setAll, 
    remove, 
    reset, 
    get
  }
] = useMap(initialValue?: Iterable<[any, any]>);
```

### Result

| Property | Description             | Type                                     |
|----------|-------------------------|------------------------------------------|
| map      | Map object              | `Map`                                    |
| set      | add key                 | `(key: any, value: any) => void`         |
| get      | get key                 | `(key: any) => MapItem`                  |
| setAll   | add and reset a new Map | `(newMap: Iterable<[any, any]>) => void` |
| remove   | remove key              | `(key: any) => void`                     |
| reset    | reset to default        | `() => void`                             |

### Params

| Property     | Description                                    | Type                   | Default |
|--------------|------------------------------------------------|------------------------|---------|
| initialValue | Optional, Pass in the default Map as parameter | `Iterable<[any, any]>` | -       |
