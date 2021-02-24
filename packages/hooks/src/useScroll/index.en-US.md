---
title: useScroll
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useScroll

Get the scroll position of an element.


## Examples

### Basic Usage

<code src="./demo/demo1.tsx" />

### Detect Whole Page Scroll

<code src="./demo/demo2.tsx" />

### Controll listen on scroll status

<code src="./demo/demo3.tsx" />

## API

```typescript
const position = useScroll(target, shouldUpdate);
```

### Params

| Property     | Description                           | Type                                      | Default                                  |
|--------------|---------------------------------------|-------------------------------------------|------------------------------------------|
| target       | DOM element or Ref object             |  `HTMLElement` \| `(() => HTMLElement)` \| `Document` \| `React.MutableRefObject` | `document`                               |
| shouldUpdate | controll weather update scroll status | `({ top: number, left: number}) => boolean` | `({ top: number, left: number}) => true` |


### Result

| Property | Description                                 | Type                          |
|----------|---------------------------------------------|-------------------------------|
| position | The current scroll position of the element. | `{left: number, top: number}` |
