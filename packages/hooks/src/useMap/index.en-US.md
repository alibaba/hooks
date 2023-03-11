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
] = useMap<K, V>(initialValue);
```

### Result

| Property | Description      | Type                                 |
| -------- | ---------------- | ------------------------------------ |
| map      | Map object       | `Map<K, V>`                          |
| set      | Add item         | `(key: K, value: V) => void`         |
| get      | Get item         | `(key: K) => V \| undefined`         |
| setAll   | Set a new Map    | `(newMap: Iterable<[K, V]>) => void` |
| remove   | Remove key       | `(key: K) => void`                   |
| reset    | Reset to default | `() => void`                         |

### Params

| Property     | Description                 | Type               | Default |
| ------------ | --------------------------- | ------------------ | ------- |
| initialValue | Optional, set default value | `Iterable<[K, V]>` | -       |
