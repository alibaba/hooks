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

### Get the trigger key

<code src="./demo/demo8.tsx" />

### Custom method

<code src="./demo/demo4.tsx" />

### Custom DOM

<code src="./demo/demo5.tsx" />

## API

```typescript
type KeyType = number | string;
type KeyFilter = KeyType | KeyType[] | ((event: KeyboardEvent) => boolean);

useKeyPress(
  keyFilter: KeyFilter,
  eventHandler: (event: KeyboardEvent, key: KeyType) => void,
  options?: Options
);
```

### Params

| Property     | Description                                                      | Type                                                            | Default |
| ------------ | ---------------------------------------------------------------- | --------------------------------------------------------------- | ------- |
| keyFilter    | Support keyCode、alias、combination keys、array、custom function | `KeyType` \| `KeyType[]` \| `(event: KeyboardEvent) => boolean` | -       |
| eventHandler | Callback function                                                | `(event: KeyboardEvent, key: KeyType) => void`                  | -       |
| options      | Advanced options                                                 | `Options`                                                       | -       |

### Options

| Property   | Description                                                                                                                                    | Type                                                        | Default       |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------- |
| events     | Trigger Events                                                                                                                                 | `('keydown' \| 'keyup')[]`                                  | `['keydown']` |
| target     | DOM element or ref                                                                                                                             | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -             |
| exactMatch | Exact match. If set `true`, the event will only be trigger when the keys match exactly. For example, pressing [shift + c] will not trigger [c] | `boolean`                                                   | `false`       |
| useCapture | to block events bubbling                                                                                                                       | `boolean`                                                   | `false`       |

## Remarks

1. All key alias refer to [code](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useKeyPress/index.ts#L21)

2. Modifier keys

```text
ctrl
alt
shift
meta
```
