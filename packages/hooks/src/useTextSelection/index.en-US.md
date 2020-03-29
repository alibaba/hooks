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

### Use Ref

<code src="./demo/demo4.tsx" />

### Set 'dom'  target

<code src="./demo/demo2.tsx" />

### Translate user text selection

<code src="./demo/demo3.tsx" />

## API

``` typescript
const [state, ref?] = useTextSelection(dom);
```

### Params

| Property | Description | Type | Default |
|-----|-----|-----|-----|
| dom？ | optional, if none is passed, this hook will subscibe to the ref that it returns | - |

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| state  | content, size, position of user text selection | detail as fallow 'state' |
| ref     | when no param is passed, this ref will be listened      | -        |

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
