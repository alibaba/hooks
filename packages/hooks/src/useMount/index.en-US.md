---
title: useMount
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useMount

A hook that executes a function after the component is mounted.

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useMount(fn: () => void);
```

### Params

| Property | Description                      | Type         | Default |
|----------|----------------------------------|--------------|---------|
| fn       | The function to be executed | `() => void` | -       |
