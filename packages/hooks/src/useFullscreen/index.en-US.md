---
title: useFullscreen
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useFullscreen

A Hook for handling dom full screen.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Picture full screen

<code src="./demo/demo2.tsx" />

## API

```typescript
const [isFullscreen, { setFull, exitFull, toggleFull }] = useFullScreen(target, options?:Options);
```

### Params

| Property   | Description                        | Type        | Default |
|------------|------------------------------------|-------------|---------|
| target     | DOM element or Ref Object          | `HTMLElement` \| `() => HTMLElement` \| `React.MutableRefObject` | -       |
| options | setting(optional)            | `Options`     | -      |

### Options

| Property   | Description                        | Type        | Default |
|------------|------------------------------------|-------------|---------|
| onExitFull | listen for exit full screen events | `()=>void`    | -       |
| onFull     | listen for full screen events      | `()=>void`    | -       |

### Result

| Property     | Description        | Type     |
|--------------|--------------------|----------|
| isFullscreen | is full screen     | `boolean`  |
| setFull      | set full screen    | `()=>void` |
| exitFull     | exit full screen   | `()=>void` |
| toggleFull   | toggle full screen | `()=>void` |
