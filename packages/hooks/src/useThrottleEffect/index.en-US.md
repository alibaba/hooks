---
nav:
  path: /hooks
---

# useThrottleEffect

Throttle your `useEffect`.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: Options
);
```

### Params

| Property | Description                                                  | Type             | Default |
| -------- | ------------------------------------------------------------ | ---------------- | ------- |
| effect   | The effect callback.                                         | `EffectCallback` | -       |
| deps     | The dependencies list.                                       | `DependencyList` | -       |
| options  | Config the throttle behavior. See the Options section below. | `Options`        | -       |

### Options

| Property | Description                                           | Type      | Default |
| -------- | ----------------------------------------------------- | --------- | ------- |
| wait     | The number of milliseconds to wait.                   | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.  | `boolean` | `true`  |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean` | `true`  |
