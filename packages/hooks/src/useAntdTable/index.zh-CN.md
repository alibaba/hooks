---
title: useAntdTable
nav:
  title: Hooks
  path: /hooks
group:
  title: Deprecated
  path: /deprecated
legacy: /zh-CN/deprecated/use-antd-table
---


# useAntdTable

<Alert>
<p><b>⚠️警告: useAntdTable 已经被废弃了，将在下一个大版本时移除。</b></p>
<p>一般的 AntD Table（<a href="#基本用法">demo1</a>, <a href="#排序与筛选">demo2</a>, <a href="#带筛选和分页器的-table">demo3</a>），你可以使用 <a href="/zh-CN/async?anchor=分页">useRequest 分页模式</a>代替。</p>
<p>复杂的与 Form 联动的 Table（<a href="#搜索表单与列表联动">demo4</a>, <a href="#数据缓存">demo5</a>），你可以使用 <a href="/zh-CN/antd/use-form-table">useFormTable</a> 代替。</p>
</Alert>

封装了常用的逻辑，让你更轻松的管理 [Antd Table](https://ant.design/components/table/)。

**核心特性**

* 表格分页处理
* 搜索表单与表格联动
* 支持简单、复杂 2 种搜索模式切换，并且在切换模式时，能自动填充上一次的数据
* 支持数据缓存，组件销毁重建时能自动还原上一次的表单数据，分页状态等

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx" />

### 排序与筛选

<code src="./demo/demo2.tsx" />

### 带筛选和分页器的 Table

<code src="./demo/demo3.tsx" />

### 搜索表单与列表联动

<code src="./demo/demo4.tsx" />

### 数据缓存

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
| 参数                           | 说明                            | 类型                                  | 默认值             |
|--------------------------------|---------------------------------|---------------------------------------|--------------------|
| tableProps.loading             | 是否正在加载                    | boolean                               | false              |
| tableProps.dataSource          | table 需要使用的数据            | array                                 | -                  |
| tableProps.onChange            | antd Table 组件的 onChange 函数 | (pagination, filters, sorter) => void | -                  |
| tableProps.pagination.current  | 当前页数                        | number                                | 1                  |
| tableProps.pagination.pageSize | 每页数据量                      | number                                | 10                 |
| tableProps.pagination.total    | 数据总量                        | number                                | 0                  |
| sorter                         | 排序数据                        | antd sorter                           | {}                 |
| filters                        | 筛选数据                        | antd filters                          | {}                 |
| refresh                        | 刷新当前数据                    | () => void                            | -                  |
| search.type                    | 搜索类型                        | 'simple'\|'advance'               |'simple' |
| search.changeType              | 触发搜索类型切换                | () => void                            | -                  |
| search.submit                  | 触发搜索                        | () => void                            | -                  |
| search.reset                   | 重置搜索                        | () => void                            | -                  |

### 参数

| 参数    | 说明                                                                                                                                                                                                                                | 类型               | 默认值 |
|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|--------|
| asyncFn | 请求数据的函数，函数参数为 current, pageSize, sorter, filters，及当前搜索表单数据，返回数据结构期望为 `{current?: number, pageSize?: number, total: number, data: Item[]}`。当然你可以通过 options.formatResult，后置格式化返回结果 | (params)=> Promise | -      |
| deps    | 依赖数组，如果 deps 变化，会触发 asyncFn                                                                                                                                                                                            | any[]              | []     |
| options | 可选配置项，见 Options                                                                                                                                 s                                                                            | -                  | -      |

### Options

| 参数            | 说明                                                                         | 类型   | 默认值 |
|-----------------|------------------------------------------------------------------------------|--------|--------|
| defaultPageSize | 默认的每页数据量                                                             | number | 10     |
| id              | 表格唯一 id，如果有 id，则会自动缓存并恢复数据                               | string | -      |
| form            | antd form 实例，如果有 form 实例，则 asyncFn 会收到 form 数据                | -      | -      |
| formatResult    | 对 asyncFn 返回数据进行格式化，如果 asyncFn 返回数据符合要求，则不需要该参数 | -      | -      |


## 备注

在日常工作中，我们每个网站的 Pagination 配置，接口返回数据结构都是一致的，如果我们在每次使用 `useAntdTable` 时都单独处理 Pagination 和 formatResult 肯定是不优雅的，所以我们建议您在自己的项目中基于 `useAntdTable` 再封装一次，例如下面的示例：

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
