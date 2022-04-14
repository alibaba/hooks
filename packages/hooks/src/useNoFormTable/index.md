---
nav:
  path: /hooks
---

# useNoFormTable

`useNoFormTable` 派生于`useAntdTable`。

在使用之前，你需要了解它与 `useAntdTable` 不同的几个点：

1. 不需要和`Ant Form`配合，可以自行设计提交的表单结构。
2. 增加了重置相关的操作细节。

## 代码演示
### Table 管理

`useAntdTable` 会自动管理 `Table` 分页数据，你只需要把返回的 `tableProps` 传递给 `Table` 组件就可以了。

```tsx | pure
<Table columns={columns} rowKey="email" {...tableProps} />
```
<br />

<code src="./demo/table.tsx" />

### 基本使用
`options`中的`onReset` 表格重置时触发
<code src="./demo/basic.tsx" />

### 带有排序功能的表格
`options`中可以设置`isResetSorter`决定重置的同时，是否恢复为默认排序
<code src="./demo/sorter.tsx" />

### Result

| 参数              | 说明                                                | 类型                  |
|-------------------|-----------------------------------------------------|-----------------------|
| tableProps        | `Table` 组件需要的数据，直接透传给 `Table` 组件即可 | -                     |
| search.submit     | 提交表单                                            | `(customForm?: any) => void`          |
| search.reset      | 重置当前表单                                        | `(defaultCustomForm?: any) => void`          |

### Params

| 参数              | 说明                          | 类型                       | 默认值   |
|-----------------|-----------------------------|--------------------------|-------|
| defaultParams   | 默认参数，第一项为分页数据（含排序），第二项为表单数据 | `[pagination, formData]` | -     |
| defaultPageSize | 默认分页数量                      | `number`                 | `10`  |
| onReset         | 表格重置时触发                     | () => void               | 	-    |
|      isResetSorter           | 重置表格时，是否需要恢复默认排序            | boolean                  | false |
