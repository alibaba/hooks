---
title: useThrottleEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
legacy: /life-cycle/use-throttle-effect
---

# useThrottleEffect

Throttle your `useEffect`.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
useThrottleEffect(
  effect: () => (void | (() => void | undefined)),
  deps?: any[],
  options?: object
);
```

### Params

| Property | Description                                                                  | Type                    | Default |
|----------|------------------------------------------------------------------------------|-------------------------|---------|
| effect       |  The effect callback.                                              | Function | -       |
| deps | The dependencies list. | any[] \| undefined | undefined |
| options  | Config the throttle behavior. See the Options section below.                                                    | object                  | {}    |

### Options

| Property | Description                  | Type   | Default |
|----------|------------------------------|--------|---------|
| wait | The number of milliseconds to delay. | number | 1000 |
| leading | Specify invoking on the leading edge of the timeout. | boolean | true |
| trailing | Specify invoking on the trailing edge of the timeout. | boolean | true |
