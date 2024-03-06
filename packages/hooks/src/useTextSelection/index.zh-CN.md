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

实时获取用户当前选取的文本内容及位置。

## 代码演示

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>
<code src="./demo/demo3.tsx"></code>

## API

```typescript
const state = useTextSelection(target?);
```

### Params

| 参数   | 说明               | 类型                                                                                 | 默认值     |
| ------ | ------------------ | ------------------------------------------------------------------------------------ | ---------- |
| target | DOM element or ref | `Element` \| `Document` \| `(() => Element\Document)` \| `MutableRefObject<Element>` | `document` |

### Result

| 参数  | 说明                           | 类型    |
| ----- | ------------------------------ | ------- |
| state | DOM 节点内选取文本的内容和位置 | `State` |

### State

| 参数   | 说明             | 类型     |
| ------ | ---------------- | -------- |
| text   | 用户选取的文本值 | `string` |
| left   | 文本的左坐标     | `number` |
| right  | 文本的右坐标     | `number` |
| top    | 文本的顶坐标     | `number` |
| bottom | 文本的底坐标     | `number` |
| height | 文本的高度       | `number` |
| width  | 文本的宽度       | `number` |
