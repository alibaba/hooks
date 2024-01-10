---
nav:
  path: /hooks
---

# useSwipe

A swipe detection based on [TouchEvents](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent), provide some basic abilities for developer to handle swipe gesture.

## Examples

### Basic Usage

<code src="./demo/demo1.tsx" />

### API

```typescript jsx
function App() {
  const el = useRef<HTMLDivElement>(null)
  const { isSwiping, direction, lengthX, lengthY } = useSwipe(el, {
    passive: false,
    threshold: 100,
    onSwipeStart(e) {},
    onSwipeMove(e, direction) {},
    onSwipeEnd(e, diretion) {},
  })

  return <>
    <div ref={el}>
      Swiping here
    </div>
    <div>
      <p>isSwiping: {String(isSwiping)}</p>
      <p>direction: {direction}</p>
      <p>
        lengthX: {lengthX} | lengthY: {lengthY}
      </p>
    </div>
  </>
}
```

### Params

| Property | Description                                       | Type          | Default |
| -------- | ------------------------------------------------- | ------------- | ------- |
| el       | DOM elements or Ref                               | `HTMLElement` | -       |
| options  | Options, for more detail please refer `Interface` | `Options`     | -       |

### Result

| Property  | Description       | Type      | Default |
| --------- | ----------------- | --------- | ------- |
| isSwiping | Is swiping        | `boolean` | -       |
| direction | Swiping direction | `string`  | -       |
| lengthX   | Swiping clientX   | `number`  | -       |
| lengthY   | Swiping clientY   | `number`  | -       |

### Interface

```typescript
export type UseSwipeDirection = 'up' | 'down' | 'left' | 'right' | null;

export interface UseSwipeOptions {
  /**
   * Register events as passive
   *
   * @default true
   */
  passive?: boolean;

  /**
   * @default 50
   */
  threshold?: number;

  /**
   * Callback when start swipe
   */
  onSwipeStart?: (e: TouchEvent) => void;

  /**
   * Callback on swiping
   */
  onSwipe?: (e: TouchEvent, direction: UseSwipeDirection) => void;

  /**
   * Callback on swiping end
   */
  onSwipeEnd?: (e: TouchEvent, direction: UseSwipeDirection) => void;
}

export interface UseSwipeReturn {
  /**
   * Is swiping
   */
  isSwiping: boolean;

  /**
   * Touches clientX
   */
  lengthX: number;

  /**
   * Touches clientY
   */
  lengthY: number;

  /**
   * Swiping direction
   */
  direction: UseSwipeDirection;
}
```
