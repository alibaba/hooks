---
title: useScroll
nav: Hooks
group:
  title: Dom
  order: 6
order: 17
toc: content
---

# useScroll

Get the scroll position of an element.

## Examples

### Basic Usage

<code src="./demo/demo1.tsx"></code>

### Detect Whole Page Scroll

<code src="./demo/demo2.tsx"></code>

### Control listen on scroll status

<code src="./demo/demo3.tsx"></code>

## API

```typescript
const position = useScroll(target, shouldUpdate);
```

### Params

| Property     | Description               | Type                                                                        | Default      |
| ------------ | ------------------------- | --------------------------------------------------------------------------- | ------------ |
| target       | DOM element or ref object | `Element` \| `Document` \| `(() => Element)` \| `MutableRefObject<Element>` | `document`   |
| shouldUpdate | Whether update position   | `({ top: number, left: number }) => boolean`                                | `() => true` |

### Result

| Property | Description                                 | Type                                         |
| -------- | ------------------------------------------- | -------------------------------------------- |
| position | The current scroll position of the element. | `{ left: number, top: number } \| undefined` |
