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
const [ hash, setHash ] = useHash({ onChange });
```

### Params

| Property | Description | Type      | Default |
| -------- | ----------- | --------- | ------- |
| options  | More config | `Options` | -       |

### Options

| Property | Description                            | Type                                       | Default |
| -------- | -------------------------------------- | ------------------------------------------ | ------- |
| onChange | Callback to be executed on hash change | `(hahs: string, prevHash: string) => void` | -       |

### Result

| Property | Description     | Type                        |
| -------- | --------------- | --------------------------- |
| hash     | current hash    | `string`                    |
| setHash  | change the hash | `(newHash: string) => void` |
