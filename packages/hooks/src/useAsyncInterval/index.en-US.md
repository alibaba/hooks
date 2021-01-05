---
title: useAsyncInterval
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useInterval

A hook that can handle the sync function polling's hook.

## Examples

### Default usage

<!-- <code src="./demo/demo1.tsx" /> -->

### Advance usage

<code src="./demo/demo2.tsx" />

## API

```typescript
useAsyncInterval(fn: () => Promise<void>, interval: number, options?: Options);
```

### Params

| Property | Description                                                                                                                             | Type       |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------|------------|
| fn       | The function to setAsyncInterval                                                                                                             | `() => Promise<void>` |
| delay    | The timer should delay in between executions of the specified function or code. If delay is `null` or `undefined`, the timer will stop. |    `number` \| `undefined` \| `null`        |
| options  | Config the interval behavior. See the Options section below                                                                             | `Options`    |


### Options

| Property  | Description                                           | Type    | Default |
|-----------|-------------------------------------------------------|---------|---------|
| immediate | Whether it is executed immediately for the first time | `boolean` | `false`   |
