---
title: useSet
group:
  title: State
  path: /state
  order: 600
---

# useSet

A hook that can manage state in Set

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
const [
  set,
  {
    add,
    has,
    remove,
    reset
  }
] = useSet(initialValue?: any[]);
```

### Result

| Property | Description                                         | Type                 |
|----------|--------------------------------------|----------------------|
| set  | Set object                         | Set              |
| add | add key | (key: any) => void |
| has | Determine whether elements exist | (key: any) => Boolean |
| remove | remove key | (key: any) => void |
| reset | reset to default | () => void |

### Params

| Property | Description                                 | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| initialValue | 可选项，传入默认的 Set 参数  | Iterable<K\> | -      |
