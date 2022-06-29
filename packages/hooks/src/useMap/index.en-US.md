---
nav:
  path: /hooks
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

| Property | Description      | Type                                     |
| -------- | ---------------- | ---------------------------------------- |
| map      | Map object       | `Map`                                    |
| set      | Add item         | `(key: any, value: any) => void`         |
| get      | Get item         | `(key: any) => MapItem`                  |
| setAll   | Set a new Map    | `(newMap: Iterable<[any, any]>) => void` |
| remove   | Remove key       | `(key: any) => void`                     |
| reset    | Reset to default | `() => void`                             |

### Params

| Property     | Description                 | Type                   | Default |
| ------------ | --------------------------- | ---------------------- | ------- |
| initialValue | Optional, set default value | `Iterable<[any, any]>` | -       |
