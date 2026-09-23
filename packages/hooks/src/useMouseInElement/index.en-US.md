---
nav:
  path: /hooks
---

# useMouseInElement

A Hook that listens to whether the current mouse is on the specified DOM。

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const { isInside } = useMouseInElement(target: Target);
```

### Params

| Property    | Description                                                                            | Type                                                        | Default       |
| ----------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------- |
| target      | DOM element or ref                                                                     | `Element` \| `() => Element` \| `MutableRefObject<Element>` | Document.body |
| inCallback  | When the state changes, trigger a callback function within DOM                         | (result: Result) => void                                    | undefined     |
| outCallback | When the state changes, it is not within the DOM and triggers a callback function once | (result: Result) => void                                    | undefined     |

### Result

| Property    | Description                                                                                                        | Type      |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | --------- |
| clientX     | Position left relative to the upper left edge of the content area                                                  | `number`  |
| clientY     | Position top relative to the upper left edge of the content area                                                   | `number`  |
| elementH    | Target element height                                                                                              | `number`  |
| elementW    | Target element width                                                                                               | `number`  |
| elementPosX | The position of the target element left relative to the top left of the fully rendered content area in the browser | `number`  |
| elementPosY | The position of the target element top relative to the top left of the fully rendered content area in the browser  | `number`  |
| isInside    | Is the mouse on the current element                                                                                | `boolean` |
