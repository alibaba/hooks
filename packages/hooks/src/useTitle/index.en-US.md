---
title: useTitle
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
  order: 11
legacy: /state/use-boolean
---

# useTitle

A hook that sets title of the page.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
useTitle(value: string, options?: object);
```

### Params

| Property | Description                                 | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| value | set a title value  | string |       |

### Options

| Property | Description                  | Type   | Default |
|----------|------------------------------|--------|---------|
| restoreOnUnmount | Restore the title | boolean | false |
