---
title: useVisibleRatio
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /dom/use-visible-ratio
---

# useVisibleRatio

A hook to subscribe the visible part ratio of a DOM element

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Pass in DOM element

<code src="./demo/demo2.tsx" />


## API

```ts
const visibleRatio = useVisibleRatio(target);
```

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM element or Ref Object | HTMLElement \| (() => HTMLElement) \| React.MutableRefObject | - |

### Result

| Property | Description                                         | Type  |
|----------|------------------------------------------|------------|
| visibleRatio  | Returns a visible part ratio value of a DOM element | number    |
