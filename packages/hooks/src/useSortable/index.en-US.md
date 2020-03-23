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

A hook to help you generate a sortable list.

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```javascript
const { getSortProps, list, dragging } = useSortable<T>({
  initialValue: T[],
  onSort: (oldIndex, newIndex, oldList, newList) => void,
});

// in render
{
  list.map((e, index) => (<div {...getSortProps(index)}>sortable</div>))
}
```

### Result

| Property | Description                               | Type                    |
|----------|-------------------------------------------|-------------------------|
| getDragProps  | A function that accept list index and return props passed to a dom element | (index: number) => props |
| list  | The whole list | { type: 'dummy' \| 'item', content: T }[] |

### useDrop Params

| Property    | Description                                         | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| initialValue | initialValue of the list | T[] | -      |
| onSort | The callback when items are moved | (oldIndex: number, newIndex: number, oldList: T[], newList: T[]) => void | -      |
