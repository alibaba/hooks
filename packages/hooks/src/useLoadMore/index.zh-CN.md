---
title: useLoadMore
nav:
  title: Hooks
  path: /hooks
group:
  title: Deprecated
  path: /deprecated
legacy: /zh-CN/deprecated/use-load-more
---

# useLoadMore

<Alert>
<b>⚠️警告: useAsync 已经被废弃了，将在下一个大版本时移除，你可以使用 <a href="/zh-CN/async?anchor=加载更多">useRequest loadMore 模式</a> 代替。</b>
</Alert>

一个适用于点击加载更多或上拉加载更多应用场景的 Hook。

**核心特性**

* 异步请求控制（loading, 请求时序控制等）
* 封装了常见 loadMore 场景的逻辑
* 支持动态数据 loadMore 场景

## 代码演示

### 点击加载更多

<code src="./demo/demo1.tsx" />

### 上拉加载更多

<code src="./demo/demo2.tsx" />

### 合理利用 deps

<code src="./demo/demo3.tsx" />

### 动态数据加载之时间戳模式

<code src="./demo/demo4.tsx" />

### 动态数据加载之 ID 模式

<code src="./demo/demo5.tsx" />

## API

```javascript
const result: ReturnValue<Item> = useLoadMore<Result, Item>(
  asyncFn: (params: FnParams) => Promise<Result>,
  options?: Options<Result, Item>,
);

const result: ReturnValue<Item> = useLoadMore<Result, Item>(
  asyncFn: (params: FnParams) => Promise<Result>,
  deps?: any[],
  options?: Options<Result, Item>,
);

```

### Result

| 参数        | 说明               | 类型       | 默认值      |
|-------------|--------------------|------------|-------------|
| loading     | 是否第一次加载中   | boolean    | false       |
| loadingMore | 是否加载更多中     | boolean    | false       |
| data        | 全部列表数据       | any[]      | []          |
| reload      | 重新加载函数       | () => void | -           |
| loadMore    | 加载更多函数       | () => void | -           |
| noMore      | 是否没有更多数据了 | boolean    | false       |
| total       | 数据总量           | number \| undefined|- |


### 参数

| 参数    | 说明                                    | 类型               | 默认值 |
|---------|-----------------------------------------|--------------------|--------|
| asyncFn | 请求数据的函数，函数参数见 FnParams       | (FnParams)=> Promise | -      |
| deps    | 依赖数组，如果 deps 变化，会触发 reload   | any[]              | []     |
| options | 可选配置项，见 Options                  | -                  | -      |


### FnParams

| 参数      | 说明                                                                                                          | 类型   | 默认值 |
|-----------|---------------------------------------------------------------------------------------------------------------|--------|--------|
| page      | 请求第几页数据，一般来说，如果你的 initPageSize 不等于 incrementSize，那 page 对你没有意义，你可以使用 offset | number | -      |
| pageSize  | 请求数据数量，第一页等于 initPageSize，非第一页等于 incrementSize                                             | number | -      |
| offset    | 数据偏移量，也就是当前已经存在多少条数据了                                                                    | number | -      |
| id        | 最后一条数据的 id，只有设置了 itemKey 后才会存在                                                              | string | -      |
| startTime | 开始时间戳，第一次加载或每次 reload 时记录                                                                    | number | -      |


### Options

| 参数          | 说明                                                      | 类型                                                 | 默认值 |
|---------------|-----------------------------------------------------------|------------------------------------------------------|--------|
| initPageSize  | 第一页的 pageSize                                         | number                                               | 10     |
| incrementSize | 非第一页的 pageSize，如果不设置，则等于 initPageSize      | number                                               | -      |
| itemKey       | 数据 id，可以是字符串或一个函数                           | `string | ((record: Item, index: number) => string)` | -      |
| formatResult  | 格式化 service 请求结果                                   | `(x: Result) => ({ total: number, data: Item[]})`    | -      |
| ref           | 容器的 ref，如果存在，则在滚动到底部时，自动触发 loadMore | `RefObject<HTMLElement>`                             | -      |
| threshold     | 下拉自动加载，距离底部距离阈值                            | number                                               | 100    |
