---
nav:
  path: /hooks
---

# useIdle

Report whether the user has been idle — useful for session timeouts, autosave, screensavers or backing off polling.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

### Custom target and events

<code src="./demo/demo2.tsx" />

## API

```typescript
type BasicTarget<T> = T | (() => T | null) | React.MutableRefObject<T | null>;

type Options = {
  events?: readonly string[];
  target?: BasicTarget<Document | Element | Window>;
  initialState?: boolean;
  onChange?: (idle: boolean) => void;
};

const useIdle: (timeout?: number, options?: Options) => boolean;
```

### Params

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| timeout | Milliseconds without activity before the hook reports idle; values at or below 0 disable detection | `number` | `60000` |
| events | Activity events that reset the timer | `readonly string[]` | `['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart', 'scroll']` |
| target | Element or ref to observe; the whole document by default | `BasicTarget<Document \| Element \| Window>` | `document` |
| initialState | State before the first timeout elapses | `boolean` | `false` |
| onChange | Called when the idle state changes | `(idle: boolean) => void` | - |

### Result

| Property | Description | Type |
| -------- | ----------- | ---- |
| idle | Whether the user is idle | `boolean` |

### Notes

- **Every activity event restarts the timer** and immediately reports the user as active.
- **The document is the default target.** With a custom `target`, only activity inside that element resets the timer; activity elsewhere on the page does not count.
- **Server-safe.** Server rendering touches no DOM and returns `initialState`; a non-positive `timeout` disables detection.
