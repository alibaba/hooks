---
title: useTextSelection
nav: Hooks
group:
  title: Scene
  order: 2
order: 12
toc: content
demo:
  cols: 2
---

Tracking content, size, position of user text selection.

## Examples

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>
<code src="./demo/demo3.tsx"></code>

## API

```typescript
const state = useTextSelection(target?);
```

### Params

| Property | Description        | Type                                                                                 | Default    |
| -------- | ------------------ | ------------------------------------------------------------------------------------ | ---------- |
| target   | DOM element or ref | `Element` \| `Document` \| `(() => Element\Document)` \| `MutableRefObject<Element>` | `document` |

### Result

| Property | Description                                    | Type    |
| -------- | ---------------------------------------------- | ------- |
| state    | Content, size, position of user text selection | `State` |

### State

| Property | Description                         | Type     |
| -------- | ----------------------------------- | -------- |
| text     | Selected text                       | `string` |
| left     | The left coordinate value of text   | `number` |
| right    | The right coordinate value of text  | `number` |
| top      | The top coordinate value of text    | `number` |
| bottom   | The bottom coordinate value of text | `number` |
| height   | The height of text                  | `number` |
| width    | The width of text                   | `number` |
