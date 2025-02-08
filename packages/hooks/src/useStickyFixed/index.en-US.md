---
nav:
  path: /hooks
---

# useStickyFixed

Observe whether the element of 'position: sticky' is in a fixed suction state

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

### Pass in DOM element

<code src="./demo/demo2.tsx" />

## API

```typescript
const [isFixed] = useStickyFixed(targetRef, { scrollTarget });
```

### Params

| Property | Description                              | Type                                                        | Default |
| -------- | ---------------------------------------- | ----------------------------------------------------------- | ------- |
| target   | `position: sticky` 's Dom element or ref | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -       |
| options  | More config                              | `Options`                                                   | -       |

### Options

| Property      | Description                                         | Type                                                        | Default |
| ------------- | --------------------------------------------------- | ----------------------------------------------------------- | ------- |
| scrollTarget  | The element or ref of the DOM in the scrolling area | `() => Element` \| `Element` \| `MutableRefObject<Element>` | document|


### Result

| Property      | Description                                            | Type      |
| ------------- | ------------------------------------------------------ | --------- |
|  isFixed      | Is the `position: sticky` 's Dom  in the 'fixed' state | `boolean` |



