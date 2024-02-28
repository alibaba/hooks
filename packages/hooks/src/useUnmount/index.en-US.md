---
title: useUnmount
nav: Hooks
group:
  title: LifeCycle
  order: 3
order: 2
toc: content
---

# useUnmount

A hook that executes the function right before the component is unmounted.

## Examples

### Default Usage

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useUnmount(fn: () => void);
```

### Params

| Property | Description                 | Type         | Default |
| -------- | --------------------------- | ------------ | ------- |
| fn       | The function to be executed | `() => void` | -       |
