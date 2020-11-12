---
title: useSet
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
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
    has,
    remove,
    reset
  }
] = useSet(initialValue?: Iterable<K>);
```

### Result

| Property | Description                          | Type                    |
|----------|--------------------------------------|-------------------------|
| set      | Set object                           | `Set`                   |
| add      | add key                              | `(key: any) => void`    |
| has      | Determine whether the element exists | `(key: any) => Boolean` |
| remove   | remove key                           | `(key: any) => void`    |
| reset    | reset to default                     | `() => void`            |

### Params

| Property     | Description                                    | Type          | Default |
|--------------|------------------------------------------------|---------------|---------|
| initialValue | Optional, Pass in the default Set as parameter | `Iterable<K>` | -       |
