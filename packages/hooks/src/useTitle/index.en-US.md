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

<Tag lang="en-US" tags="ssr"></Tag>

A hook that sets title of the page.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useTitle(title: string, options?: Options);
```

### Params

| Property | Description | Type     | Default |
|----------|-------------|----------|---------|
| title    | Page title  | `string` | -       |

### Options

| Property         | Description                                                                 | Type      | Default |
|------------------|-----------------------------------------------------------------------------|-----------|---------|
| restoreOnUnmount | Whether to restore the previous page title when the component is unmounted | `boolean` | `false` |
