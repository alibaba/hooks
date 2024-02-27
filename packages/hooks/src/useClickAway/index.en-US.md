---
title: useClickAway
nav: Hooks
group:
  title: Dom
  order: 6
order: 2
---

# useClickAway

Listen for click events outside the target element.

## Examples

### Default usage

<code src="./demo/demo1.tsx"></code>

### Custom DOM

<code src="./demo/demo2.tsx"></code>

### Support multiple DOM

<code src="./demo/demo3.tsx"></code>

### Listen for other events

<code src="./demo/demo4.tsx"></code>

### Support multiple events

<code src="./demo/demo5.tsx"></code>

### Support shadow DOM

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
