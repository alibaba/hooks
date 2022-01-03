---
nav:
  path: /hooks
---

# useSelections

This hook is used for Checkbox group, supports multiple selection, single selection, select-all, select-none and semi-selected, disable etc.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const result: Result= useSelections<T>(items: T[], defaultSelected?: T[], defaultDisabled?: T[]);
```

### Result

| Property          | Description                 | Type                    |
|-------------------|-----------------------------|-------------------------|
| selected          | Selected Items              | `array`                 |
| disabled          | Disabled Items              | `array`                 | 
| allSelected       | Is all items selected       | `boolean`               |
| noneSelected      | Is no item selected         | `boolean`               |
| partiallySelected | Is partially items selected | `boolean`               |
| isSelected        | Whether item is selected    | `(value: T) => boolean` |
| isDisabled        | Whether item is disabled    | `(value: T) => boolean` |
| setSelected       | Set selected items          | `(value: T[]) => void`   |
| setDisabled       | Set Disabled items          | `(value: T[]) => void`   |
| select            | Select item                 | `(value: T) => void`    |
| unSelect          | UnSelect item               | `(value: T) => void`    |
| disable           | Disable item                | `(value: T) => void`    |
| enable            | Enable item                 | `(value: T) => void`    |
| toggle            | Toggle item select status   | `(value: T) => void`    |
| selectAll         | Select all items            | `() => void`            |
| unSelectAll       | UnSelect all items          | `() => void`            |
| toggleAll         | Toggle select all items     | `() => void`            |
