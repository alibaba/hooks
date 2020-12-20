---
title: useDrag & useDrop
nav:
  title: Hooks
  path: /hooks
group:
  title: UI
  path: /ui
  order: 9
---

# useDrop & useDrag

A pair of hooks to help you manage data transfer between drag and drop

> useDrop can be used alone to accept file, text or uri dropping.
>
> useDrag should be used along with useDrop.
>
> Paste into the drop area will also be treated as content drop.

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const getDragProps = useDrag({ onDragStart, onDragEnd });

<div {...getDragProps(id)}>draggable</div>

const [ props, { isHovering } ] = useDrop({
  onText: (text: string, e: Event) => void,
  onFiles: (files: File[], e: Event) => void,
  onUri: (uri: string, e: Event) => void,
  onDom: (content: any, e: Event) => void
});
```

### useDrag Result

| Property     | Description                                                                                  | Type                      |
|--------------|----------------------------------------------------------------------------------------------|---------------------------|
| getDragProps | A function that accept a content as dragging values and return props passed to a dom element | `(content: any) => props` |

### useDrop Result

| Property   | Description                                             | Type      |
|------------|---------------------------------------------------------|-----------|
| props      | Props passed to the drop area                           | -         |
| isHovering | Whether the dragging element is on top of the drop area | `boolean` |

### useDrag Params

| 参数        | 说明                                    | 类型                            | 默认值 |
|-------------|-----------------------------------------|---------------------------------|--------|
| onDragStart | The callback when a dragging is started | `(data: any, e: Event) => void` | -      |
| onDragEnd   | The callback when a dragging is ended   | `(data: any, e: Event) => void` | -      |

### useDrop Params

| Property | Description                         | Type                                | Default |
|----------|-------------------------------------|-------------------------------------|---------|
| onText   | The callback when text is dropped   | `(text: string, e: Event) => void`  | -       |
| onFiles  | The callback when files are dropped | `(files: File[], e: Event) => void` | -       |
| onUri    | The callback when a uri is dropped  | `(text: string, e: Event) => void`  | -       |
| onDom    | The callback when a dom is dropped  | `(content: any, e: Event) => void`  | -       |
