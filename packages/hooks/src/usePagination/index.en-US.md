---
title: usePagination
group:
  title: Deprecated
  path: /deprecated
  order: 300
---

# usePagination

<Alert>
<b>⚠️WARNING: usePagination is deprecated and will be removed in the next major version. Please use <a href="/async?anchor=pagination">useRequest pagination mode</a> instead.</b>
</Alert>

Hook for common asynchronous paging scenario.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Using deps properly

<code src="./demo/demo2.tsx" />

## API

```javascript
const result: ReturnValue<Item> = usePagination<Result, Item>(
  asyncFn: ({current, pageSize}) => Promise<Result>,
  options?: Options,
);

const result: ReturnValue<Item> = usePagination<Result, Item>(
  asyncFn: ({current, pageSize}) => Promise<Result>,
  deps?: any[],
  options?: Options,
);
```

### Result

| Property                  | Description                      | Type                                      |
|---------------------------|----------------------------------|-------------------------------------------|
| data                      | Data list                        | Item[]                                    |
| loading                   | Whether the data is loading      | boolean                                   |
| pagination.current        | Current page number              | number                                    |
| pagination.pageSize       | Current page size                | number                                    |
| pagination.total          | Total amount of data             | number                                    |
| pagination.totalPage      | Total pages                      | number                                    |
| pagination.onChange       | Modify both current and pageSize | (current: number, pageSize: number)=>void |
| pagination.changeCurrent  | Change current                   | (current: number)=>void                   |
| pagination.changePageSize | Change pageSize                  | (pageSize: number)=>void                  |
| refresh                   | Refresh data                     | () => void                                |

### Params

| Property | Description                                                                      | Type                           | Default |
|----------|----------------------------------------------------------------------------------|--------------------------------|---------|
| asyncFn  | Asynchronous request data function, function parameters are current and pageSize | ({current, pageSize})=>Promise | -       |
| deps     | Depends array, if deps change, it will reset current and trigger asyncFn         | any[]                          | []      |
| options  | Optional configuration items, see Options                                        | -                              | -       |


### Options

| Property        | Description                                                                                                           | Type                           | Default |
|-----------------|-----------------------------------------------------------------------------------------------------------------------|--------------------------------|---------|
| defaultPageSize | default page size                                                                                                     | number                         | 10      |
| formatResult    | Format the asyncFn return data. If the asyncFn return data meets the requirements, then this parameter is not needed. | (res: Result)=>({total, data}) | -       |