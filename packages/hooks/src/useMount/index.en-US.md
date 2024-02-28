---
title: useMount
nav: Hooks
group:
  title: LifeCycle
  order: 3
order: 1
toc: content
---

# useMount

A hook that executes a function after the component is mounted.

## Examples

### Default Usage

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useMount(fn: () => void);
```

### Params

| Property | Description                 | Type         | Default |
| -------- | --------------------------- | ------------ | ------- |
| fn       | The function to be executed | `() => void` | -       |
