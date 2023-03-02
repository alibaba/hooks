---
nav:
  path: /hooks
---

# useSelections

常见联动 Checkbox 逻辑封装，支持多选，单选，全选逻辑，还提供了是否选择，是否全选，是否半选的状态。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const result: Result = useSelections<T>(items: T[], defaultSelected?: T[]);
```

### Result

| 参数              | 说明                                                                                                                                                     | 类型                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| selected          | 已经选择的元素                                                                                                                                           | `T[]`                                                               |
| allSelected       | 是否全选                                                                                                                                                 | `boolean`                                                           |
| noneSelected      | 是否一个都没有选择                                                                                                                                       | `boolean`                                                           |
| partiallySelected | 是否半选                                                                                                                                                 | `boolean`                                                           |
| isSelected        | 是否被选择                                                                                                                                               | `(value: T) => boolean`                                             |
| setSelected       | 选择多个元素。多次执行时，后面的返回值会覆盖前面的，因此如果希望合并多次操作的结果，需要手动处理：`setSelected((oldArray) => oldArray.concat(newArray))` | `(value: T[]) => void  \| (value: (prevState: T[]) => T[]) => void` |
| select            | 选择单个元素                                                                                                                                             | `(value: T) => void`                                                |
| unSelect          | 取消选择单个元素                                                                                                                                         | `(value: T) => void`                                                |
| toggle            | 反选单个元素                                                                                                                                             | `(value: T) => void`                                                |
| selectAll         | 选择全部元素                                                                                                                                             | `() => void`                                                        |
| unSelectAll       | 取消选择全部元素                                                                                                                                         | `() => void`                                                        |
| toggleAll         | 反选全部元素                                                                                                                                             | `() => void`                                                        |
