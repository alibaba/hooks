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

| 参数    | 说明        | 类型      | 默认值 |
| ------- | ----------- | --------- | ------ |
| options | More config | `Options` | -      |

### Options

| 参数     | 说明                                   | 类型                                       | 默认值 |
| -------- | -------------------------------------- | ------------------------------------------ | ------ |
| onChange | Callback to be executed on hash change | `(hahs: string, prevHash: string) => void` | -      |

### Result

| Property | Description     | Type                        |
| -------- | --------------- | --------------------------- |
| hash     | current hash    | `string`                    |
| setHash  | change the hash | `(newHash: string) => void` |
