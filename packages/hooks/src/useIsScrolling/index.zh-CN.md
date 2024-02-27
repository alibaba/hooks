---
nav:
  path: /hooks
---

# useIsScrolling

获取浏览器或者目标元素是否正处于滚动状态的 hook

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 监测整页的滚动

<code src="./demo/demo2.tsx" />

### 控制滚动方向的监听

<code src="./demo/demo3.tsx" />

## API

```typescript
const scrollStatusInfo = useIsScroll({target, scrollDirection});
```

### Params

| 参数            | 说明                   | 类型                                                                        | 默认值      |
| --------------- | ---------------------- | --------------------------------------------------------------------------- | ----------- |
| target          | DOM 节点或者 ref       | `Element` \| `Document` \| `(() => Element)` \| `MutableRefObject<Element>` | `document`  |
| scrollDirection | 控制监听滚动状态的方向 | `"vertical" \| "horizontal"  \| undefined`                                  | `undefined` |

### Result

| 参数             | 说明                   | 类型                     |
| ---------------- | ---------------------- | ------------------------ |
| scrollStatusInfo | 滚动容器当前的滚动状态 | `{ scrolling: boolean }` |
