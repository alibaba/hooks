---
nav:
  path: /hooks
---

# useDynamicList

A hook that helps you manage dynamic list and generate unique key for each item.

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

### Using with antd Form

<code src="./demo/demo2.tsx" />

### Another way of writing used in antd Form

<code src="./demo/demo3.tsx" />

### Draggable dynamic table

<code src="./demo/demo4.tsx" />

## API

```typescript
const result: Result = useDynamicList(initialValue: T[]);
```

### Result

| Property  | Description                              | Type                                           | Remarks                                                                                    |
| --------- | ---------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| list      | Current list                             | `T[]`                                          | -                                                                                          |
| resetList | Reset list current data                  | `(list: T[]) => void`                          | -                                                                                          |
| insert    | Add item at specific position            | `(index: number, item: T) => void`             | -                                                                                          |
| merge     | Merge items into specific position       | `(index: number, items: T[]) => void`          | -                                                                                          |
| replace   | Replace item at specific position        | `(index: number, item: T) => void`             | -                                                                                          |
| remove    | Delete specific item                     | `(index: number) => void`                      | -                                                                                          |
| move      | Move item from old index to new index    | `(oldIndex: number, newIndex: number) => void` | -                                                                                          |
| getKey    | Get the uuid of specific item            | `(index: number) => number`                    | -                                                                                          |
| getIndex  | Retrieve index from uuid                 | `(key: number) => number`                      | -                                                                                          |
| sortList  | Sort the form data(using with antd form) | `(list: T[]) => T[]`                           | see[`Another way of writing used in antd Form`](#another-way-of-writing-used-in-antd-form) |
| push      | Push new item at the end of list         | `(item: T) => void`                            | -                                                                                          |
| pop       | Remove the last item from the list       | `() => void`                                   | -                                                                                          |
| unshift   | Add new item at the front of the list    | `(item: T) => void`                            | -                                                                                          |
| shift     | Remove the first item from the list      | `() => void`                                   | -                                                                                          |

### Params

| Property     | Description               | Type  | Default |
| ------------ | ------------------------- | ----- | ------- |
| initialValue | Initial value of the list | `T[]` | `[]`    |
