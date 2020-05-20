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

```
const size = useSize(domOrRef);
```

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| size  | size of the DOM                             | { width: number, height: number }    |

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| domOrRef | DOM element or Refs  | HTMLElement \| React.RefObject | -      |
