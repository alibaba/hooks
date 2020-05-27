---
title: useAntdTable
order: 1000
nav:
  title: Hooks
  path: /hooks
group:
  title: Table
  path: /table
  order: 3
legacy: /table/use-antd-table
---

# useAntdTable

It encapsulates the common AntD [Form](https://ant.design/components/form-cn/) and AntD [Table](https://ant.design/components/table-cn/) linkage logic, and supports AntD V3 and V4 at the same time.

## Examples

### Form and Table data binding

<code src="./demo/demo1.tsx" />

### Data caching

<code src="./demo/demo2.tsx" />

### Set Default Params

<code src="./demo/demo5.tsx" />

## API

useAntdTable is based on [useRequest](/async). All [useRquest Pagination](/async?anchor=pagination#api-1) APIs can be used directly. For example `cacheKey`,` manual`, etc.

As the same as useRequest Pagination mode，The data structure returned by service must be `{list: Item [], total: number}`. If it is not satisfied, it can be converted once by `options.formatResult`.

useAntdTable adds `result.search` and` options.form`.

```javascript
const {
  ...,
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
} = useAntdTable(
  service,
  {
    ...,
    form,
    defaultType: 'simple' | 'advance',
    defaultParams: [pagination, formData],
  }
);
```
