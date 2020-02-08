---
title: useAntdTable
group:
  title: Deprecated
  path: /deprecated
  order: 300
---

# useAntdTable

<Alert>
<p><b>⚠️WARNING: useAntdTable is deprecated and will be removed in the next major version. </b></p>
<p>Simple AntD Table（<a href="#default-usage">demo1</a>, <a href="#filter-and-sorter">demo2</a>, <a href="#table-with-filter-and-pager">demo3</a>），you can use <a href="/async?anchor=pagination">useRequest pagination mode</a> instead. </p>
<p>Complex AntD Table with Form（<a href="#search-form-and-table-data-binding">demo4</a>, <a href="#data-cache">demo5</a>），you can use <a href="/antd/use-form-table">useFormTable</a> instead.</p>
</Alert>

Encapsulates common logic to make it easier to manage [Antd Table](https://ant.design/components/table/)。

**Core Characteristics**

* Automatically handle table pagination
* Connected search form and table data
* Support simple and complex mode switching, different search types are cached separately
* Support data caching, automatically restore table data and search form when navigate away and then go back.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Filter And Sorter

<code src="./demo/demo2.tsx" />

### Table with filter and pager

<code src="./demo/demo3.tsx" />

### Search form and table data binding

<code src="./demo/demo4.tsx" />

### Data cache

<code src="./demo/demo5.tsx" />

## API

```javascript
const result: ReturnValue<Item> = useAntdTable<Result, Item>(
  asyncFn: (params: any) => Promise<Result>,
  options?: Options<Result, Item>,
);

const result: ReturnValue<Item> = useAntdTable<Result, Item>(
  asyncFn: (params: any) => Promise<Result>,
  deps?: any[],
  options?: Options<Result, Item>,
);
```

### Result

```
interface ReturnValue<Item> {
  tableProps: {
    dataSource: Item[];
    loading: boolean;
    onChange: (
      pagination: PaginationConfig,
      filters?: Record<keyof Item, string[]>,
      sorter?: SorterResult<Item>,
    ) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };
  sorter: SorterResult<Item>;
  filters: Record<keyof Item, string[]>;
  refresh: () => void;
  search?: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
}

```
| Property                       | Description                                   | Type                                  | Default            |
|--------------------------------|-----------------------------------------------|---------------------------------------|--------------------|
| tableProps.loading             | Whether it is loading                         | boolean                               | false              |
| tableProps.dataSource          | Table data to use                             | array                                 | -                  |
| tableProps.onChange            | OnChange function of the antd Table component | (pagination, filters, sorter) => void | -                  |
| tableProps.pagination.current  | Current page number                           | number                                | 1                  |
| tableProps.pagination.pageSize | Amount of data per page                       | number                                | 10                 |
| tableProps.pagination.total    | Total amount of data                          | number                                | 0                  |
| sorter                         | Sort data                                     | antd sorter                           | {}                 |
| filters                        | Filter data                                   | antd filters                          | {}                 |
| refresh                        | Refresh current data                          | () => void                            | -                  |
| search.type                    | Search type                                   | 'simple'\|'advance'                            |'simple' |
| search.changeType              | Trigger search type switch                    | () => void                            | -                  |
| search.submit                  | Trigger search                                | () => void                            | -                  |
| search.reset                   | Reset search                                  | () => void                            | -                  |

### Params

| Property | Description                                                                                                                                                                                                                                                                                                                    | Type               | Default |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|---------|
| asyncFn  | The function requesting data, the function parameters are current, pageSize, sorter, filters, and the current search form data. The return data structure expectation is `{current?: number, pageSize?: number, total: number, data: Item[]}` . Of course, you can return the result by options.formatResult, post formatting. | (params)=> Promise | -       |
| deps     | Depends on the array, if the deps changes, it will trigger asyncFn                                                                                                                                                                                                                                                             | any[]              | []      |
| options  | Optional configuration item, see Options                                                                                                                                                                                                                                                                                       | -                  | -       |

### Options

| Property        | Description                                                                                                           | Type   | Default |
|-----------------|-----------------------------------------------------------------------------------------------------------------------|--------|---------|
| defaultPageSize | Default amount of data per page                                                                                       | number | 10      |
| id              | The table unique id, and if there is an id, it will automatically cache and recover the data.                         | string | -       |
| form            | Antd form instance, if there is a form instance, there will be a search object in the asyncFn params                  | -      | -       |
| formatResult    | Format the asyncFn return data. If the asyncFn return data meets the requirements, then this parameter is not needed. | -      | -       |


## Remarks

In production, the pagination configuration and the API data structure are usually identical in each project. If we config pagination and formatResult each time we use `useAntdTable`, it is definitely not elegant, so we recommend that you should repackaged a new hook based on `useAntdTable` in your project, for example:

```javascript
import { useAntdTable } from '@umijs/hooks'

export default (fn, deps = [], options = {}) => {
  const result = useAntdTable(fn, deps, {
    formatResult: res => ({
      total: res.data.pagination.total,
      data: res.data.list,
    }),
    ...options,
  })
  result.tableProps.pagination.showQuickJumper = true
  result.tableProps.pagination.showSizeChanger = true
  result.tableProps.pagination.hideOnSinglePage = true
  result.tableProps.pagination.showTotal = total => `共 ${total} 条`
  return result
}
```
