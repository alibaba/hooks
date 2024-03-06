---
title: useDebounceEffect
nav: Hooks
group:
  title: Effect
  order: 5
order: 4
toc: content
demo:
  cols: 2
---

Debounce your `useEffect`.

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: Options
);
```

### Params

| Property | Description                                                                   | Type             | Default |
| -------- | ----------------------------------------------------------------------------- | ---------------- | ------- |
| effect   | The effect callback.                                                          | `EffectCallback` | -       |
| deps     | The dependencies list.                                                        | `DependencyList` | -       |
| options  | Config for the debounce behaviors. See the Options section below for details. | `Options`        | -       |

### Options

| Property | Description                                                         | Type      | Default |
| -------- | ------------------------------------------------------------------- | --------- | ------- |
| wait     | The number of milliseconds to wait.                                 | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.                | `boolean` | `false` |
| trailing | Specify invoking on the trailing edge of the timeout.               | `boolean` | `true`  |
| maxWait  | The maximum time func is allowed to be delayed before it’s invoked. | `number`  | -       |
