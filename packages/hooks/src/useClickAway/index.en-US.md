---
title: useClickAway
nav: Hooks
group:
  title: Dom
  order: 6
order: 2
toc: content
demo:
  cols: 2
---

Listen for click events outside the target element.

## Examples

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>
<code src="./demo/demo3.tsx"></code>
<code src="./demo/demo4.tsx"></code>
<code src="./demo/demo5.tsx"></code>
<code src="./demo/demo6.tsx"></code>

## API

```typescript
type Target = Element | (() => Element) | React.MutableRefObject<Element>;
type DocumentEventKey = keyof DocumentEventMap;

useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: Target | Target[],
  eventName?: DocumentEventKey | DocumentEventKey[]
);
```

### Params

| Property    | Description                                 | Type                                       | Default |
| ----------- | ------------------------------------------- | ------------------------------------------ | ------- |
| onClickAway | Trigger Function                            | `(event: T) => void`                       | -       |
| target      | DOM elements or Ref, support array          | `Target` \| `Target[]`                     | -       |
| eventName   | Set the event to be listened, support array | `DocumentEventKey` \| `DocumentEventKey[]` | `click` |
