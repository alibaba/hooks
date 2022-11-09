---
nav:
  path: /hooks
---

# useContains

Detect if the target element is clicked within its own scope.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
useContains(
  target: React.RefObject<HTMLElement | Element>,
  callback: (isWithin: boolean, ev: Event) => void,
);
```

### Property

| 参数     | 说明               | 类型                                      | 默认值 |
| -------- | ------------------ | ----------------------------------------- | ------ |
| target   | DOM element or ref | `React.RefObject<HTMLElement \| Element>` | -      |
| callback | Callback function  | `(isWithin: boolean, ev: Event) => void`  | -      |
