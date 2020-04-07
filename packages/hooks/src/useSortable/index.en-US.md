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
const [ list, setList ] = useSortable<T>({
  initialValue: T[],
  onSort: (oldIndex, newIndex, oldList, newList) => void,
});

// in render
{
  list.map((e, index) => (<div {...e.props}>sortable</div>))
}
```

### Result

| Property | Description                               | Type                    |
|----------|-------------------------------------------|-------------------------|
| list  | The whole list | { type: 'dummy' \| 'item', content: T, props: PropsType }[] |
| setList  | update the original list | T[] \| ((oldList: T[]) => T[]) |

### useDrop Params

| Property    | Description                                         | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| initialValue | initialValue of the list | T[] | -      |
| disabledItems | whether an item should be disabled for dragging | (item: T) => boolean | -      |
| onSort | The callback when items are moved | (oldIndex: number, newIndex: number, oldList: T[], newList: T[]) => void | -      |
