---
title: useFullscreen
nav: Hooks
group:
  title: Dom
  order: 6
order: 9
toc: content
demo:
  cols: 2
---

manages DOM full screen.

## Examples

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>
<code src="./demo/demo3.tsx"></code>
<code src="./demo/demo4.tsx"></code>

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
