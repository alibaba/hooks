---
title: useExternal
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useExternal

A Hook for dynamically loading/unloading external resources to page.

## Example

### Basic Usage

<code src="./demo/demo1.tsx" />

### Load CSS

<code src="./demo/demo2.tsx" />

### Load Image

<code src="./demo/demo3.tsx" />

### Input a variable

<code src="./demo/demo4.tsx" />

## API

```typescript
const [status, { toggle, unload, load }] = useExternal(path: string, options?: Options);
```

### Result

| Params    | Description         | Type                                                 |
|---------|--------------|------------------------------------------------------|
| status  | The progress of loading the external resources, support `unset`, `loading`, `ready`, `error` | `string` |
| toggle  | The function for toggling the external resources | `() => void`  |
| load    | The function for loading the external resources | `() => void` |
| unload  | The function for unloading the external resources | `() => void` |

### Params

| Params     | Description                                  | Type     | Default |
|------------|----------------------------------------------|----------|---------|
| path       | The url of the external resources           | `string` | -       |

### Options

| Params     | Description                                  | Type     | Default |
|------------|----------------------------------------------|----------|---------|
| type | The type of extarnal resources which need to load, support `js`/`css`/`img`  | `string` | -      |
| async | The async properties of extarnal resources `<script>` | `boolean` | true       |
| media | The media properties of extarnal resources `<link>`, support `all`/`screen`/`print`/`handheld` | `string` | all       |
| target | The DOM or Refs of container which need to load the `<img>` | `HTMLElement` \| `(() => HTMLElement)` \| `MutableRefObject` | -      |
