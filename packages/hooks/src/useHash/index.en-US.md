---
nav:
  path: /hooks
---

# useHash

This is a hook function that modifies the hash value.

## Examples

### Default usage

<code src="./demo/demo.tsx" />

## API

```typescript
const [hash,setHash] = useHash()
```

#### Params

No Params.

#### Return

| Property | Description     | Type                  | Default |
| -------- | --------------- | --------------------- | ------- |
| hash     | the hash        | string                | -       |
| setHash  | update the hash | `(v: string) => void` | -       |
