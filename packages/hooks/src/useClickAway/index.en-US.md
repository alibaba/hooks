---
nav:
  path: /hooks
---

# useClickAway

Listen for click events outside the target element.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Custom DOM

<code src="./demo/demo2.tsx" />

### Support multiple DOM

<code src="./demo/demo3.tsx" />

### Listen for other events

<code src="./demo/demo4.tsx" />

### Support multiple events

<code src="./demo/demo5.tsx"/>

### Support shadow DOM

<code src="./demo/demo6.tsx"/>

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

| Property    | Description                                    | Type                                       | Default |
| ----------- | ---------------------------------------------- | ------------------------------------------ | ------- |
| onClickAway | Trigger Function                               | `(event: T) => void`                       | -       |
| target      | DOM elements or Ref or Function, support array | `Target` \| `Target[]`                     | -       |
| eventName   | Set the event to be listened, support array    | `DocumentEventKey` \| `DocumentEventKey[]` | `click` |
