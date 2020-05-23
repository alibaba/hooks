---
title: useSize
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /dom/use-size
---

# useSize

A hook to subscribe DOM element size change

## Examples

### Default usage

<code src="./demo/demo1.tsx" />


## API

```ts
const size = useSize(target);
```

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM element or Ref Object  | HTMLElement \| React.RefObject | -      |

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| size  | size of the DOM                             | { width: number, height: number }    |
