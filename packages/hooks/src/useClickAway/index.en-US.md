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
type Options = {
  eventName?: DocumentEventKey | DocumentEventKey[];
  enabled?: boolean;
};

useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: Target | Target[],
  eventNameOrOptions?: DocumentEventKey | DocumentEventKey[] | Options
);
```

### Params

| Property    | Description                                    | Type                                       | Default |
| ----------- | ---------------------------------------------- | ------------------------------------------ | ------- |
| onClickAway       | Trigger Function                               | `(event: T) => void`                       | -       |
| target            | DOM elements or Ref or Function, support array | `Target` \| `Target[]`                     | -       |
| eventNameOrOptions | Event name(s), or an options object            | `DocumentEventKey` \| `DocumentEventKey[]` \| `Options` | `click` |
| enabled           | Only trigger when `true` (`Options` only)      | `boolean`                                  | `true`  |
