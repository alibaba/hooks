---
nav:
  path: /hooks
---

# useKeyPress

Listen for the keyboard press, support key combinations, and support alias.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

### Combination keys

<code src="./demo/demo6.tsx" />

### Exact match
<code src="./demo/demo7.tsx"/>

### Multiple keys

<code src="./demo/demo3.tsx" />

### Custom method

<code src="./demo/demo4.tsx" />

### Custom DOM

<code src="./demo/demo5.tsx" />

## API

```typescript
type keyType = number | string;
type KeyFilter = keyType | keyType[] | ((event: KeyboardEvent) => boolean);

useKeyPress(
  keyFilter: KeyFilter,
  eventHandler: EventHandler,
  options?: Options
)
```

### Params

| Property     | Description                                                      | Type                                                            | Default |
|--------------|------------------------------------------------------------------|-----------------------------------------------------------------|---------|
| keyFilter    | Support keyCode、alias、combination keys、array、custom function | `keyType` \| `keyType[]` \| `(event: KeyboardEvent) => boolean` | -       |
| eventHandler | Callback function                                                | `(event: KeyboardEvent) => void`                                | -       |
| options      | advanced options                                                 | `Options`                                                       | -       |

### Options

| Property | Description        | Type                                                        | Default       |
|----------|--------------------|-------------------------------------------------------------|---------------|
| events   | Trigger Events     | `('keydown' \| 'keyup')[]`                                  | `['keydown']` |
| target   | DOM element or ref | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -             |
| exactMatch | Enable exact match, the trigger key only triggers an event if it matches the listener key exactly. For example,`[shift + c]` is triggered, and listening to `[c]` does not trigger an event. Not turned on by defaultEnable exact matching, a subset of which will not be listened to when listening for the key combination after opening, not turned on by default | `boolean`                                                       | `false`       |

## Remarks

1. All key alias refer to [代码](TODO)

2. Modifier keys

```text
ctrl
alt
shift
meta
```
