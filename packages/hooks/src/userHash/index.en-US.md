---
nav:
  path: /hooks
---

# useHash

A hook that tracks the location hash.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
const [ hash, setHash ] = useHash();
```

### Result

| Property | Description     | Type                        |
| -------- | --------------- | --------------------------- |
| hash     | current hash    | `string`                    |
| setHash  | change the hash | `(newHash: string) => void` |
