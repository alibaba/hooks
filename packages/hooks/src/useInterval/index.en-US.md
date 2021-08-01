---
title: useInterval
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useInterval

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

A hook that handles the `setInterval` timer function.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Advanced usage

<code src="./demo/demo2.tsx" />

## API

```typescript
useInterval(
  fn: () => void, 
  interval?: number | null, 
  options?: Options
);
```

### Params

| Property | Description                                                                                                                             | Type       |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------|------------|
| fn       | The function to be executed every `delay` milliseconds.                                                                                 | `() => void` |
| delay    | The time in milliseconds, the timer should delay in between executions of the specified function. The timer will be cancelled if delay is set to `null` or `undefined`. |  `number` \| `undefined` \| `null` |
| options  | Config of the interval behavior. See the `Options` section below for more information.                                                  | `Options`    |


### Options

| Property  | Description                                           | Type    | Default |
|-----------|-------------------------------------------------------|---------|---------|
| immediate | Whether the passed-in function should be executed immediately on first execution | `boolean` | `false`   |
