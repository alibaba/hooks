---
nav:
  path: /hooks
---

# useComposingSearch

Debounced search that skips the intermediate keys of an IME composition.

While a Chinese, Japanese or Korean input method is composing, every keystroke
reaches `onChange` as pinyin (for example `zhong`, `zhongg`, `zhongguo`). A
plain debounce searches those fragments; this hook holds them and searches the
text the user actually committed.

## Examples

### Composing search

<code src="./demo/demo1.tsx" />

### Wrapper target

<code src="./demo/demo2.tsx" />

## API

```typescript
type BasicTarget<T> = T | (() => T | null) | React.MutableRefObject<T | null>;

type Options<T extends HTMLElement> = {
  wait?: number;
  target?: BasicTarget<T>;
};

type Result = {
  run: (keyword: string) => void;
  cancel: () => void;
  flush: () => void;
};

const useComposingSearch: <T extends HTMLElement = HTMLElement>(
  fn: (keyword: string) => void,
  options?: Options<T>,
) => Result;
```

### Params

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| fn | Search function, called with the keyword after the debounce | `(keyword: string) => void` | - |
| wait | Debounce wait in milliseconds | `number` | `300` |
| target | Element or ref that receives the composition events. Composition events bubble, so the wrapper of a component works too | `BasicTarget<HTMLElement>` | `document` |

### Result

| Property | Description | Type |
| -------- | ----------- | ---- |
| run | Debounced runner; call it from the input's `onChange` | `(keyword: string) => void` |
| cancel | Cancel a pending search | `() => void` |
| flush | Run a pending search immediately (not while composing) | `() => void` |

### Behavior

- Keys that arrive while composing are held; the search does not run for them.
- When the composition ends, the latest keyword is re-armed. The change event
  that carries the committed text goes through the same debounce and replaces
  it, so exactly one search runs for the committed text — whichever side of
  `compositionend` the browser reports it on.
- A browser that sends no change event after `compositionend` still searches
  the last keyword instead of dropping it.
