---
title: useTimeout
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useTimeout

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook that handles the `setTimeout` timer function.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useTimeout(
  fn: () => void, 
  delay?: number | null
);
```

### Params

| Property | Description | Type |
|----------|--------------------------------------|----------------------|
| fn  | The function to be executed after `delay` milliseconds. | `() => void` |
| delay | The number of milliseconds to wait before executing the function. The timer will be cancelled if delay is `null` or `undefined`. | `number` \| `undefined` \| `null` |
