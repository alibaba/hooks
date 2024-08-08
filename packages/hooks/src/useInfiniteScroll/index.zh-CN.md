---
nav:
  path: /hooks
---

# useInfiniteScroll

useInfiniteScroll 封装了常见的无限滚动逻辑。

```js
const { data, loading, loadingMore, loadMore } = useInfiniteScroll(service);
```

useInfiniteScroll 的第一个参数 `service` 是一个异步函数，对这个函数的入参和出参有如下约定：

1. `service` 返回的数据必须包含 `list` 数组，类型为 `{ list: any[], ...rest }`
2. `service` 的入参为整合后的最新 `data`

假如第一次请求返回数据为 `{ list: [1, 2, 3], nextId: 4 }`, 第二次返回的数据为 `{ list: [4, 5, 6], nextId: 7 }`, 则我们会自动合并 `list`，整合后的 `data` 为 `{ list: [1, 2, 3, 4, 5, 6], nextId: 7 }`。

## 基础用法

第一个例子我们演示最基本的无限滚动写法。

<code src="./demo/default.tsx" />

## 分页

在数据固定场景下，我们有时候会用 `page` 和 `pageSize` 来请求新的分页数据。

<code src="./demo/pagination.tsx" />

## 滚动自动加载

在无限滚动场景中，我们最常见的是滚动到底部时自动加载。通过配置以下几个属性，即可实现滚动自动加载。

- `options.target` 指定父级元素（父级元素需设置固定高度，且支持内部滚动）
- `options.isNoMore` 判断是不是没有更多数据了
- `options.direction` 滚动的方向，默认为向下滚动

向下滚动示例
<code src="./demo/scroll.tsx" />

向上滚动示例
<code src="./demo/scrollTop.tsx" />

## 数据重置

通过 `reload` 即可实现数据重置，下面示例我们演示在 `filter` 变化后，重置数据到第一页。

<code src="./demo/reload.tsx" />

以上代码可以通过 `reloadDeps` 语法糖实现，当 `reloadDeps` 变化时，会自动触发 `reload`。

```ts
const result = useInfiniteScroll(service, {
  reloadDeps: [keyword]
});
```

## 数据突变

通过 `mutate`，我们可以直接修改当前 `data`。下面示例演示了删除某条数据。

<code src="./demo/mutate.tsx" />

## API

```ts
export type Data = { list: any[];[key: string]: any; };
export type Service<TData extends Data> = (currentData?: TData) => Promise<TData>;

const {
  data: TData;
  loading: boolean;
  loadingMore: boolean;
  error?: Error;
  noMore: boolean;
  loadMore: () => void;
  loadMoreAsync: () => Promise<TData>;
  reload: () => void;
  reloadAsync: () => Promise<TData>;
  cancel: () => void;
  mutate: (data?: TData) => void;
} = useInfiniteScroll<TData extends Data>(
  service: (currentData?: TData) => Promise<TData>,
  {
    target?: BasicTarget;
    isNoMore?: (data?: TData) => boolean;
    threshold?: number;
    manual?: boolean;
    reloadDeps?: DependencyList;
    onBefore?: () => void;
    onSuccess?: (data: TData) => void;
    onError?: (e: Error) => void;
    onFinally?: (data?: TData, e?: Error) => void;
  }
);
```

### Result

| 参数          | 说明                                                                       | 类型                     |
| ------------- | -------------------------------------------------------------------------- | ------------------------ |
| data          | service 返回的数据，其中的 `list` 属性为聚合后数据                         | `TData` \| `undefined`   |
| loading       | 是否正在进行首次请求                                                       | `boolean`                |
| loadingMore   | 是否正在进行更多数据请求                                                   | `boolean`                |
| noMore        | 是否没有更多数据了，配置 `options.isNoMore` 后生效                         | `boolean`                |
| error         | 请求错误消息                                                               | `Error`                  |
| loadMore      | 加载更多数据，会自动捕获异常，通过 `options.onError` 处理                  | `() => void`             |
| loadMoreAsync | 加载更多数据，与 `loadMore` 行为一致，但返回的是 Promise，需要自行处理异常 | `() => Promise<TData>`   |
| reload        | 加载第一页数据，会自动捕获异常，通过 `options.onError` 处理                | `() => void`             |
| reloadAsync   | 加载第一页数据，与 `reload` 行为一致，但返回的是 Promise，需要自行处理异常 | `() => Promise<TData>`   |
| mutate        | 直接修改 `data`                                                            | `(data?: TData) => void` |
| cancel        | 忽略当前 Promise 的响应                                                    | `() => void`             |

### Options

| 参数       | 说明                                                                                                                                                             | 类型                                                        | 默认值   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------- |
| target     | 父级容器，如果存在，则在滚动到底部时，自动触发 `loadMore`。需要配合 `isNoMore` 使用，以便知道什么时候到最后一页了。 **当 target 为 document 时，定义为整个视口** | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -        |
| isNoMore   | 是否有最后一页的判断逻辑，入参为当前聚合后的 `data`                                                                                                              | `(data?: TData) => boolean`                                 | -        |
| threshold  | 下拉自动加载，距离底部距离阈值                                                                                                                                   | `number`                                                    | `100`    |
| direction  | 滚动的方向                                                                                                                                                       | `bottom` \| `top`                                           | `bottom` |
| reloadDeps | 变化后，会自动触发 `reload`                                                                                                                                      | `any[]`                                                     | -        |
| manual     | <ul><li> 默认 `false`。 即在初始化时自动执行 service。</li><li>如果设置为 `true`，则需要手动调用 `reload` 或 `reloadAsync` 触发执行。 </li></ul>                 | `boolean`                                                   | `false`  |
| onBefore   | service 执行前触发                                                                                                                                               | `() => void`                                                | -        |
| onSuccess  | service resolve 时触发                                                                                                                                           | `(data: TData) => void`                                     | -        |
| onError    | service reject 时触发                                                                                                                                            | `(e: Error) => void`                                        | -        |
| onFinally  | service 执行完成时触发                                                                                                                                           | `(data?: TData, e?: Error) => void`                         | -        |
