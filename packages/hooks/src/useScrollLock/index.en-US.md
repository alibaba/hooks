---
nav:
  path: /hooks
---

# useScrollLock

Lock scrolling on an element — for modals, drawers and full-screen overlays.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

### Shared lock

<code src="./demo/demo2.tsx" />

## API

```typescript
type BasicTarget<T> = T | (() => T | null) | React.MutableRefObject<T | null>;

type Options = {
  target?: BasicTarget<HTMLElement>;
  defaultLocked?: boolean;
  compensateScrollbar?: boolean;
  onLock?: () => void;
  onUnlock?: () => void;
};

type Actions = {
  lock: () => void;
  unlock: () => void;
  toggle: () => void;
};

const useScrollLock: (options?: Options) => readonly [boolean, Actions];
```

### Params

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| target | Element whose scrolling is locked | `BasicTarget<HTMLElement>` | `document.body` |
| defaultLocked | Lock as soon as the hook mounts | `boolean` | `false` |
| compensateScrollbar | Pad the body with the scrollbar width so the page does not shift | `boolean` | `true` |
| onLock | Called when this instance acquires the lock | `() => void` | - |
| onUnlock | Called when this instance releases the lock | `() => void` | - |

### Result

| Property | Description | Type |
| -------- | ----------- | ---- |
| locked | Whether this instance holds the lock | `boolean` |
| actions.lock | Acquire the lock; a no-op while already held | `() => void` |
| actions.unlock | Release the lock | `() => void` |
| actions.toggle | Toggle the lock | `() => void` |

### Notes

- **The lock is shared.** Instances locking the same element share one record: closing one of two open layers keeps the page locked until the last instance releases it, and the original inline styles are restored exactly once.
- **Styles are restored precisely.** The element's previous `overflow` and `padding-right` are recorded and replayed, so a caller's own inline styles are never overwritten.
- **Server-safe.** Server rendering touches no DOM and reports the requested `defaultLocked`; unmounting releases the lock so a page cannot be left unscrollable.
