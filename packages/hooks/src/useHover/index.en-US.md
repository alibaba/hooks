---
title: useHover
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useHover

React UI sensor hooks that track if some element is being hovered by a mouse.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Pass in DOM element

<code src="./demo/demo2.tsx" />

## API

```javascript
const isHovering = useHover(
  target, 
  {
   onEnter,
   onLeave
  }
);
```

### Params

| Property | Description               | Type     | Default |
|----------|---------------------------|----------|---------|
| target   | DOM element or Ref Object | `() => HTMLElement` \| `HTMLElement` \| `React.RefObject`         | -       |
| options  | More configuration items           | `Options` | -       |

### Options

| Property | Description                                           | Type      | Default |
|----------|-------------------------------------------------------|-----------|---------|
| onEnter  | Listen to hover           | `()=>void` | -       |
| onLeave  | Listening leave hover     | `()=>void` | -       |



### Result

| Property   | Description                                                 | Type    |
|------------|-------------------------------------------------------------|---------|
| isHovering | Determine whether the mouse element is in the hover element | `boolean` |
