---
title: useVirtualList
nav:
  title: Hooks
  path: /hooks
group:
  title: UI
  path: /ui
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
const {
  list,
  scrollTo,
  containerProps,
  wrapperProps
} = useVirtualList<T>(
  originalList: T[], 
  options: Options
);
```

### Params

| Property     | Description                                           | Type      | Default |
|--------------|-------------------------------------------------------|-----------|---------|
| originalList | The original list that contains a lot of data entries | `T[]`     | `[]`    |
| options      | Optional configuration item                           | `Options` | -       |


### Options

| Property   | Description                                                             | Type                                      | Default |
|------------|-------------------------------------------------------------------------|-------------------------------------------|---------|
| itemHeight | Item height, accept a pixel value or a function that returns the height | `number` \| `((index: number) => number)` | -       |
| overscan   | The extra buffer items outside of the view area                         | `number`                                  | `5`     |

### Result

| Property       | Description                                            | Type                         |
|----------------|--------------------------------------------------------|------------------------------|
| list           | The current portion of data need to be rendered to DOM | `{data: T, index: number}[]` |
| containerProps | The props of outter container                          | `Object`                     |
| wrapperProps   | The props of inner wrapper                             | `Object`                     |
| scrollTo       | Scroll to specific index                               | `(index: number) => void`    |
