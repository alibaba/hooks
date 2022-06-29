---
nav:
  path: /hooks
---

# useTitle

A hook that set title of the page.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

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
