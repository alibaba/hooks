---
title: useSelections
group:
  title: UI
  path: /ui
  order: 800
---

# useSelections

常见联动 checkbox 逻辑封装，支持多选，单选，全选逻辑，还提供了是否选择，是否全选，是否半选的状态。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```javascript
const result: Result= useSelections<T>(items: T[]);
```

### Result

| 参数              | 说明               | 类型                  |
|-------------------|--------------------|-----------------------|
| selected          | 已经选择的元素     | array                 |
| isSelected        | 是否被选择         | (value: T) => boolean |
| select            | 选择元素           | (value: T) => void    |
| unSelect          | 取消选择元素       | (value: T) => void    |
| toggle            | 反选元素           | (value: T) => void    |
| selectAll         | 选择全部元素       | () => void            |
| unSelectAll       | 取消选择全部元素   | (value: T) => void    |
| toggleAll         | 反选全部元素       | (value: T) => void    |
| allSelected       | 是否全选           | boolean               |
| noneSelected      | 是否一个都没有选择 | boolean               |
| partiallySelected | 是否半选           | boolean               |
| setSelected       | 设置选择的元素     | (value:T[]) => void   |