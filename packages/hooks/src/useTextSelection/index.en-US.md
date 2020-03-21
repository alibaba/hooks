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

### Default Usage

<code src="./demo/demo1.tsx" />

### Set 'element'  target

<code src="./demo/demo2.tsx" />

### Translate user text selection

<code src="./demo/demo3.tsx" />


## API

``` typescript
const state: {
  text: string;
} = useTextSelection(element: string | HTMLElement | Document)
```

### Params

| Property | Description | Type | Default |
|-----|-----|-----|-----|
| element | Specifies the text selection  listen to 'element'  | string, eg："#target-id", ".target-class" | document |

### Result

| Property | Description | Type |
|-----|-----|-----|
| text | Selected text | string |
| left | The left coordinate value of text | number |
| right | The right coordinate value of text | number |
| top |  The top coordinate value of text | number |
| bottom | The bottom coordinate value of text | number |
| height | The height of text | number |
| width | The width of text | number |
