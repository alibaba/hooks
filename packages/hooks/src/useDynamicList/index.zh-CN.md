---
nav:
  path: /hooks
---

# useDynamicList

一个帮助你管理动态列表状态，并能生成唯一 key 的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 在 antd Form 中使用

<code src="./demo/demo2.tsx" />

### 在 antd Form 中使用的另一种写法

<code src="./demo/demo3.tsx" />

### 可拖拽的动态表格

<code src="./demo/demo4.tsx" />

## API

```typescript
const result: Result = useDynamicList(initialList?: T[]);
```

### Result

| 参数      | 说明                   | 类型                                           | 备注                                                                             |
| --------- | ---------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------- |
| list      | 当前的列表             | `T[]`                                          | -                                                                                |
| resetList | 重新设置 list 的值     | `(list: T[]) => void`                          | -                                                                                |
| insert    | 在指定位置插入元素     | `(index: number, item: T) => void`             | -                                                                                |
| merge     | 在指定位置插入多个元素 | `(index: number, items: T[]) => void`          | -                                                                                |
| replace   | 替换指定元素           | `(index: number, item: T) => void`             | -                                                                                |
| remove    | 删除指定元素           | `(index: number) => void`                      | -                                                                                |
| move      | 移动元素               | `(oldIndex: number, newIndex: number) => void` | -                                                                                |
| getKey    | 获得某个元素的 uuid    | `(index: number) => number`                    | -                                                                                |
| getIndex  | 获得某个 key 的 index  | `(key: number) => number`                      | -                                                                                |
| push      | 在列表末尾添加元素     | `(item: T) => void`                            | -                                                                                |
| pop       | 移除末尾元素           | `() => void`                                   | -                                                                                |
| unshift   | 在列表起始位置添加元素 | `(item: T) => void`                            | -                                                                                |
| shift     | 移除起始位置元素       | `() => void`                                   | -                                                                                |
| sortList  | 校准排序               | `(list: T[]) => T[]`                           | 使用方法详见 [在 antd Form 中使用的另一种写法](#在-antd-form-中使用的另一种写法) |

### 参数

| 参数        | 说明         | 类型  | 默认值 |
| ----------- | ------------ | ----- | ------ |
| initialList | 列表的初始值 | `T[]` | `[]`   |
