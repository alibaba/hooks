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

A hook that execute the function at unmount.

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
