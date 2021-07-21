---
title: useDebounceEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useDebounceEffect

<Tag lang="en-US" tags="ssr&crossPlatform"></Tag>

Debounce your `useEffect`.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: Options
);
```

### Params

| Property | Description                                                  | Type             | Default |
|----------|--------------------------------------------------------------|------------------|---------|
| effect   | The effect callback.                                         | `EffectCallback` | -       |
| deps     | The dependencies list.                                       | `DependencyList` | -       |
| options  | Config the debounce behavior. See the Options section below. | `Options`        | `{}`    |

### Options

| Property | Description                                           | Type      | Default |
|----------|-------------------------------------------------------|-----------|---------|
| wait     | The number of milliseconds to delay.                  | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.  | `boolean` | `false` |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean` | `true`  |
