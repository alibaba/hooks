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

### Lazy load DOM element（used to subscibe to DOM element renders after the hook）

<code src="./demo/demo2.tsx" />

### Listen to pre-rendered DOM

<code src="./demo/demo3.tsx" />

## API

```
const [ state, ref? ] = useSize(dom);
```

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| state  | size and position of the DOM                             | { width: number, height: number }    |
| ref     | when no param is passed, this ref will be listened      | -        |

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| dom? | optional, if none is passed, this hook will subscibe to the ref that it returns  | HTMLElement \| (() => HTMLElement) \| undefined | -      |
