---
title: useInViewport
nav: Hooks
group:
  title: Dom
  order: 6
order: 12
toc: content
demo:
  cols: 2
---

# useInViewport

Observe whether the element is in the visible area, and the visible area ratio of the element. More information refer to [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## Examples

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>
<code src="./demo/demo3.tsx"></code>

## API

```typescript
type Target = Element | (() => Element) | React.MutableRefObject<Element>;

const [inViewport, ratio] = useInViewport(
  target: Target | Target[],
  options?: Options
);
```

### Params

| Property | Description                        | Type                     | Default |
| -------- | ---------------------------------- | ------------------------ | ------- |
| target   | DOM elements or Ref, support array | `Target` \| `Target[]`   | -       |
| options  | Setting                            | `Options` \| `undefined` | -       |

### Options

More information refer to [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

| Property   | Description                                                                                                                                                                       | Type                                                                                 | Default |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------- |
| threshold  | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the ratio should be executed                                           | `number` \| `number[]`                                                               | -       |
| rootMargin | Margin around the root                                                                                                                                                            | `string`                                                                             | -       |
| root       | The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null. | `Element` \| `Document` \| `() => (Element/Document)` \| `MutableRefObject<Element>` | -       |
| callback   | Triggered when the callback of `IntersectionObserver` is called                                                                                                                   | `(entry: IntersectionObserverEntry) => void`                                         | -       |

### Result

| Property   | Description                                                                              | Type                     |
| ---------- | ---------------------------------------------------------------------------------------- | ------------------------ |
| inViewport | Is visible                                                                               | `boolean` \| `undefined` |
| ratio      | Current visible ratio, updated every time the node set by `options.threshold` is reached | `number` \| `undefined`  |
