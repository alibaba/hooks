---
nav:
  path: /hooks
---

# useExternal

Dynamically load JS or CSS, useExternal can ensure that the resource are globally unique.

## Example

### Basic Usage

<code src="./demo/demo1.tsx" />

### Load CSS

<code src="./demo/demo2.tsx" />

## API

```typescript
const status = useExternal(path: string, options?: Options);
```

### Result

| Params | Description                                                                                  | Type     |
| ------ | -------------------------------------------------------------------------------------------- | -------- |
| status | The progress of loading the external resources, support `unset`, `loading`, `ready`, `error` | `string` |

### Params

| Params | Description                       | Type     | Default |
| ------ | --------------------------------- | -------- | ------- |
| path   | The url of the external resources | `string` | -       |

### Options

| Params         | Description                                                                                                          | Type                | Default |
| -------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| type           | The type of external resources which need to load, support `js`/`css`, if no type, it will deduced according to path | `string`            | -       |
| js             | Attributes supported by `script`                                                                                     | `HTMLScriptElement` | -       |
| css            | Attributes supported by `link`                                                                                       | `HTMLStyleElement`  | -       |
| keepWhenUnused | Allow resources to remain after they have lost their references                                                      | `boolean`           | `false` |
