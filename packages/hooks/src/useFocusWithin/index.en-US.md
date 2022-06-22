---
nav:
  path: /hooks
---

# useFocusWithin

Monitor whether the current focus is within a certain area, Same as css attribute [:focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within).

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Pass in DOM element

<code src="./demo/demo2.tsx" />

## API

```typescript
const isFocusWithin = useFocusWithin(
  target,
  {
   onFocus,
   onBlur,
   onChange
  }
);
```

### Params

| Property | Description        | Type                                                        | Default |
| -------- | ------------------ | ----------------------------------------------------------- | ------- |
| target   | DOM element or ref | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -       |
| options  | More config        | `Options`                                                   | -       |

### Options

| Property | Description                             | Type                               | Default |
| -------- | --------------------------------------- | ---------------------------------- | ------- |
| onFocus  | Callback to be executed on focus        | `(e: FocusEvent) => void`          | -       |
| onBlur   | Callback to be executed on blur         | `(e: FocusEvent) => void`          | -       |
| onChange | Callback to be executed on focus change | `(isFocusWithin: boolean) => void` | -       |

### Result

| Property      | Description                              | Type      |
| ------------- | ---------------------------------------- | --------- |
| isFocusWithin | Whether the focus is in the current area | `boolean` |
