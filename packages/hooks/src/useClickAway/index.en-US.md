---
title: useClickAway
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
  order: 13
---

# useClickAway

<Tag lang="en-US" tags="ssr"></Tag>

Listen for click events outside the target element.
## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Custom DOM

<code src="./demo/demo2.tsx" />

### Support multiple DOM

<code src="./demo/demo3.tsx" />

### Listen to other events

<code src="./demo/demo4.tsx" />

## API

```ts
type Target = Element | (() => Element) | React.MutableRefObject<Element>;

useClickAway(
  onClickAway: (event: MouseEvent | TouchEvent) => void,
  target: Target | Target[],
  eventName?: string
);
```

### Params

| Property | Description                                 | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| onClickAway | Trigger Function  | `(event: MouseEvent | TouchEvent) => void` | -      |
| target | DOM elements or Ref, support array | `Target` \| `Target[]` | - |
| eventName | Set the event to be listened | `string` | `click` |