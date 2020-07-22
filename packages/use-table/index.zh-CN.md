---
title: useTable
nav:
  title: Hooks
  path: /hooks
group:
  title: Table
  path: /table
  order: 1
legacy: /table/use-table
---

# useTable

具备插件能力的 Table Hook


## 基础 API

```js
const { tableProps, paginationProps, query, getParams } = useTable(service, {
  current,
  pageSize,
  autoFirstQuery,
  refreshDeps,
  plugins,
});
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------| ------|  
|service| 请求源，返回 Promise | (params) => Promise<IResponse> | 无 |
|current| 默认页码 | Number | 1 |
|pageSize| 默认每页条数 | Number | 20 |
|autoFirstQuery| 初始化是否自动请求 | Boolean | true |
|refreshDeps| 同 useRequest，refreshDeps 变化，会触发重新请求 | Array | [] |
|plugins| 插件集合 | Array | [] |

### 返回值

| 返回值       | 说明       | 类型          |
| ---------- | ---------- | ------------- |
| tableProps | 内置的 table props | Object |
| paginationProps | 内置的 pagination props | Object |
| query      | 查询方法   | () => Promise<IResponse> |
| getParams  | 动态获取请求参数   | () => any |
