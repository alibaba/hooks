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

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

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
| add      | Add key          | `(key: any) => void` |
| remove   | Remove key       | `(key: any) => void` |
| reset    | Reset to default | `() => void`         |

### Params

| Property     | Description                                    | Type          | Default |
|--------------|------------------------------------------------|---------------|---------|
| initialValue | Optional, Pass in the default Set as parameter | `Iterable<K>` | -       |
