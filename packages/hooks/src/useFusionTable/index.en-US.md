---
nav:
  path: /hooks
---

# useFusionTable

useFusionTable encapsulates the commonly used [Fusion Form](https://fusion.design/pc/component/basic/form) and [Fusion Table](https://fusion.design/pc/component/basic/table) data binding logic.

`useFusionTable` is implemented based on `useRequest`. Before using it, you need to understand a few points that are different from `useRequest`:

1. `service` receives two parameters, the first parameter is the paging data `{ current, pageSize, sorter, filters }`, and the second parameter is the form data.
2. The data structure returned by `service` must be `{ total: number, list: Item[] }`.
3. Additional `tableProps`、`paginationProps` and `search` fields will be returned to manage tables and forms.
4. When `refreshDeps` changes, it will reset `current` to the first page and re-initiate the request.

## Examples

### Table management

`useFusionTable` will automatically manage the pagination data of `Table`, you only need to pass the returned `tableProps` and `paginationProps` to the corresponding components.

```tsx | pure
<Table columns={columns} rowKey="email" {...tableProps} />
<Pagination {...paginationProps} />
```

<br />

<code src="./demo/table.tsx" />

### Form and Table data binding

When `useFusionTable` receives the `field` instance, it will return a search object to handle form related events.

- `search.type` supports switching between `simple` and `advance`
- `search.changeType`, switch form type
- `search.submit` submit form
- `search.reset` reset the current form

In the following example, you can experience the data binding between form and table.

<code src="./demo/form.tsx" />

### Default Params

`useFusionTable` sets the initial value through `defaultParams`, `defaultParams` is an array, the first item is paging related parameters, and the second item is form related data. If there is a second value, we will initialize the form for you!

It should be noted that the initial form data can be filled with all the form data of `simple` and `advance`, and we will help you select the form data of the currently activated type.

The following example sets paging data and form data during initialization.

<code src="./demo/init.tsx" />

### Form Validation

Before the form is submitted, we will automatically validate the form data. If the verification fails, the request will not be initiated.

<code src="./demo/validate.tsx" />

### Data Caching

By setting `cacheKey`, we can apply the data caching for the `Form` and `Table` .

<code src="./demo/cache.tsx" />

## API

All parameters and returned results of `useRequest` are applicable to `useFusionTable`, so we won't repeat them here.

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

| Property          | Description                                     | Type                  |
| ----------------- | ----------------------------------------------- | --------------------- |
| tableProps        | The data required by the `Table` component      | -                     |
| paginationProps   | The data required by the `Pagination` component | -                     |
| search.type       | Current form type                               | `simple` \| `advance` |
| search.changeType | Switch form type                                | `() => void`          |
| search.submit     | Submit form                                     | `() => void`          |
| search.reset      | Reset the current form                          | `() => void`          |

### Params

| Property        | Description                                                                                | Type                     | Default  |
| --------------- | ------------------------------------------------------------------------------------------ | ------------------------ | -------- |
| field           | `Form` instance                                                                            | -                        | -        |
| defaultType     | Default form type                                                                          | `simple` \| `advance`    | `simple` |
| defaultParams   | Default parameters, the first item is paging data, the second item is form data            | `[pagination, formData]` | -        |
| defaultPageSize | Default page size                                                                          | `number`                 | `10`     |
| refreshDeps     | Changes in `refreshDeps` will reset current to the first page and re-initiate the request. | `React.DependencyList`   | `[]`     |
