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

注：泛型 `T` 目前只支持 [JavaScript 原始数据类型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)，不支持对象。

### Params

| 参数            | 说明           | 类型  | 默认值 |
| --------------- | -------------- | ----- | ------ |
| items           | 元素列表       | `T[]` | -      |
| defaultSelected | 默认选择的元素 | `T[]` | -      |

### Result

| 参数              | 说明                                                                                                                                                                                   | 类型                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| selected          | 已经选择的元素                                                                                                                                                                         | `T[]`                                                               |
| allSelected       | 是否全选                                                                                                                                                                               | `boolean`                                                           |
| noneSelected      | 是否一个都没有选择                                                                                                                                                                     | `boolean`                                                           |
| partiallySelected | 是否半选                                                                                                                                                                               | `boolean`                                                           |
| isSelected        | 是否被选择                                                                                                                                                                             | `(value: T) => boolean`                                             |
| setSelected       | 选择多个元素。多次执行时，后面的返回值会覆盖前面的，因此如果希望合并多次操作的结果，需要手动处理：`setSelected((oldArray) => oldArray.concat(newArray))`                               | `(value: T[]) => void  \| (value: (prevState: T[]) => T[]) => void` |
| select            | 选择单个元素                                                                                                                                                                           | `(value: T) => void`                                                |
| unSelect          | 取消选择单个元素                                                                                                                                                                       | `(value: T) => void`                                                |
| toggle            | 反选单个元素                                                                                                                                                                           | `(value: T) => void`                                                |
| selectAll         | 选择全部元素                                                                                                                                                                           | `() => void`                                                        |
| unSelectAll       | 取消选择全部元素                                                                                                                                                                       | `() => void`                                                        |
| toggleAll         | 反选全部元素                                                                                                                                                                           | `() => void`                                                        |
| clearAll          | 清除所有选中元素（一般情况下，`clearAll` 等价于 `unSelectAll`。如果元素列表是动态的，则 `clearAll` 会清除掉“所有选中过的元素”，而 `unSelectAll` 只会清除掉“当前元素列表里选中的元素”） | `() => void`                                                        |
