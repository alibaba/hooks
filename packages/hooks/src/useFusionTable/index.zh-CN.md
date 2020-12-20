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

封装了常用的 Fusion [Form](https://fusion.design/pc/component/basic/form) 与 Fusion [Table](https://fusion.design/pc/component/basic/table) 联动逻辑。

> 🌈「Table场景解决方案」上线啦！点击图片查看常用的表格场景，区块代码一键下载到本地，快速复用! [使用文档](https://fusion.design/help.html#/dnzud5)

[![](https://img.alicdn.com/tfs/TB1bEbWbQcx_u4jSZFlXXXnUFXa-2326-498.png)](https://fusion.design/pc/block?category=Table)

## 代码演示

### Form 与 Table 联动

<code src="./demo/demo1.tsx" />

### 数据缓存

<code src="./demo/demo2.tsx" />

### 初始化数据

<code src="./demo/demo3.tsx" />

### 表单验证

<code src="./demo/demo4.tsx" />

## API

useFusionTable 基于 [useRequest](/zh-CN/async) 实现，所有的 [useRquest Pagination](/zh-CN/async?anchor=pagination#api-1) API 均可以直接使用。比如 `cacheKey`、`manual` 等等。

当然和 useRequest Pagination 模式一样，service 返回的数据结构必须为 `{list: Item[], total: number}` ，如果不满足，可以通过 `options.formatResult` 转换一次。

useFusionTable 额外增加了 `result.search` 和 `options.filed`。

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
