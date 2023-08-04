---
nav:
  path: /hooks
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
const [list, scrollTo] = useVirtualList<T>(
  originalList: T[],
  options: {
    containerTarget: (() => Element) | Element | MutableRefObject<Element>,
    wrapperTarget: (() => Element) | Element | MutableRefObject<Element>,
    itemHeight: number | ((index: number, data: T) => number),
    overscan?: number,
  }
);
```

### Params

| Property     | Description                                                                                                                                                | Type      | Default |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| originalList | The original list that contains a lot of data entries. **Attention: must undergo useMemo processing or never change, otherwise there will be a dead loop** | `T[]`     | `[]`    |
| options      | config                                                                                                                                                     | `Options` | -       |

### Options

| Property        | Description                                                             | Type                                                        | Default |
| --------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| containerTarget | Outter Container，support DOM element or ref                            | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -       |
| wrapperTarget   | Inner Container，DOM element or ref                                     | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -       |
| itemHeight      | Item height, accept a pixel value or a function that returns the height | `number` \| `((index: number, data: T) => number)`          | -       |
| overscan        | The extra buffer items outside of the view area                         | `number`                                                    | `5`     |

### Result

| Property | Description                                            | Type                           |
| -------- | ------------------------------------------------------ | ------------------------------ |
| list     | The current portion of data need to be rendered to DOM | `{ data: T, index: number }[]` |
| scrollTo | Scroll to specific index                               | `(index: number) => void`      |
