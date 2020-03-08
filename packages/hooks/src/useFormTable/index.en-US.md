---
title: useFormTable
order: 1000
nav:
  title: Hooks
  path: /hooks
group:
  title: Ant Design
  path: /antd
  order: 3
legacy: /antd/use-form-table
---

# useFormTable

It encapsulates the common AntD [Form](https://ant.design/components/form-cn/) and AntD [Table](https://ant.design/components/table-cn/) linkage logic, and supports AntD V3 and V4 at the same time.

## Examples

### Form and Table data binding

<code src="./demo/demo1.tsx" />

### Data caching

<code src="./demo/demo2.tsx" />

## API

useFormTable is based on [useRequest](/async). All [useRquest Pagination](/async?anchor=pagination#api-1) APIs can be used directly. For example `cacheKey`,` manual`, etc.

useFormTable adds `result.search` and` options.form`.

```javascript
const {
  ...,
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
} = useFormTable(
  service,
  {
    ...,
    form
  }
);
```
