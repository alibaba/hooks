---
nav:
  path: /hooks
---

# useMouse

Track cursor position

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

### Pass in DOM element

<code src="./demo/demo2.tsx" />

## API

```typescript
const state: {
  screenX: number, 
  screenY: number, 
  clientX: number, 
  clientY: number,
  pageX: number,
  pageY: number,
  elementX: number,
  elementY: number,
  elementH: number,
  elementW: number,
  elementPosX: number,
  elementPosY: number,
} = useMouse(target?: Target);
```

### Params

| Property | Description                      | Type         | Default |
|----------|----------------------------------|--------------|---------|
| target   | DOM element or ref | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -       |

### result

| Property | Description                                                                              | Type     |
|----------|------------------------------------------------------------------------------------------|----------|
| screenX  | Position left relative to the top left of the physical screen/monitor                    | `number` |
| screenY  | Position top relative to the top left of the physical screen/monitor                     | `number` |
| clientX  | Position left relative to the upper left edge of the content area                        | `number` |
| clientY  | Position top relative to the upper left edge of the content area                         | `number` |
| pageX    | Position left relative to the top left of the fully rendered content area in the browser | `number` |
| pageY    | Position top relative to the top left of the fully rendered content area in the browser  | `number` |
| elementX | Position left relative to the upper left edge of the DOM element | `number` |
| elementY | Position top relative to the upper left edge of the DOM element | `number` |
| elementH | DOM element height | `number` |
| elementW | DOM element width | `number` |
| elementPosX | The position of the DOM element left relative to the top left of the fully rendered content area in the browser | `number` |
| elementPosY | The position of the DOM element top relative to the top left of the fully rendered content area in the browser | `number` |
