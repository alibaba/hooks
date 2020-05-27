---
title: useFusionTable
order: 1000
nav:
  title: Hooks
  path: /hooks
group:
  title: Table
  path: /table
  order: 3
legacy: /table/use-fusion-table
---

# useFusionTable

It encapsulates the common Fusion [Form](https://fusion.design/pc/component/basic/form) and Fusion [Table](https://fusion.design/pc/component/basic/table) linkage logic.

## Examples

### Form and Table data binding

<code src="./demo/demo1.tsx" />


## API

useFusionTable is based on [useRequest](/async). All [useRquest Pagination](/async?anchor=pagination#api-1) APIs can be used directly. For example `cacheKey`,` manual`, etc.

useFusionTable adds `result.search` and` options.form`.

```javascript
const {
  ...,
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
} = useFusionTable(
  service,
  {
    ...,
    field,
    defaultType: 'simple' | 'advance',
    defaultParams: [pagination, formData],
  }
);
```
