---
nav:
  path: /hooks
---

# useLongPress

Listen for the long press event of the target element.

## Examples

### Basic usage

<code src="./demo/demo1.tsx"/>

### Listen for click and long press events at the same time

<code src="./demo/demo2.tsx"/>

### Move threshold

<code src="./demo/demo3.tsx"/>

## API

```typescript
useLongPress(
  onLongPress: (event: MouseEvent | TouchEvent) => void,
  target: Target,
  options: {
    delay?: number;
    moveThreshold?: { x?: number; y?: number };
    onClick?: (event: MouseEvent | TouchEvent) => void;
    onLongPressEnd?: (event: MouseEvent | TouchEvent) => void;
  }
);
```

### Params

| Property    | Description                  | Type                                                        | Default |
| ----------- | ---------------------------- | ----------------------------------------------------------- | ------- |
| onLongPress | Trigger function             | `(event: MouseEvent \| TouchEvent) => void`                 | -       |
| target      | DOM node or Ref              | `Element` \| `() => Element` \| `MutableRefObject<Element>` | -       |
| options     | Optional configuration items | `Options`                                                   | `{}`    |

### Options

| Property       | Description                                                                         | Type                                        | Default |
| -------------- | ----------------------------------------------------------------------------------- | ------------------------------------------- | ------- |
| delay          | Long press time                                                                     | `number`                                    | `300`   |
| moveThreshold  | Move threshold after press. If exceeded, the long press function won't be triggered | `{ x?: number; y?: number }`                | -       |
| onClick        | Click event                                                                         | `(event: MouseEvent \| TouchEvent) => void` | -       |
| onLongPressEnd | Long press end event                                                                | `(event: MouseEvent \| TouchEvent) => void` | -       |

### Remark

Please refer to: https://stackoverflow.com/a/11237968 to disable the ability to long press to select text on the phone
