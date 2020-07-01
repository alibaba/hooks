---
title: useInterval
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
legacy: /state/use-interval
---

# useInterval

A hook that can handle the setInterval timer function.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
useInterval(fn: () => void, interval: number, options?: options);
```

### Params

| Property | Description | Type |
|----------|--------------------------------------|----------------------|
| fn  | The function to setInterval | () => void |
| interval | Intervals | () => void |
| options | Config the interval behavior. See the Options section below.  | options |


### Options

| Property | Description | Type | Default |
|---------|---------------------------------------|----------------------|-------｜
| immediate | Whether it is executed immediately for the first time  | boolean | false |
