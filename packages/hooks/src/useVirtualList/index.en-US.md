---
title: useVirtualList
group:
  title: UI
  path: /ui
  order: 800
---

# useVirtualList

A hook that allows you to use virtual list to render huge chunks of list data.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Dynamic item height

<code src="./demo/demo2.tsx" />

## API

```typescript
const result:Result = useVirtualList(originalList: any[], Options);
```

### Result

| Property | Description                                         | Type                 |
|----------|------------------------------------------|------------|
| list  | The current portion of data need to be rendered to DOM        | {data: T, index: number}[]    |
| containerProps     | the props of outter container                          | {}        |
| wrapperProps | the props of inner wrapper   | {} |
| scrollTo    | scroll to specific index                         | (index: number) => void        |

### Params

| Property | Description                                                        | Type                   | Default |
|---------|----------------------------------------------|------------------------|--------|
| originalList | The original list that contains a lot of data entries | T[] | []      |
| options | Optional configuration item, see Options                       | -                      | -      |


### Options

| Property | Description       | Type   | Default |
|------|--------------|--------|--------|
| itemHeight | item height, accept a pixel value or a function that returns the height  | number \| ((index: number) => number) | -    |
| overscan | the extra buffer items outside of the view area | number | 10    |