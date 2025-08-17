---
nav:
  path: /hooks
---

# useFullscreen

manages DOM full screen.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Image full screen

<code src="./demo/demo2.tsx" />

### Page full screen

<code src="./demo/demo3.tsx" />

### Coexist with other full screen operations

<code src="./demo/demo4.tsx" />

## API

```typescript
const [isFullscreen, {
  enterFullscreen,
  exitFullscreen,
  toggleFullscreen,
  isEnabled,
}] = useFullScreen(
  target,
  options?: Options
);
```

### Params

| Property | Description        | Type                                                        | Default |
| -------- | ------------------ | ----------------------------------------------------------- | ------- |
| target   | DOM element or ref | `Element` \| `() => Element` \| `MutableRefObject<Element>` | -       |
| options  | Setting            | `Options`                                                   | -       |

### Options

| Property       | Description                                                                                                                   | Type                                                   | Default |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------- |
| onExit         | Exit full screen trigger                                                                                                      | `() => void`                                           | -       |
| onEnter        | Enter full screen trigger                                                                                                     | `() => void`                                           | -       |
| pageFullscreen | Whether to enable full screen of page. If its type is object, it can set `className` and `z-index` of the full screen element | `boolean` \| `{ className?: string, zIndex?: number }` | `false` |

### Result

| Property         | Description          | Type         |
| ---------------- | -------------------- | ------------ |
| isFullscreen     | Is full screen       | `boolean`    |
| enterFullscreen  | Enter full screen    | `() => void` |
| exitFullscreen   | Exit full screen     | `() => void` |
| toggleFullscreen | Toggle full screen   | `() => void` |
| isEnabled        | Is enable screenfull | `boolean`    |
