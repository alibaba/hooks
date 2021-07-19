---
title: useTextSelection
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useTextSelection

<Tag lang="en-US" tags="ssr"></Tag>

Tracking content, size, position of user text selection.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Listen specified area

<code src="./demo/demo3.tsx" />

### Translate user text selection

<code src="./demo/demo2.tsx" />

## API

```typescript
const state = useTextSelection(target?);
```

### Params

| Property | Description               | Type | Default  |
|----------|---------------------------|------|----------|
| target   | DOM element or ref | `Element` \| `Document` \| `(() => Element\Document)` \| `MutableRefObject<Element>` | `document` |

### Result

| Property | Description                                    | Type                     |
|----------|------------------------------------------------|--------------------------|
| state    | Content, size, position of user text selection | Detail as follow State |

### State

| Property | Description                         | Type   |
|----------|-------------------------------------|--------|
| text     | Selected text                       | `string` |
| left     | The left coordinate value of text   | `number` |
| right    | The right coordinate value of text  | `number` |
| top      | The top coordinate value of text    | `number` |
| bottom   | The bottom coordinate value of text | `number` |
| height   | The height of text                  | `number` |
| width    | The width of text                   | `number` |
