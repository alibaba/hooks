---
nav:
  path: /hooks
---

# useMeasures

A hook that observes element dimensions and position changes.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Pass in the DOM element

<code src="./demo/demo2.tsx" />

## API

```typescript
const measures = useMeasures(target);
```

### Params

| Property | Description               | Type                                                                  | Default |
| -------- | ------------------------- | --------------------------------------------------------------------- | ------- |
| `target` | DOM element or ref object | `Element` \| `() => Element` \| `MutableRefObject<Element>` \| `null` | -       |

### Result

| Property | Description                      | Type     | Default |
| -------- | -------------------------------- | -------- | ------- |
| `x`      | View value `x` of the element    | `number` | 0       |
| `y`      | View value `y` of the element    | `number` | 0       |
| `top`    | Position `top` of the element    | `number` | 0       |
| `right`  | Position `right` of the element  | `number` | 0       |
| `bottom` | Position `bottom` of the element | `number` | 0       |
| `left`   | Position `left` of the element   | `number` | 0       |
| `width`  | The `width` of the element       | `number` | 0       |
| `height` | The `height` of the element      | `number` | 0       |
