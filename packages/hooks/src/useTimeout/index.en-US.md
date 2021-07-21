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

A hook that can handle the setTimeout timer function.

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
| fn  | The function to setTimeout | `() => void` |
| delay | The time to wait, in milliseconds. If delay is `null` or `undefined`, the timer will stop. | `number` \| `undefined` \| `null` |
