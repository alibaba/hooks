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
const result: Result= useSelections<T>(items: T[], defaultSelected?: T[]);
```

### Result

| Property          | Description                 | Type                    |
| ----------------- | --------------------------- | ----------------------- |
| selected          | Selected Items              | `array`                 |
| allSelected       | Is all items selected       | `boolean`               |
| noneSelected      | Is no item selected         | `boolean`               |
| partiallySelected | Is partially items selected | `boolean`               |
| isSelected        | Whether item is selected    | `(value: T) => boolean` |
| setSelected       | Set selected items          | `(value: T[]) => void`  |
| select            | Select item                 | `(value: T) => void`    |
| unSelect          | UnSelect item               | `(value: T) => void`    |
| toggle            | Toggle item select status   | `(value: T) => void`    |
| selectAll         | Select all items            | `() => void`            |
| unSelectAll       | UnSelect all items          | `() => void`            |
| toggleAll         | Toggle select all items     | `() => void`            |
