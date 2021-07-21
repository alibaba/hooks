---
title: useKeyPress
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useKeyPress

<Tag lang="en-US" tags="ssr"></Tag>

Listen the keyboard press, support key combinations, and support alias.
## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

### Use key aliases

<code src="./demo/demo2.tsx" />

### Compound mode

<code src="./demo/demo3.tsx" />

### Advanced

<code src="./demo/demo4.tsx" />

### Custom DOM

<code src="./demo/demo5.tsx" />

## API

```typescript
useKeyPress(
  keyFilter: KeyFilter, 
  eventHandler: EventHandler, 
  options?: Options
)
```

### Params

> Tips: keyType is the key or keyCode of KeyboardEvent.

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| keyFilter | Support for key and keyCode in keyboard events,function that return Boolean, key aliases  | `keyType` \| `keyType[]` \| `(event: KeyboardEvent) => boolean` | -      |
| eventHandler | Callback function  | `(event: KeyboardEvent) => void` | -      |
| options | advanced options，see Options below | `Options`              | -              | 

### Options

| Property | Description                                                        | Type                   | Default |
|-----------------|--------------------------------------------------------|---------|--------|
| events | Trigger Events  |  `('keydown' \| 'keyup')[]` | `['keydown']`     |
| target | DOM element or ref | `() => Element` \| `Element` \| `MutableRefObject<Element>`  | - |

## Remarks

1.All key aliases

```text
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

```text
ctrl
alt
shift
meta
```
