---
title: useInViewport
group:
  title: Dom
  path: /dom
  order: 500
---

# useInViewport

A hook to subscribe DOM element visibility change

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Lazy load DOM element（used to subscibe to DOM element renders after the hook）

<code src="./demo/demo2.tsx" />


## API

```
const [ inViewPort, ref? ] = useInViewport(dom);
```

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| inViewPort  | Whether DOM elements are in the visible range                             | boolean    |
| ref     | when no param is passed, this ref will be listened      | -        |

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| dom? | optional, if none is passed, this hook will subscibe to the ref that it returns  | HTMLElement \| (() => HTMLElement) \| undefined | -      |
