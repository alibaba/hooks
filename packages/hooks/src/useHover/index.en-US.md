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

<Tag lang="en-US" tags="ssr"></Tag>

Monitor whether the DOM element has a mouse hover.

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
| target   | DOM element or ref | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -       |
| options  | More config   | `Options` | -       |

### Options

| Property | Description                                           | Type      | Default |
|----------|-------------------------------------------------------|-----------|---------|
| onEnter  | Triggered on hover          | `()=>void` | -       |
| onLeave  | Triggered on leave     | `()=>void` | -       |

### Result

| Property   | Description                                                 | Type    |
|------------|-------------------------------------------------------------|---------|
| isHovering | Whether the element is in hover | `boolean` |
