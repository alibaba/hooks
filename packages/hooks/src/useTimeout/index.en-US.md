---
title: useTimeout
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
legacy: /state/use-timeout
---

# useTimeout

A hook that can handle the setTimeout timer function.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />


## API

```javascript
useTimeout(fn: () => void, delay: number | undefined | null);
```

### Params

| Property | Description | Type |
|----------|--------------------------------------|----------------------|
| fn  | Is the function you want to execute after the expiration time (delay milliseconds) | () => void |
| delay | Expire date. If delay is `null` or `undefined`, the timer will stop. | number \| undefined \| null |


