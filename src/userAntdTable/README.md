# React Hooks


## userAntdTable

### 功能
1. 包含分页能力的表格数据展示；
2. 搜索表单与表格联动；
3. 支持简单、复杂 2 种参数独立的搜索模式切换，并且能自动载入上一次表单填充数据；
4. 跳出当前页后返回时自动还原上一次的表单状态，并刷新之前的页码数据；


### 用法

```
useTable({ service: Function, id: String, form: Antd.WrappedFormUtils })
```


#### 例子
```
const {
  table: { data, loading, changeTable, },
  form: { search, }
} = useTable({ form, id: 'tableId', service: getMyApp });

<Form onSubmit={search}>
</Form>

<Table
  loading={loading}
  onChange={changeTable}
  dataSource={data.list}
/>

```

### 参数说明

| 参数名 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| service  | 是 | Promise | 请求表格数据的 service 方法 |
| id  | 是 | String | 缓存 id，用以区分不同的 useTable 缓存数据 |
| form | 是 | Antd.WrappedFormUtils | 搜索表单 |


#### 约定

* 分页参数名：`current`
* `useTable` 调用 `service` 时，会把分页参数（`current`）和搜索表单的查询参数合并


### 返回值

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| table.data | Object | 调用 service 时服务端返回的数据，主要用于渲染表格数据 |
| table.loading | boolean | 是否正在加载中，用于给 table 增加 loading 状态 |
| table.changeTable | Function | 表格翻页处理函数，用于设置 table.onChange，传入 focusUpdate 可以使用当前搜索条件强制刷新数据 |
| form.searchType | string | 搜索类型，可选值 `simple`、`advance`，用于切换搜索表单 |
| form.changeSearchType | Function | 搜索类型切换处理函数 |
| form.search | Function | 表单搜索处理函数，用于设置 form.submit，与 changeTable 的差异是会重置分页状态 |
