---
title: useFullscreen
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /dom/use-full-screen
---

# useFullscreen

A Hook for handling dom full screen

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

## API

```
const {
   isFullscreen,
   setFull,
   exitFull,
   ref?,
} = useFullScreen({
  dom?,
  onExitFull?,
  onFull?,
});
```

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| isFullscreen  | is full screen                          | boolean    |
| setFull  | set full screen | ()=>void    |
| exitFull  | exit full screen                          | ()=>void    |
| toggleFull  | toggle full screen                          | ()=>void    |
| ref     | when no dom is passed, the ref is bound to the node that needs to be full screen      | -        |

### Options

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| dom | optional, if none is passed, this hook will subscibe to the ref that it returns  | HTMLElement \| (() => HTMLElement) \| undefined | -      |
| onExitFull | listen for exit full screen events  | ()=>void | -      |
| onFull | listen for full screen events  | ()=>void | -      |
