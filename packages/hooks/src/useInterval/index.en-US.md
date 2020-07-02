---
title: useInterval
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
legacy: /state/use-interval
---

# useInterval

A hook that can handle the setInterval timer function.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
useInterval(fn: () => void, interval: number, options?: Options);
```

### Params

| Property | Description | Type |
|----------|--------------------------------------|----------------------|
| fn  | The function to setInterval | () => void |
| delay | The timer should delay in between executions of the specified function or code | number |
| options | Config the interval behavior. See the Options section below  | Options |


### Options

| Property | Description | Type | Default |
|---------|---------------------------------------|----------------------|-------|
| immediate | Whether it is executed immediately for the first time  | boolean | false |
