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
---

# useAntdTable

封装了常用的 antd [Form](https://ant.design/components/form-cn/) 与 antd [Table](https://ant.design/components/table-cn/) 联动逻辑，并且同时支持 antd V3 和 V4。

## 代码演示

### Form 与 Table 联动

<code src="./demo/demo1.tsx" />

### 数据缓存

<code src="./demo/demo2.tsx" />

### 初始化数据

<code src="./demo/demo5.tsx" />

### 表单验证

<code src="./demo/demo6.tsx" />

## API

useAntdTable 基于 [useRequest](/zh-CN/async) 实现，所有的 [useRquest Pagination](/zh-CN/async?anchor=pagination#api-1) API 均可以直接使用。比如 `cacheKey`、`manual` 等等。

当然和 useRequest Pagination 模式一样，service 返回的数据结构必须为 `{list: Item[], total: number}` ，如果不满足，可以通过 `options.formatResult` 转换一次。

useAntdTable 额外增加了 `result.search` 和 `options.form`。

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

## FAQ

### 1. 无法读取或初始化自定义表单组件的值

可以参考 [#496](https://github.com/alibaba/hooks/issues/496)。

antd 表单项如果是自定义函数组件，需要使用 `React.forwardRef` 包裹。

```js
const CustomInput = React.forwardRef((props, ref) => (
  <Input ref={ref} value={props.value} onChange={props.onChange} />
));
```