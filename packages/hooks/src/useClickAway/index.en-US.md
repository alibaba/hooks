---
title: useClickAway
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
  order: 13
legacy: /dom/use-click-away
---

# useClickAway

A hook that elegantly manages click outside of target elements.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

<code src="./demo/demo3.tsx" />

## API

```ts
useClickAway(
  onClickAway: (event: MouseEvent | TouchEvent) => void,
  target: (() => HTMLElement) | HTMLElement | React.MutableRefObject | 
    ((() => HTMLElement) | HTMLElement | React.MutableRefObject)[],
);
```

### Params

| Property | Description                                 | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| onClickAway | Trigger Function  | (event) => void | -      |
| target | DOM elements or Ref Objects | (() => HTMLElement) \| HTMLElement \| React.MutableRefObject \| ((() => HTMLElement) \| HTMLElement \| React.MutableRefObject)[] | - |
