---
title: useDynamicList
nav:
  title: Hooks
  path: /hooks
group:
  title: UI
  path: /ui
  order: 5
---

# useDynamicList

A hook that helps you manage your list data and generate unique key for each item.

## Examples

Using with antd 4.x form, please check [this](https://codesandbox.io/s/beautiful-sound-xpc2v?file=/App.tsx)

### Default usage

<code src="./demo/demo1.tsx" />

### Nesting form

<code src="./demo/demo2.tsx" />

### Dyanmic table(draggable)

<code src="./demo/demo3.tsx" />

## API

```typescript
const result: Result = useDynamicList(initialValue: T[]);
```

### Result

| Property  | Description                              | Type                                           | Remarks                                                  |
|-----------|------------------------------------------|------------------------------------------------|----------------------------------------------------------|
| list      | current list data                        | `T[]`                                          | -                                                        |
| resetList | reset list current data                  | `(list: T[]) => void`                          | -                                                        |
| insert    | add item at specific position            | `(index: number, obj: T) => void`              | -                                                        |
| merge     | merge items into specific position       | `(index: number, obj: T) => void`              | -                                                        |
| replace   | replace item at specific position        | `(index: number, obj: T) => void`              | -                                                        |
| remove    | delete specific item                     | `(index: number) => void`                      | -                                                        |
| move      | move item from old index to new index    | `(oldIndex: number, newIndex: number) => void` | -                                                        |
| getKey    | get the uuid of specific item            | `(index: number) => number`                    | -                                                        |
| getIndex  | retrieve index from uuid                 | `(key: number) => number`                      | -                                                        |
| sortForm  | sort the form data(using with antd form) | `(list: unknown[]) => unknown[]`               | see[`Dyanmic table(draggable)`](#dyanmic-tabledraggable) |
| push      | push new item at the end of list         | `(obj: T) => void`                             | -                                                        |
| pop       | remove the last item from the list       | `() => void`                                   | -                                                        |
| unshift   | add new item at the front of the list    | `(obj: T) => void`                             | -                                                        |
| shift     | remove the first item from the list      | `() => void`                                   | -                                                        |

### Params

| Property     | Description               | Type | Default |
|--------------|---------------------------|------|---------|
| initialValue | initial value of the list | T[]  | -       |
