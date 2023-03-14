---
nav:
  path: /hooks
---

# useFusionTable

封装了常用的 [Fusion Form](https://fusion.design/pc/component/basic/form) 与 [Fusion Table](https://fusion.design/pc/component/basic/table) 联动逻辑。

> 🌈「Table 场景解决方案」上线啦！点击图片查看常用的表格场景，区块代码一键下载到本地，快速复用! [使用文档](https://fusion.design/help.html#/dnzud5)

[![](https://img.alicdn.com/tfs/TB1bEbWbQcx_u4jSZFlXXXnUFXa-2326-498.png)](https://fusion.design/pc/block?category=Table)

`useFusionTable` 基于 `useRequest` 实现，在使用之前，你需要了解它与 `useRequest` 不同的几个点：

1. `service` 接收两个参数，第一个参数为分页数据 `{ current, pageSize, sorter, filters }`，第二个参数为表单数据。
2. `service` 返回的数据结构为 `{ total: number, list: Item[] }`。
3. 会额外返回 `tableProps`、`paginationProps` 和 `search` 字段，管理表格和表单。
4. `refreshDeps` 变化，会重置 `current` 到第一页，并重新发起请求。

## 代码演示

### Table 管理

`useFusionTable` 会自动管理 `Table` 分页数据，你只需要把返回的 `tableProps` 与 `paginationProps` 传递给相应组件即可。

```tsx | pure
<Table columns={columns} rowKey="email" {...tableProps} />
<Pagination {...paginationProps} />
```

<br />

<code src="./demo/table.tsx" />

### Form 与 Table 联动

`useFusionTable` 接收 `field` 实例后，会返回 search 对象，用来处理表单相关事件。

- `search.type` 支持 `simple` 和 `advance` 两个表单切换
- `search.changeType`，切换表单类型
- `search.submit` 提交表单行为
- `search.reset` 重置当前表单

以下示例你可以体验表单与表格联动。

<code src="./demo/form.tsx" />

### 初始化数据

`useFusionTable` 通过 `defaultParams` 设置初始化值，`defaultParams` 是一个数组，第一项为分页相关参数，第二项为表单相关数据。如果有第二个值，我们会帮您初始化表单！

需要注意的是，初始化的表单数据可以填写 `simple` 和 `advance` 全量的表单数据，我们会帮您挑选当前激活的类型中的表单数据。

以下示例在初始化时设置了分页数据和表单数据。

<code src="./demo/init.tsx" />

### 表单验证

表单提交之前，我们会自动校验表单数据，如果验证不通过，则不会发起请求。

<code src="./demo/validate.tsx" />

### 数据缓存

通过设置 `cacheKey`，我们可以实现 `Form` 与 `Table` 数据缓存。

<code src="./demo/cache.tsx" />

## API

`useRequest` 所有参数和返回结果均适用于 `useFusionTable`，此处不再赘述。

```typescript

type Data = { total: number; list: any[] };
type Params = [{ current: number; pageSize: number, filter?: any, sorter?: any }, { [key: string]: any }];

const {
  ...,
  tableProps: {
    dataSource: TData['list'];
    loading: boolean;
    onSort: (dataIndex: string, order: string) => void;
    onFilter: (filterParams: any) => void;
  };
  paginationProps: {
    onChange: (current: number) => void;
    onPageSizeChange: (size: number) => void;
    current: number;
    pageSize: number;
    total: number;
  };
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
} = useFusionTable<TData extends Data, TParams extends Params>(
  service: (...args: TParams) => Promise<TData>,
  {
    ...,
    field?: any;
    defaultType?: 'simple' | 'advance';
    defaultParams?: TParams,
    defaultPageSize?: number;
    refreshDeps?: any[];
  }
);
```

### Result

| 参数              | 说明                                                          | 类型                  |
| ----------------- | ------------------------------------------------------------- | --------------------- |
| tableProps        | `Table` 组件需要的数据，直接透传给 `Table` 组件即可           | -                     |
| paginationProps   | `Pagination` 组件需要的数据，直接透传给 `Pagination` 组件即可 | -                     |
| search.type       | 当前表单类型                                                  | `simple` \| `advance` |
| search.changeType | 切换表单类型                                                  | `() => void`          |
| search.submit     | 提交表单                                                      | `() => void`          |
| search.reset      | 重置当前表单                                                  | `() => void`          |

### Params

| 参数            | 说明                                                          | 类型                     | 默认值   |
| --------------- | ------------------------------------------------------------- | ------------------------ | -------- |
| field           | `Form` 实例                                                   | -                        | -        |
| defaultType     | 默认表单类型                                                  | `simple` \| `advance`    | `simple` |
| defaultParams   | 默认参数，第一项为分页数据，第二项为表单数据                  | `[pagination, formData]` | -        |
| defaultPageSize | 默认分页数量                                                  | `number`                 | `10`     |
| refreshDeps     | `refreshDeps` 变化，会重置 current 到第一页，并重新发起请求。 | `React.DependencyList`   | `[]`     |
