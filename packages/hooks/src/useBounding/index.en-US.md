---
nav:
  path: /hooks
---

# useBounding

A hook that get the size of an element and its position relative to the viewport, refer to [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

## Examples

### Basic Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const rect: {
  width: number,
  height: number,
  left: number,
  right: number,
  top: number,
  bottom: number,
  x: number,
  y: number,
} = useBounding(
  target: Target,
  options?: UseBoundingOptions,
);
```

### Params

| Property | Description        | Type                                                        | Default                                                      |
| -------- | ------------------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| target   | DOM element or ref | `Element` \| `() => Element` \| `MutableRefObject<Element>` | -                                                            |
| options  | Setting            | `UseBoundingOptions`                                        | `{ reset = true, windowResize = true, windowScroll = true }` |

### Options

| Property     | Description                              | Type      | Default |
| ------------ | ---------------------------------------- | --------- | ------- |
| reset        | Reset values to 0 on component unmounted | `boolean` | `true`  |
| windowResize | Listen to window resize event            | `boolean` | `true`  |
| windowScroll | Listen to window scroll event            | `boolean` | `true`  |

### Result

| Property | Description                                                             | Type     | Default |
| -------- | ----------------------------------------------------------------------- | -------- | ------- |
| width    | Width of the element                                                    | `number` | `0`     |
| height   | Height of the element                                                   | `number` | `0`     |
| left     | Distance from the left edge of the element to the left of the viewport  | `number` | `0`     |
| right    | Distance from the right edge of the element to the left of the viewport | `number` | `0`     |
| top      | Distance from the top edge of the element to the top of the viewport    | `number` | `0`     |
| bottom   | Distance from the bottom edge of the element to the top of the viewport | `number` | `0`     |
| x        | Distance from the left edge of the element to the left of the viewport  | `number` | `0`     |
| y        | Distance from the top edge of the element to the top of the viewport    | `number` | `0`     |
