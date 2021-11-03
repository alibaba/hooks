---
title: useSize
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useSize

A hook that observes size change of an element.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Pass in the DOM element

<code src="./demo/demo2.tsx" />

## API

```typescript
const size = useSize(target);
```

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM element or ref object  | `Element` \| `(() => Element)` \| `MutableRefObject<Element>` | -      |

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| size  | Size of the element                             | `{ width: number, height: number } \| undefined`    |
