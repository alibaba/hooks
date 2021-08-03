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

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook that executes the function right before the component is unmounted.

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
| fn       | The function to be executed | `() => void` | -       |
