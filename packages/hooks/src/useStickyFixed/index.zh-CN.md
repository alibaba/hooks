---
nav:
  path: /hooks
---

# useStickyFixed

观察粘性定位（`position: sticky`）的元素，是否处于吸顶固定状态

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 传入 DOM 元素

<code src="./demo/demo2.tsx" />

## API

```typescript
const [isFixed] = useStickyFixed(targetRef, { scrollTarget });
```

### Params

| 参数    | 说明                             | 类型                                                       | 默认值 |
| ------- | -------------------------------- | ---------------------------------------------------------- | ------ |
| target  | 粘性定位的 DOM 节点或者 Ref 对象 | `Element` \|`() => Element` \| `MutableRefObject<Element>` | -      |
| options | 额外的配置项                     | `Options`                                                  | -      |

### Options

| 参数         | 说明                             | 类型                                                                     | 默认值   |
| ------------ | -------------------------------- | ------------------------------------------------------------------------ | -------- |
| scrollTarget | 滚动区域的 DOM 节点或者 Ref 对象 | `Element` \| `Document` \|`() => Element` \| `MutableRefObject<Element>` | document |

### Result

| 参数    | 说明                              | 类型      |
| ------- | --------------------------------- | --------- |
| isFixed | 粘性定位元素是否处于 `fixed` 状态 | `boolean` |
