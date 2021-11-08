---
nav:
  path: /hooks
---

# useMouse

Track cursor position

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const state: {
  screenX: number, 
  screenY: number, 
  clientX: number, 
  clientY: number,
  pageX: number,
  pageY: number,
} = useMouse();
```

### result

| Property | Description                                                                              | Type     |
|----------|------------------------------------------------------------------------------------------|----------|
| screenX  | Position left relative to the top left of the physical screen/monitor                    | `number` |
| screenY  | Position top relative to the top left of the physical screen/monitor                     | `number` |
| clientX  | Position left relative to the upper left edge of the content area                        | `number` |
| clientY  | Position top relative to the upper left edge of the content area                         | `number` |
| pageX    | Position left relative to the top left of the fully rendered content area in the browser | `number` |
| pageY    | Position top relative to the top left of the fully rendered content area in the browser  | `number` |
