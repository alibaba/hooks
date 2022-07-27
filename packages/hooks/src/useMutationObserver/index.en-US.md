---
nav:
  path: /hooks
---

# useMutationObserver

A hook that provides the ability to watch for changes being made to the DOM tree, refer to [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useMutationObserver(
  callback: MutationCallback,
  target: Target,
  options?: MutationObserverInit,
);
```

### Options

| Property | Description        | Type                                                                | Default |
| -------- | ------------------ | ------------------------------------------------------------------- | ------- |
| callback | Trigger Function   | `(mutations: MutationRecord[], observer: MutationObserver) => void` | -       |
| target   | DOM element or ref | `Element` \| `() => Element` \| `MutableRefObject<Element>`         | -       |
| options  | Setting            | `Options`                                                           | -       |

For options, please refer to [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#parameters)
