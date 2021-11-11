---
nav:
  path: /hooks
---

# useLongPress

Monitor the long press event of the target element.

## Examples

### Basic usage

<code src="./demo/demo1.tsx"/>

### Monitor click and long press events at the same time

<code src="./demo/demo2.tsx"/>

## API

```typescript
useLongPress(
  onLongPress: (event: MouseEvent | TouchEvent) => void,
  target: Target,
  options?: {
    delay?: number,
    onClick?: (event: MouseEvent | TouchEvent) => void,
  }
);
```

### Params

| Property    | Description                  | Type                                                        | Default |
|-------------|------------------------------|-------------------------------------------------------------|---------|
| onLongPress | Trigger function             | `(event: MouseEvent \| TouchEvent) => void`                 | -       |
| target      | DOM node or Ref              | `Element` \| `() => Element` \| `MutableRefObject<Element>` | -       |
| options     | Optional configuration items | `Options`                                                   | -       |

### Options
| Parameters | Description     | Type      | Default Value |
|------------|-----------------|-----------|---------------|
| delay      | Long press time | `number`  | `300`         |
| onClick    | Click event     | `boolean` | `true`        |

### Remark

Please refer to: https://stackoverflow.com/a/11237968 to disable the ability to long press to select text on the phone