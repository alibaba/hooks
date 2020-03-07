---
title: usePagination
nav:
  title: Hooks
  path: /hooks
group:
  title: Deprecated
  path: /deprecated
legacy: /zh-CN/deprecated/use-pagination
---

# usePagination

<Alert>
<b>⚠️警告: usePagination 已经被废弃了，将在下一个大版本时移除，你可以使用 <a href="/zh-CN/async?anchor=分页">useRequest 分页模式</a> 代替。</b>
</Alert>

适用于常见的异步分页场景的 Hook。

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx" />

### 合理利用 deps

<code src="./demo/demo2.tsx" />

## API

```javascript
const result: ReturnValue<Item> = usePagination<Result, Item>(
  asyncFn: ({current, pageSize}) => Promise<Result>,
  options?: Options,
);

const result: ReturnValue<Item> = usePagination<Result, Item>(
  asyncFn: ({current, pageSize}) => Promise<Result>,
  deps?: any[],
  options?: Options,
);
```

### Result

| 参数                      | 说明                         | 类型                                      |
|---------------------------|------------------------------|-------------------------------------------|
| data                      | 数据                         | Item[]                                    |
| loading                   | 数据是否正在加载             | boolean                                   |
| pagination.current        | 当前页号                     | number                                    |
| pagination.pageSize       | 每页数据量                   | number                                    |
| pagination.total          | 数据总量                     | number                                    |
| pagination.totalPage      | 总页数                       | number                                    |
| pagination.onChange       | 同时修改 current 和 pageSize | (current: number, pageSize: number)=>void |
| pagination.changeCurrent  | 单独修改 current             | (current: number)=>void                   |
| pagination.changePageSize | 单独修改 pageSize            | (pageSize: number)=>void                  |
| refresh                   | 刷新当前数据                 | () => void                                |

### Params

| 参数    | 说明                                                    | 类型                           | 默认值 |
|---------|---------------------------------------------------------|--------------------------------|--------|
| asyncFn | 异步请求数据函数，函数参数为 current 和 pageSize        | ({current, pageSize})=>Promise | -      |
| deps    | 依赖数组，如果 deps 变化，会重置 current 并触发 asyncFn | any[]                          | []     |
| options | 可选配置项，见 Options                                  | -                              | -      |


### Options

| 参数            | 说明                                                                         | 类型                           | 默认值 |
|-----------------|------------------------------------------------------------------------------|--------------------------------|--------|
| defaultPageSize | 默认的每页数据量                                                             | number                         | 10     |
| formatResult    | 对 asyncFn 返回数据进行格式化，如果 asyncFn 返回数据符合要求，则不需要该参数 | (res: Result)=>({total, data}) | -      |
