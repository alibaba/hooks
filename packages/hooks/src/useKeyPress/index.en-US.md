---
title: useKeyPress
nav: Hooks
group:
  title: Dom
  order: 6
order: 13
toc: content
demo:
  cols: 2
---

Listen for the keyboard press, support key combinations, and support alias.

## Examples

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo6.tsx"></code>
<code src="./demo/demo7.tsx"></code>
<code src="./demo/demo3.tsx"></code>
<code src="./demo/demo8.tsx"></code>
<code src="./demo/demo4.tsx"></code>
<code src="./demo/demo5.tsx"></code>

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
