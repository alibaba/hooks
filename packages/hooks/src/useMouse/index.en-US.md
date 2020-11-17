---
title: useMouse
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useMouse

A Hook to track cursor position

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

| Property | Description                                                                              | Type   |
|----------|------------------------------------------------------------------------------------------|--------|
| screenX  | position left relative to the top left of the physical screen/monitor                    | `number` |
| screenY  | position top relative to the top left of the physical screen/monitor                     | `number` |
| clientX  | position left relative to the upper left edge of the content area                        | `number` |
| clientY  | position top relative to the upper left edge of the content area                         | `number` |
| pageX    | position left relative to the top left of the fully rendered content area in the browser | `number` |
| pageY    | position top relative to the top left of the fully rendered content area in the browser  | `number` |
