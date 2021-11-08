---
nav:
  path: /hooks
---

# useSet

A hook that can manage the state of Set.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [
  set,
  {
    add,
    remove,
    reset
  }
] = useSet(initialValue?: Iterable<K>);
```

### Result

| Property | Description      | Type                 |
|----------|------------------|----------------------|
| set      | Set object       | `Set`                |
| add      | Add item         | `(key: any) => void` |
| remove   | Remove item      | `(key: any) => void` |
| reset    | Reset to default | `() => void`         |

### Params

| Property     | Description                 | Type          | Default |
|--------------|-----------------------------|---------------|---------|
| initialValue | Optional, set default value | `Iterable<K>` | -       |
