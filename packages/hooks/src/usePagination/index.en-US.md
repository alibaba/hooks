---
nav:
  path: /hooks
---

# usePagination

`usePagination` is implemented based on `useRequest` and encapsulates common paging logic. The differences from `useRequest` are as follows:

1. The first parameter of `service` is `{ current: number, pageSize: number }`
2. The data structure returned by `service` is `{ total: number, list: Item[] }`
3. It will additionally return the `pagination` field, which contains all the pagination information and functions to operate the pagination.
4. When `refreshDeps` changes, it will reset `current` to the first page and re-initiate the request. Generally, you can put the conditions that `pagination` depends on here

## Examples

### Basic usage

The default usage is the same as `useRequest`, but an additional `pagination` parameter will be returned, which contains all pagination information and functions to operate pagination.

<code src="./demo/demo1.tsx" />

### More parameters

The following code demonstrates that the gender parameter is added. When the gender is modified, the paging is reset to the first page and the data is requested again.

<code src="./demo/demo2.tsx" />

### refreshDeps

`refreshDeps` is a syntactic sugar. When it changes, it will reset the page to the first page and request data again. Generally, you can put the dependent conditions here. The following example implements the previous function more conveniently through `refreshDeps`.

<code src="./demo/demo3.tsx" />

### Cache

Through the `params` caching capability of `useRequest`, we can cache paging data and other conditions.

<code src="./demo/demo4.tsx" />

## API

All parameters and returned results of `useRequest` are applicable to `usePagination`, so we won't repeat them here.

```typescript

type Data<T> = { total: number; list: T[] };
type Params = [{ current: number; pageSize: number, [key: string]: any }, ...any[]];

const {
  ...,
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPage: number;
    onChange: (current: number, pageSize: number) => void;
    changeCurrent: (current: number) => void;
    changePageSize: (pageSize: number) => void;
  }
} = usePagination<TData extends Data, TParams extends Params>(
  service: (...args: TParams) => Promise<TData>,
  {
    ...,
    defaultPageSize?: number;
    refreshDeps?: any[];
  }
);
```

### Result

| Property   | Description                                 | Type |
| ---------- | ------------------------------------------- | ---- |
| pagination | Paging data and methods of paging operation | `-`  |

### Params

| Property        | Description                                                                                                                                      | Type                   | Default |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------- |
| defaultPageSize | Default page size                                                                                                                                | `number`               | 10       |
| defaultCurrent  | Number of pages on initial request                                                                                                               | `number`               | 1       |
| refreshDeps     | Changes in `refreshDeps` will reset current to the first page and re-initiate the request. Generally, you can put the dependent conditions here. | `React.DependencyList` | `[]`    |
