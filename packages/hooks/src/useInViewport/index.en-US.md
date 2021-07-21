---
title: useInViewport
nav:
  title: Hooks
  path: /hooks
group:
  title: Dom
  path: /dom
---

# useInViewport

<Tag lang="en-US" tags="ssr"></Tag>

Observe whether the element is in the visible area, and the visible area ratio of the element. More information refer to [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Observe the visible area ratio of element

<code src="./demo/demo2.tsx" />


## API

```ts
const [inViewport, ratio] = useInViewport(
  target, 
  options?: Options
);
```

### Params

| Property | Description               | Type | Default |
|----------|---------------------------|------|---------|
| target   | DOM element or ref |  `Element` \| `() => Element` \| `MutableRefObject<Element>` | -       |
| options | Setting(optional)		 | `Options` | -      |

### Options

More information refer to [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

| Property   | Description                        | Type        | Default |
|------------|---------------------------------------|---------| ----- |
| threshold | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the ratio should be executed | `number` \| `number[]` | - |
| rootMargin | Margin around the root | `string` | - |
| root | The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.  | `Element` \| `Document` \| `() => (Element/Document)` \| `MutableRefObject<Element>` | - |

### Result

| Property   | Description                                   | Type    |
|------------|-----------------------------------------------|---------|
| inViewport | Is visible | `boolean` |
| ratio | Current visible ratio, updated every time the node set by `options.threshold` is reached | `number` \| `undefined` |