---
nav:
  path: /hooks
---

# useOnce

useOnce will only be executed once, and the execution time is earlier than useEffect

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useOnce<S>(fn: () => S);
```

### Params

| Property | Description                                         | Type      | Default |
| -------- | --------------------------------------------------- | --------- | ------- |
| fn       | A callback function that will only be executed once | `() => S` | -       |
