---
title: useKeyPress
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
legacy: /dom/use-key-press
---

# useKeyPress

A hook that elegantly manages KeyboardEvent of keyup adn keydown, Keyboard key combinations are supported to define key and keyCode alias input for keyboard events.

## Examples

<code src="./demo/demo1.tsx" />

<code src="./demo/demo2.tsx" />

<code src="./demo/demo3.tsx" />

<code src="./demo/demo4.tsx" />

<code src="./demo/demo5.tsx" />

## API

```javascript
useKeyPress(
  keyFilter: KeyFilter, 
  eventHandler: EventHandler = noop, 
  options?: Options
)
```

### Params

> Tips: keyType is the key or keyCode of KeyboardEvent.

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| keyFilter | Support for key and keyCode in keyboard events,function that return Boolean, key aliases  | keyType \| Array<keyType\> \| ((event: KeyboardEvent) => boolean) | -      |
| eventHandler | Callback Function  | (event: KeyboardEvent) => void | () => {}      |
| options | advanced options，see Options below | -              | -              |   |

### Options

| Property | Description                                                        | Type                   | Default |
|-----------------|--------------------------------------------------------|---------|--------|
| events | Trigger Events  |  Array<keydown \| keyup\> | ['keydown']     |
| target | DOM element or Ref Object | (() => HTMLElement) \| HTMLElement \| React.MutableRefObject  | - |

## Remarks

1.All key aliases
```javascript
enter
tab
delete ('Backspace', 'Delete')
esc
space
up
down
left
right
```

2.Modifier keys
```javascript
ctrl
alt
shift
meta
```
