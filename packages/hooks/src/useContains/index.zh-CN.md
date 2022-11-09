---
nav:
  path: /hooks
---

# useContains

检测目标元素是否在自身范围内点击。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useContains(
  target: React.RefObject<HTMLElement | Element>,
  callback: (isWithin: boolean, ev: Event) => void,
);
```

### Params

| 参数     | 说明             | 类型                                      | 默认值 |
| -------- | ---------------- | ----------------------------------------- | ------ |
| target   | DOM 节点或者 ref | `React.RefObject<HTMLElement \| Element>` | -      |
| callback | 回调函数         | `(isWithin: boolean, ev: Event) => void`  | -      |
