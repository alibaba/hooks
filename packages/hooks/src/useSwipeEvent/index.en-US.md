---
nav:
  path: /hooks
---

# useSwipeEvent

Used to monitor gesture swipe events.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useSwipeEvent(target, options: Options);
```

### Params

| Property | Description               | Type                                                          | Default |
| -------- | ------------------------- | ------------------------------------------------------------- | ------- |
| target   | DOM element or ref object | `Element` \| `(() => Element)` \| `MutableRefObject<Element>` | -       |

### Options

| Property     | Description                                          | Type                                        | Default |
| ------------ | ---------------------------------------------------- | ------------------------------------------- | ------- |
| threshold    | Minimum distance to trigger gesture swipe monitoring | `number`                                    | `50`    |
| maxTime      | Maximum time for fast swiping, Unit: ms              | `number`                                    | `300`   |
| screenRatioX | Horizontal screen ratio during slow swiping          | `number`                                    | `0.5`   |
| screenRatioY | Vertical screen ratio during slow swiping            | `number`                                    | `0.3`   |
| onSwipeLeft  | Callback function for swiping left                   | `(distance: number, e: TouchEvent) => void` | -       |
| onSwipeRight | Callback function for swiping right                  | `(distance: number, e: TouchEvent) => void` | -       |
| onSwipeUp    | Callback function for swiping up                     | `(distance: number, e: TouchEvent) => void` | -       |
| onSwipeDown  | Callback function for swiping down                   | `(distance: number, e: TouchEvent) => void` | -       |
