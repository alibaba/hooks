---
title: useTitle
nav: Hooks
group:
  title: Dom
  order: 6
order: 7
toc: content
demo:
  cols: 2
---

A hook that set title of the page.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useTitle(title: string, options?: Options);
```

### Params

| Property | Description | Type     | Default |
| -------- | ----------- | -------- | ------- |
| title    | Page title  | `string` | -       |

### Options

| Property         | Description                                                                | Type      | Default |
| ---------------- | -------------------------------------------------------------------------- | --------- | ------- |
| restoreOnUnmount | Whether to restore the previous page title when the component is unmounted | `boolean` | `false` |
