---
nav:
  path: /hooks
---

# useSize

A hook that observes size change of an element.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Pass in the DOM element

<code src="./demo/demo2.tsx" />

### debounce

<code src="./demo/demo3.tsx" />

### throttle

<code src="./demo/demo4.tsx" />

## API

```typescript
const size = useSize(target, options?: {
  debounceOptions?: DebounceOptions,
  throttleOptions?: ThrottleOptions,
});
```

### Params

| Property                | Description                                                                                                         | Type                                                          | Default |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| target                  | DOM element or ref object                                                                                           | `Element` \| `(() => Element)` \| `MutableRefObject<Element>` | -       |
| options.debounceOptions | debounce options(same as useDebounce)                                                                               | `DebounceOptions`                                             | -       |
| options.throttleOptions | throttle options(same as useThrottle), when debounceOptions exists at the same time, debounceOptions is used first. | `ThrottleOptions`                                             | -       |

### Result

| Property | Description         | Type                                             | Default                                                                   |
| -------- | ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------- |
| size     | Size of the element | `{ width: number, height: number } \| undefined` | `{ width: target.clientWidth, height: target.clientHeight } \| undefined` |
