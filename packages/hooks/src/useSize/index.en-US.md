---
title: useSize
nav: Hooks
group:
  title: Dom
  order: 6
order: 18
toc: content
demo:
  cols: 2
---

A hook that observes size change of an element.

## Examples

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>

## API

```typescript
const size = useSize(target);
```

### Params

| Property | Description               | Type                                                          | Default |
| -------- | ------------------------- | ------------------------------------------------------------- | ------- |
| target   | DOM element or ref object | `Element` \| `(() => Element)` \| `MutableRefObject<Element>` | -       |

### Result

| Property | Description         | Type                                             | Default                                                                   |
| -------- | ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------- |
| size     | Size of the element | `{ width: number, height: number } \| undefined` | `{ width: target.clientWidth, height: target.clientHeight } \| undefined` |
