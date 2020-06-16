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
```
interface Position {
  left: number;
  top: number;
}

type Target = HTMLElement | Document;

function useScroll<T extends Target>(): [Position, MutableRefObject<T>]
function useScroll<T extends Target>(arg: Target | (() => Target)): [Position]
```

### Result

| Property | Description                                                       | Type                 |
|------|----------|------|
| position | The current scroll position of the element. | `{x: number, y: number}`  |
| ref | When no param is passed, this ref will be listened | `RefObject<HTMLElement>` |

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| dom? | optional, if none is passed, this hook will subscibe to the ref that it returns  | HTMLElement \| Document \| (() => HTMLElement) \| (() => Document) \| undefined | -      |
