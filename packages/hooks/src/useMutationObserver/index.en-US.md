---
nav:
  path: /hooks
---

# useMutationObserver

A hook that provides the ability to watch for changes being made to the DOM tree

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useMutationObserver(
  target: Target,
  callback: MutationCallback,
  options?: MutationObserverInit,
);
```

### Params

| Property | Description           | Type                                                                | Default |
| -------- | --------------------- | ------------------------------------------------------------------- | ------- |
| target   | DOM element or ref    | `() => Element` \| `Element` \| `MutableRefObject<Element>`         |         |
| callback | The callback function | `(mutations: MutationRecord[], observer: MutationObserver) => void` |         |
| options  | Setting               | `MutationObserverInit`                                              |         |

### Options

| Property              | Description                                                                                                                          | Type       | Default |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------- |
| attributeFilter       | An array of attribute names to be monitored. If this property isn't included, changes to all attributes cause mutation notifications | `string[]` |         |
| attributeOldValue     | Set to `true` to record the previous value of any attribute that changes when monitoring the node or nodes for attribute changes     | `boolean`  |         |
| attributes            | Set to `true` to watch for changes to the value of attributes on the node or nodes being monitored                                   | `boolean`  | `false` |
| characterData         | Set to `true` to monitor the specified target node for changes to the character data contained within the node or nodes              | `boolean`  |         |
| characterDataOldValue | Set to `true` to record the previous value of a node's text whenever the text changes on nodes being monitored                       | `boolean`  |         |
| childList             | Set to `true` to monitor the target node for the addition nodes or removal nodes (if subtree is true, its descendants)               | `boolean`  | `false` |
| subtree               | Set to `true` to extend monitoring to the entire subtree of nodes rooted at target                                                   | `boolean`  | `false` |

### notice

Warning, Thrown in any of the following circumstances:

<!-- https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#exceptions -->

- The options are configured such that nothing will actually be monitored. (For example, if childList, attributes, and characterData are all false.)

- The value of attributes is false (indicating that attribute changes are not to be monitored), but attributeOldValue is true and/or attributeFilter is present.

- The characterDataOldValue option is true but characterData is false (indicating that character changes are not to be monitored).
