---
title: useTextSelection
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /dom/use-text-selection
---

# useTextSelection

Tracking content, size, position of user text selection

## Examples

### Set 'dom'  target

<code src="./demo/demo1.tsx" />

### Use Ref

<code src="./demo/demo3.tsx" />

### Translate user text selection

<code src="./demo/demo2.tsx" />

## API

``` ts
const state = useTextSelection(target);
```

### Params

| Property | Description | Type | Default |
|-----|-----|-----|-----|
| target | DOM element or Ref Object | () => HTMLElement \| React.RefObject | - |

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| state  | content, size, position of user text selection | detail as fallow 'state' |

#### state

| Property | Description | Type |
|-----|-----|-----|
| text | Selected text | string |
| left | The left coordinate value of text | number |
| right | The right coordinate value of text | number |
| top |  The top coordinate value of text | number |
| bottom | The bottom coordinate value of text | number |
| height | The height of text | number |
| width | The width of text | number |
