---
nav:
  path: /hooks
---

# useDrop & useDrag

处理元素拖拽的 Hook。

> useDrop 可以单独使用来接收文件、文字和网址的拖拽。
>
> useDrag 允许一个 dom 节点被拖拽，需要配合 useDrop 使用。
>
> 向节点内触发粘贴动作也会被视为拖拽。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

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

| 参数    | 说明                  | 类型                                                        | 默认值 |
|---------|-----------------------|-------------------------------------------------------------|--------|
| data    | 拖拽的内容            | `any`                                                       | -      |
| target  | DOM 节点或者 Ref 对象 | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -      |
| options | 额外的配置项          | `DragOptions`                                               | -      |

#### DragOptions
| 参数        | 说明           | 类型                           | 默认值 |
|-------------|----------------|--------------------------------|--------|
| onDragStart | 开始拖拽的回调 | `(e: React.DragEvent) => void` | -      |
| onDragEnd   | 结束拖拽的回调 | `(e: React.DragEvent) => void` | -      |

### useDrop


```typescript
useDrop<T>(
  target: (() => Element) | Element | MutableRefObject<Element>,
  options?: DropOptions
);
```

#### Params

| 参数    | 说明                  | 类型                                                        | 默认值 |
|---------|-----------------------|-------------------------------------------------------------|--------|
| target  | DOM 节点或者 Ref 对象 | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -      |
| options | 额外的配置项          | `DragOptions`                                               | -      |

#### DropOptions

| 参数        | 说明                           | 类型                                          | 默认值 |
|-------------|--------------------------------|-----------------------------------------------|--------|
| onText      | 拖拽/粘贴文字的回调            | `(text: string, e: React.DragEvent) => void`  | -      |
| onFiles     | 拖拽/粘贴文件的回调            | `(files: File[], e: React.DragEvent) => void` | -      |
| onUri       | 拖拽/粘贴链接的回调            | `(text: string, e: React.DragEvent) => void`  | -      |
| onDom       | 拖拽/粘贴自定义 dom 节点的回调 | `(content: any, e: React.DragEvent) => void`  | -      |
| onDrop      | 拖拽任意内容的回调             | `(e: React.DragEvent) => void`                | -      |
| onPaste     | 粘贴内容的回调                 | `(e: React.DragEvent) => void`                | -      |
| onDragEnter | 拖拽进入                       | `(e: React.DragEvent) => void`                | -      |
| onDragOver  | 拖拽中                         | `(e: React.DragEvent) => void`                | -      |
| onDragLeave | 拖拽出去                       | `(e: React.DragEvent) => void`                | -      |

