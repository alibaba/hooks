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
const isHovering = useHover({
  target,
  onEnter,
  onLeave,
});
```

### Params

| Property| Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM element or Ref Object | (() => HTMLElement) | React.RefObject | - |
| onEnter | Listen to hover  | ()=>void | -      |
| onLeave | Listening leave hover  | ()=>void | -      |


### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| isHovering   | Determine whether the mouse element is in the hover element | boolean    |
