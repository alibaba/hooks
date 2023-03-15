---
nav:
  path: /hooks
---

# useSelections

This hook is used for Checkbox group, supports multiple selection, single selection, select-all, select-none and semi-selected etc.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const result: Result = useSelections<T>(items: T[], defaultSelected?: T[]);
```

### Result

| Property          | Description                                                                                                                                                                                                                                               | Type                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| selected          | Selected Items                                                                                                                                                                                                                                            | `T[]`                                                               |
| allSelected       | Is all items selected                                                                                                                                                                                                                                     | `boolean`                                                           |
| noneSelected      | Is no item selected                                                                                                                                                                                                                                       | `boolean`                                                           |
| partiallySelected | Is partially items selected                                                                                                                                                                                                                               | `boolean`                                                           |
| isSelected        | Whether item is selected                                                                                                                                                                                                                                  | `(value: T) => boolean`                                             |
| setSelected       | Select multiple items. When executed multiple times, the later return value overwrites the previous one, so if you want to merge the results of multiple operations, you need to do this manually: `setSelected((oldArray) => oldArray.concat(newArray))` | `(value: T[]) => void  \| (value: (prevState: T[]) => T[]) => void` |
| select            | Select single item                                                                                                                                                                                                                                        | `(value: T) => void`                                                |
| unSelect          | UnSelect single item                                                                                                                                                                                                                                      | `(value: T) => void`                                                |
| toggle            | Toggle single item select status                                                                                                                                                                                                                          | `(value: T) => void`                                                |
| selectAll         | Select all items                                                                                                                                                                                                                                          | `() => void`                                                        |
| unSelectAll       | UnSelect all items                                                                                                                                                                                                                                        | `() => void`                                                        |
| toggleAll         | Toggle select all items                                                                                                                                                                                                                                   | `() => void`                                                        |
