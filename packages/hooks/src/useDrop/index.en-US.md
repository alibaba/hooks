---
nav:
  path: /hooks
---

# useDrop & useDrag

A pair of hooks to help you manage data transfer between drag and drop

> useDrop can be used alone to accept file, text or uri dropping.
>
> useDrag should be used along with useDrop.
>
> Paste into the drop area will also be treated as content drop.

## Examples

### Basic Usage

<code src="./demo/demo1.tsx" />

### Customize Image

<code src="./demo/demo2.tsx" />

## API

### useDrag

```typescript
useDrag<T>(
  data: any,
  target: (() => Element) | Element | MutableRefObject<Element>,
  options?: DragOptions
);
```

#### Params

| Property | Description        | Type                                                        | Default |
| -------- | ------------------ | ----------------------------------------------------------- | ------- |
| data     | Drag data          | `any`                                                       | -       |
| target   | DOM element or ref | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -       |
| options  | More config        | `DragOptions`                                               | -       |

#### DragOptions

| Property    | Description                                                   | Type                           | Default |
| ----------- | ------------------------------------------------------------- | ------------------------------ | ------- |
| onDragStart | On drag start callback                                        | `(e: React.DragEvent) => void` | -       |
| onDragEnd   | On drag end callback                                          | `(e: React.DragEvent) => void` | -       |
| dragImage   | Customize image that follow the mouse pointer during dragging | `DragImageOptions`             | -       |

#### DragImageOptions

| 参数    | 说明                                                                                                                                                                                                                                                                                                          | 类型                | 默认值 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------ |
| image   | An image Element element to use for the drag feedback image. The image will typically be an [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) element but it can also be a [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) or any other visible element | `string \| Element` | -      |
| offsetX | the horizontal offset within the image                                                                                                                                                                                                                                                                        | `number`            | 0      |
| offsetY | the vertical offset within the image                                                                                                                                                                                                                                                                          | `number`            | 0      |

### useDrop

```typescript
useDrop<T>(
  target: (() => Element) | Element | MutableRefObject<Element>,
  options?: DropOptions
);
```

#### Params

| Property | Description        | Type                                                        | Default |
| -------- | ------------------ | ----------------------------------------------------------- | ------- |
| target   | DOM element or ref | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -       |
| options  | More config        | `DropOptions`                                               | -       |

#### DropOptions

| Property    | Description                                 | Type                                          | Default |
| ----------- | ------------------------------------------- | --------------------------------------------- | ------- |
| onText      | The callback when text is dropped or pasted | `(text: string, e: React.DragEvent) => void`  | -       |
| onFiles     | The callback when file is dropped or pasted | `(files: File[], e: React.DragEvent) => void` | -       |
| onUri       | The callback when uri is dropped or pasted  | `(text: string, e: React.DragEvent) => void`  | -       |
| onDom       | The callback when DOM is dropped or pasted  | `(content: any, e: React.DragEvent) => void`  | -       |
| onDrop      | The callback when any is dropped            | `(e: React.DragEvent) => void`                | -       |
| onPaste     | The callback when any is pasted             | `(e: React.DragEvent) => void`                | -       |
| onDragEnter | On drag enter callback                      | `(e: React.DragEvent) => void`                | -       |
| onDragOver  | On drag over callback                       | `(e: React.DragEvent) => void`                | -       |
| onDragLeave | On drag leave callback                      | `(e: React.DragEvent) => void`                | -       |
