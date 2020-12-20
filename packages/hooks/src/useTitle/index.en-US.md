---
title: useTitle
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useTitle

A hook that sets title of the page.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useTitle(value: string, options?: Options);
```

### Params

| Property | Description       | Type     | Default |
|----------|-------------------|----------|---------|
| value    | set a title value | `string` | -       |

### Options

| Property         | Description       | Type      | Default |
|------------------|-------------------|-----------|---------|
| restoreOnUnmount | Restore the title | `boolean` | `false` |
