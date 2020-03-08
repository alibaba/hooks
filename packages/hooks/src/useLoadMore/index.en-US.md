---
title: useLoadMore
order: 900
nav:
  title: Hooks
  path: /hooks
group:
  title: Deprecated
  path: /deprecated
legacy: /deprecated/use-load-more
---

# useLoadMore

<Alert>
<b>⚠️WARNING: useLoadMore is deprecated and will be removed in the next major version. Please use <a href="/async?anchor=load-more">useRequest loadMore mode</a> instead.</b>
</Alert>

A Hook that is designed to display paged data incrementally.

**Core Characteristics**

* Async request control(loading, request timing control, etc)
* Logics will be used in common loadMore scenarios
* Support custom data loading method

## Examples

### Click to load more

<code src="./demo/demo1.tsx" />

### Pull up load more

<code src="./demo/demo2.tsx" />

### Use deps properly

<code src="./demo/demo3.tsx" />

### Custom data loading - timestamp mode

<code src="./demo/demo4.tsx" />

### Custom data loading - ID mode

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

| Property    | Description                              | Type       | Default     |
|-------------|------------------------------------------|------------|-------------|
| loading     | Whether it is loading for the first time | boolean    | false       |
| loadingMore | Whether to load more                     | boolean    | false       |
| data        | Full list data                           | any[]      | []          |
| reload      | Reload function                          | () => void | -|          |
| loadMore    | Load more function                       | () => void | -           |
| noMore      | Is there no more data                    | boolean    | false       |
| total       | Total amount of data                     | number \| undefined|- |


### Params

| Property | Description                                                       | Type                 | Default |
|----------|-------------------------------------------------------------------|----------------------|---------|
| asyncFn  | Async request function, params see FnParams                       | (FnParams)=> Promise | -       |
| deps     | Depends on the array, if the deps changes, it will trigger reload | any[]                | []      |
| options  | Optional configuration item, see Options                          | -                    | -       |


### FnParams

| Property  | Description                                                                                                                                  | Type   | Default |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------|--------|---------|
| page      | Request page number. In general, if your initPageSize is not equal to incrementSize, then page doesn't make sense to you, you can use offset | number | -       |
| pageSize  | The number of requested data, the first page is equal to initPageSize, the non-first page is equal to incrementSize                          | number | -       |
| offset    | Data offset, which is how many pieces of data are currently in existence                                                                     | number | -       |
| id        | The id of the last piece of data will only exist if itemKey is set                                                                           | string | -       |
| startTime | Start timestamp, recorded on the first load or each reload                                                                                   | number | -       |


### Options

| Property      | Description                                                                                     | Type                                                 | Default |
|---------------|-------------------------------------------------------------------------------------------------|------------------------------------------------------|---------|
| initPageSize  | first pageSize                                                                                  | number                                               | 10      |
| incrementSize | PageSize other than the first page, if not set, equals initPageSize                             | number                                               | -       |
| itemKey       | Data id, can be a string or a function                                                          | `string | ((record: Item, index: number) => string)` | -       |
| formatResult  | Format asyncFn request result                                                                   | `(x: Result) => ({ total: number, data: Item[]})`    | -       |
| ref           | The container's ref, if it exists, automatically triggers loadMore when scrolling to the bottom | `RefObject<HTMLElement>`                             | -       |
| threshold     | Set the distance bottom threshold when pulling down autoload                                    | number                                               | 100     |
