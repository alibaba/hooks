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
|service| The request, will return Promise | (params) => `Promise<IResponse>` | None |
|current| Default current page | Number | 1 |
|pageSize| Default the size of one page | Number | 20 |
|autoFirstQuery| Auto query when initialized | Boolean | true |
|refreshDeps| same as useRequest，will refresh when refreshDeps updated | Array | [] |
|plugins| plugin set | Array | [] |

### ReturnValue

| Property       | Description       | Type       |
| ---------- | ---------- | ------------- |
| tableProps | table props | `ITableProps` |
| paginationProps | pagination props | `IPaginationProps` |
| query      | query   | () => `Promise<IResponse>` |
| getParams  | get params  | () => any |


### Interface

#### IResponse

```ts
interface IResponse {
  success : boolean;
  msg: string;
  data: {
    dataSource: any[];
    total: number; // the total count
    current: number, // current page
    pageSize: number // the size of one page
  }
}
```

#### ITableProps

```ts
interface ITableProps {
  dataSource: any[]; 
  loading: boolean;
};
```

#### IPaginationProps

```ts
interface IPaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (current: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}
```