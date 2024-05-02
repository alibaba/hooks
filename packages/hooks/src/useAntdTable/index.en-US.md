---
nav:
  path: /hooks
---

# useAntdTable

`useAntdTable` is implemented based on `useRequest` and encapsulates the commonly used [Ant Design Form](https://ant.design/components/form/) and [Ant Design Table](https://ant.design/components/table/) data binding logic, and supports both antd v3 and v4.

Before using it, you need to understand a few points that are different from `useRequest`:

1. `service` receives two parameters, the first parameter is the paging data `{ current, pageSize, sorter, filters, extra }`, and the second parameter is the form data.
2. The data structure returned by `service` must be `{ total: number, list: Item[] }`.
3. Additional `tableProps` and `search` fields will be returned to manage tables and forms.
4. When `refreshDeps` changes, it will reset `current` to the first page and re-initiate the request.

## Examples

The following demos are for antd v4. For v3, please refer to: https://ahooks-v2.js.org/hooks/table/use-antd-table

### Table management

`useAntdTable` will automatically manage the pagination data of `Table`, you only need to pass the returned `tableProps` to the `Table` component.

```tsx | pure
<Table columns={columns} rowKey="email" {...tableProps} />
```

<br />

<code src="./demo/table.tsx" />

### Form and Table data binding

When `useAntdTable` receives the `form` instance, it will return a search object to handle form related events.

- `search.type` supports switching between `simple` and `advance`
- `search.changeType`, switch form type
- `search.submit` submit form
- `search.reset` reset the current form

In the following example, you can try out the data binding between form and table.

<code src="./demo/form.tsx" />

### Default Params

`useAntdTable` sets the initial value through `defaultParams`, `defaultParams` is an array, the first item is paging related parameters, and the second item is form related data. If there is a second value, we will initialize the form for you!

It should be noted that the initial form data can be filled with all the form data of `simple` and `advance`, and we will help you select the form data of the currently activated type.

The following example sets paging data and form data during initialization.

<code src="./demo/init.tsx" />

### Form Validation

Before the form is submitted, we will call `form.validateFields` to validate the form data. If the verification fails, the request will not be initiated.

<code src="./demo/validate.tsx" />

### Data Caching

By setting `cacheKey`, we can apply the data caching for the `Form` and `Table`.

<code src="./demo/cache.tsx" />

## API

All parameters and returned results of `useRequest` are applicable to `useAntdTable`, so we won't repeat them here.

```typescript

type Data = { total: number; list: any[] };
type Params = [{ current: number; pageSize: number, filters?: any, sorter?: any, extra?: any }, { [key: string]: any }];

const {
  ...,
  tableProps: {
    dataSource: TData['list'];
    loading: boolean;
    onChange: (
      pagination: any,
      filters?: any,
      sorter?: any,
      extra?: any,
    ) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
} = useAntdTable<TData extends Data, TParams extends Params>(
  service: (...args: TParams) => Promise<TData>,
  {
    ...,
    form?: any;
    defaultType?: 'simple' | 'advance';
    defaultParams?: TParams,
    defaultPageSize?: number;
    refreshDeps?: any[];
  }
);
```

### Result

| Property          | Description                                | Type                  |
| ----------------- | ------------------------------------------ | --------------------- |
| tableProps        | The data required by the `Table` component | -                     |
| search.type       | Current form type                          | `simple` \| `advance` |
| search.changeType | Switch form type                           | `() => void`          |
| search.submit     | Submit form                                | `() => void`          |
| search.reset      | Reset the current form                     | `() => void`          |

### Params

| Property        | Description                                                                                | Type                     | Default  |
| --------------- | ------------------------------------------------------------------------------------------ | ------------------------ | -------- |
| form            | `Form` instance                                                                            | -                        | -        |
| defaultType     | Default form type                                                                          | `simple` \| `advance`    | `simple` |
| defaultParams   | Default parameters, the first item is paging data, the second item is form data            | `[pagination, formData]` | -        |
| defaultPageSize | Default page size                                                                          | `number`                 | `10`     |
| refreshDeps     | Changes in `refreshDeps` will reset current to the first page and re-initiate the request. | `React.DependencyList`   | `[]`     |
