---
title: useHover
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /dom/use-hover
---

# useHover
React UI sensor hooks that track if some element is being hovered by a mouse.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Lazy Load
<code src="./demo/demo2.tsx" />

## API

```javascript
// If there is no dom parameter, ref is returned
const {state, ref} = useHover({
    onEnter,
    onLeave,
});

// If there is a dom, ref is not returned
const [state] = useHover({
  dom?,
  onEnter,
  onLeave,
});

```

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| isHovering   | Determine whether the mouse element is in the hover element | boolean    |
| ref     | When no parameters are passed in, bind the ref to the node to listen on  | -        |

### Options

| Property| Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| dom | Optional, if not passed in, it will listen for refs in the returned result, otherwise it will listen for incoming nodes | HTMLElement \| (() => HTMLElement) \| undefined | -      |
| onEnter | Listen to hover  | ()=>void | -      |
| onLeave | Listening leave hover  | ()=>void | -      |
