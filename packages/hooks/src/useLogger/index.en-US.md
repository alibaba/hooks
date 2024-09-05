---
nav:
  path: /hooks
---

# useLogger

A hook that console logs parameters as component transitions through lifecycles.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useLogger(componentName: string, ...rest);
```

### Params

| Property      | Description        | Type     | Default |
| ------------- | ------------------ | -------- | ------- |
| componentName | component name.    | `string` | -       |
| ...rest       | parameters to log. | `string` | -       |
