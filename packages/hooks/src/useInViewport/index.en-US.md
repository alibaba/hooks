---
title: useInViewport
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /dom/use-in-viewport
---

# useInViewport

A hook to subscribe DOM element visibility change

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Lazy load DOM element（used to subscibe to DOM element renders after the hook）

<code src="./demo/demo2.tsx" />


## API

```ts
const inViewPort = useInViewport(target);
```

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM element or Ref Object | (() => HTMLElement) | React.RefObject | - |

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| inViewPort  | Whether DOM elements are in the visible range                             | boolean    |
