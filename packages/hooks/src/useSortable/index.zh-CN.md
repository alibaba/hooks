---
title: useSortable
nav:
  title: Hooks
  path: /hooks
group:
  title: UI
  path: /ui
  order: 9
legacy: /ui/use-sortable
---

# useSortable

一个帮助你生成可拖拽排序的列表的 hook.

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```javascript
const { getSortProps, list } = useSortable<T>({
  initialValue: T[],
  onSort: (oldIndex, newIndex, oldList, newList) => void,
});

// in render
{
  list.map((e, index) => (<div {...getSortProps(index)}>sortable</div>))
}
```

### Result

| 参数     | 说明                                 | 类型                 |
|----------|-------------------------------------------|-------------------------|
| getDragProps  | 一个接受 index，返回传递给拖拽项属性的方法 | (index: number) => props |
| list  | 完整的待排序列表 | { type: 'dummy' \| 'item', content: T }[] |

### useDrop Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| initialValue | initialValue of the list | T[] | -      |
| onSort | The callback when items are moved | (oldIndex: number, newIndex: number, oldList: T[], newList: T[]) => void | -      |
