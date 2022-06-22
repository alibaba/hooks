---
nav:
  path: /hooks
---

# useHover

A hook that tracks whether the element is being hovered.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Pass in DOM element

<code src="./demo/demo2.tsx" />

## API

```javascript
const isHovering = useHover(
  target,
  {
   onEnter,
   onLeave,
   onChange
  }
);
```

### Params

| Property | Description        | Type                                                        | Default |
| -------- | ------------------ | ----------------------------------------------------------- | ------- |
| target   | DOM element or ref | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -       |
| options  | More config        | `Options`                                                   | -       |

### Options

| Property | Description                             | Type                            | Default |
| -------- | --------------------------------------- | ------------------------------- | ------- |
| onEnter  | Callback to be executed on mouse hover  | `() => void`                    | -       |
| onLeave  | Callback to be executed on mouse leave  | `() => void`                    | -       |
| onChange | Callback to be executed on hover change | `(isHovering: boolean) => void` | -       |

### Result

| Property   | Description                          | Type      |
| ---------- | ------------------------------------ | --------- |
| isHovering | Whether the element is being hovered | `boolean` |
