---
title: useScroll
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /dom/use-scroll
---

# useScroll

Get the scroll position of an element.


## Examples

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

## API

```ts
const pisition = useScroll(target);
```

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM element or Ref object | HTMLElement \| (() => HTMLElement) \| Document \| React.MutableRefObject  | Document    |


### Result

| Property | Description                                                       | Type                 |
|------|----------|------|
| position | The current scroll position of the element. | `{x: number, y: number}`  |
