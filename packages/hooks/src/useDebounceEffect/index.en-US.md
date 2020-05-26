---
title: useDebounceEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
legacy: /life-cycle/use-debounce-effect
---

# useDebounceEffect

Debounce your `useEffect`.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```javascript
useDebounceEffect(
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
| options  | Config the debounce behavior.                                                    | object                  | {}    |
| options.wait | The number of milliseconds to delay. | number | 1000 |
| options.leading | Specify invoking on the leading edge of the timeout. | boolean | false |
| options.trailing | Specify invoking on the trailing edge of the timeout. | boolean | true |

