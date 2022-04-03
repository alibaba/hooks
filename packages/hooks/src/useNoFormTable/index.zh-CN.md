---
nav:
path: /hooks
---
# useNoFormTable

`useNoFormTable` 基于 `useRequest` 实现，封装了常用的`Ant Design Table` 联动逻辑。派生于`useAntdTable`，但不需要和`Ant Form`配合，可以自行设计提交的表单结构。

在使用之前，你需要了解它与 `useRequest` 不同的几个点：

1. `service` 接收两个参数，第一个参数为分页数据 `{ current, pageSize, sorter, filters }`，第二个参数为表单数据。
2. `service` 返回的数据结构为 `{ total: number, list: Item[] }`。
3. 会额外返回 `tableProps` 和 `search` 字段，管理表格和表单。

## 代码演示
### 基本使用
`options`中的`onReset` 表格重置时触发
<code src="./demo/table.tsx" />

### 带有排序功能的表格
`options`中可以设置`isResetSorter`决定重置的同时，是否恢复为默认排序
<code src="./demo/sorter.tsx" />

### Result

| 参数              | 说明                                                | 类型                  |
|-------------------|-----------------------------------------------------|-----------------------|
| tableProps        | `Table` 组件需要的数据，直接透传给 `Table` 组件即可 | -                     |
| search.submit     | 提交表单                                            | `() => void`          |
| search.reset      | 重置当前表单                                        | `() => void`          |

### Params

| 参数              | 说明                          | 类型                       | 默认值   |
|-----------------|-----------------------------|--------------------------|-------|
| defaultParams   | 默认参数，第一项为分页数据（含排序），第二项为表单数据 | `[pagination, formData]` | -     |
| defaultPageSize | 默认分页数量                      | `number`                 | `10`  |
| onReset         | 表格重置时触发                     | () => void               | 	-    |
|      isResetSorter           | 重置表格时，是否需要恢复默认排序            | boolean                  | false |
