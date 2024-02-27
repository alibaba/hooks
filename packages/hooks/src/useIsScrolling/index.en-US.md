---
nav:
  path: /hooks
---

# useIsScrolling

Get whether the element is scrolling

## Examples

### Basic Usage

<code src="./demo/demo1.tsx" />

### Detect Whole Page Scroll

<code src="./demo/demo2.tsx" />

### Control listen on scroll status

<code src="./demo/demo3.tsx" />

## API

```typescript
const position = useScroll(target, shouldUpdate);
```

### Params

| 参数            | 说明                                              | 类型                                                                        | 默认值      |
| --------------- | ------------------------------------------------- | --------------------------------------------------------------------------- | ----------- |
| target          | DOM element or ref object                         | `Element` \| `Document` \| `(() => Element)` \| `MutableRefObject<Element>` | `document`  |
| scrollDirection | Control the direction of monitoring scroll status | `"vertical" \| "horizontal"  \| undefined`                                  | `undefined` |

### Result

| 参数             | 说明                                             | 类型                     |
| ---------------- | ------------------------------------------------ | ------------------------ |
| scrollStatusInfo | The current scroll state of the scroll container | `{ scrolling: boolean }` |
