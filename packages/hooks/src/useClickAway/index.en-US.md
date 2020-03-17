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

## API

```javascript
const ref = useClickAway(
  onClickAway: (event: KeyboardEvent) => void,
  dom?: RefType,
);
```

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| ref     | when no param is passed, this ref will be listened     | -        |

### Params

| Property | Description                                 | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| onClickAway | Trigger Function  | (event) => void | -      |
| dom | optional, if none is passed, this hook will subscibe to the dom that it returns  | HTMLElement \| (() => HTMLElement) \| undefined | -      |
