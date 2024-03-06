---
title: useMutationObserver
nav: Hooks
group:
  title: Dom
  order: 6
order: 11
toc: content
demo:
  cols: 2
---

A hook that provides the ability to watch for changes being made to the DOM tree, refer to [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## Examples

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useMutationObserver(
  callback: MutationCallback,
  target: Target,
  options?: MutationObserverInit,
);
```

## Params

| Property | Description           | Type                                                                | Default |
| -------- | --------------------- | ------------------------------------------------------------------- | ------- |
| target   | DOM element or ref    | `() => Element` \| `Element` \| `MutableRefObject<Element>`         | -       |
| callback | The callback function | `(mutations: MutationRecord[], observer: MutationObserver) => void` | -       |
| options  | Setting               | `MutationObserverInit`                                              | -       |

### Options

For options, please refer to [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#parameters)
