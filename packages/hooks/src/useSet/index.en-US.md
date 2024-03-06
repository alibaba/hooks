---
title: useSet
nav: Hooks
group:
  title: State
  order: 4
order: 11
toc: content
demo:
  cols: 2
---

A hook that can manage the state of Set.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const [
  set,
  {
    add,
    remove,
    reset
  }
] = useSet<K>(initialValue);
```

### Result

| Property | Description      | Type               |
| -------- | ---------------- | ------------------ |
| set      | Set object       | `Set<K>`           |
| add      | Add item         | `(key: K) => void` |
| remove   | Remove item      | `(key: K) => void` |
| reset    | Reset to default | `() => void`       |

### Params

| Property     | Description                 | Type          | Default |
| ------------ | --------------------------- | ------------- | ------- |
| initialValue | Optional, set default value | `Iterable<K>` | -       |
