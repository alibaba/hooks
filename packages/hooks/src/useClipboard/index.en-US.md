---
nav:
  path: /hooks
---

# useClipboard

Clipboard Hook

## Examples

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

##### Default Source

<code src="./demo/demo3.tsx" />

## API

```typescript
const { text, isSupport, onCopy } = useClipboard({
  source?: string
});
```

### Params

| Property | Description           | Type             | Default |
| -------- | --------------------- | ---------------- | ------- |
| options  | Optional，More config | ClipboardOptions | `{}`    |

### ClipboardOptions

| Property | Description                 | Type   | Default |
| -------- | --------------------------- | ------ | ------- |
| source   | Optional，Source to be Copy | string | `""`    |

### Result

| Property  | Description     | Type                                |
| --------- | --------------- | ----------------------------------- |
| isSupport | Is support copy | `boolean`                           |
| text      | coped value     | `string`                            |
| onCopy    | copy event      | `(value?: string) => Promise<void>` |
