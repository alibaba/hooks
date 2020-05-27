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
legacy: /zh-CN/table/use-fusion-table
---

# useFusionTable

封装了常用的 Fusion [Form](https://fusion.design/pc/component/basic/form) 与 Fusion [Table](https://fusion.design/pc/component/basic/table) 联动逻辑。

## 代码演示

### Form 与 Table 联动

<code src="./demo/demo1.tsx" />


## API

useFusionTable 基于 [useRequest](/zh-CN/async) 实现，所有的 [useRquest Pagination](/zh-CN/async?anchor=pagination#api-1) API 均可以直接使用。比如 `cacheKey`、`manual` 等等。

useFusionTable 额外增加了 `result.search` 和 `options.form`。

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
