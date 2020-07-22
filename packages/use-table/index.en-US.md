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

A pluggable Hook for Table

## API

```js
const { tableProps, paginationProps, query, getParams } = useTable(service, {
  current,
  pageSize,
  autoFirstQuery,
  refreshDeps,
  plugins,
});
```

### Params

| Property | Description | Type | Default |
|------|------|------| ------|  
|service| The request, will return Promise | (params) => Promise<IResponse> | None |
|current| Default current page number | Number | 1 |
|pageSize| Default the size of one page | Number | 20 |
|autoFirstQuery| Auto query when initialized | Boolean | true |
|refreshDeps| same as useRequest，will refresh when refreshDeps updated | Array | [] |
|plugins| plugin set | Array | [] |

### ReturnValue

| Property       | Description       | Type       |
| ---------- | ---------- | ------------- |
| tableProps | table props | Object |
| paginationProps | pagination props | Object |
| query      | query   | () => Promise<IResponse> |
| getParams  | get params  | () => any |
