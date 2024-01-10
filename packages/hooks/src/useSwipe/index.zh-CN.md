---
nav:
  path: /hooks
---

# useSwipe

基于 [TouchEvents](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) 的滑动检测，为开发者提供了一些处理滑动手势的基本功能。

## 代码演示

### 基本使用

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

| Property | Description                                    | Type              | Default |
| -------- | ---------------------------------------------- | ----------------- | ------- |
| el       | Ref 包裹住的 dom 节点                          | `HTMLElement`     | -       |
| options  | 可选配置项，参考更多可以查看下方的 `Interface` | `UseSwipeOptions` | -       |

### Result

| Property  | Description    | Type                                          | Default |
| --------- | -------------- | --------------------------------------------- | ------- |
| isSwiping | 是否正在滑动   | `boolean`                                     | -       |
| direction | 滑动方向       | `'up' \| 'down' \| 'left' \| 'right' \| null` | -       |
| lengthX   | 滑动的 clientX | `number`                                      | -       |
| lengthY   | 滑动的 clientY | `number`                                      | -       |

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
