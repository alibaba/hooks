---
title: useInViewport
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useInViewport

A hook to subscribe DOM element visibility change

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Pass in DOM element

<code src="./demo/demo2.tsx" />


## API

```ts
const inViewPort = useInViewport(target);
```

### Params

| Property | Description               | Type | Default |
|----------|---------------------------|------|---------|
| target   | DOM element or Ref Object |  `HTMLElement` \| `() => HTMLElement` \| `React.MutableRefObject` | -       |

### Result

| Property   | Description                                   | Type    |
|------------|-----------------------------------------------|---------|
| inViewPort | Whether DOM elements are in the visible range | `boolean` |
