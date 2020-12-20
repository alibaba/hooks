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
---

# useFusionTable

It encapsulates the common Fusion [Form](https://fusion.design/pc/component/basic/form) and Fusion [Table](https://fusion.design/pc/component/basic/table) linkage logic.

## Examples

### Form and Table data binding

<code src="./demo/demo1.tsx" />

### Data caching

<code src="./demo/demo2.tsx" />

### Set Default Params

<code src="./demo/demo3.tsx" />

### Form Validate

<code src="./demo/demo4.tsx" />


## API

useFusionTable is based on [useRequest](/async). All [useRquest Pagination](/async?anchor=pagination#api-1) APIs can be used directly. For example `cacheKey`, `manual`, etc.

As the same as useRequest Pagination mode，The data structure returned by service must be `{list: Item [], total: number}`. If it is not satisfied, it can be converted once by `options.formatResult`.

useFusionTable adds `result.search` and `options.filed`.

```typescript
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
