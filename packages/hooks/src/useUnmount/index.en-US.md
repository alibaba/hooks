---
title: useUnmount
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
  order: 9
---

# useUnmount

A hook that executes a function at unmount.

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useUnmount(fn: () => void);
```

### Params

| Property | Description                      | Type         | Default |
|----------|----------------------------------|--------------|---------|
| fn       | the function need to be executed | `() => void` | -       |
