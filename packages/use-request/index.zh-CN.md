---
title: useRequest
nav:
  title: Hooks
  path: /zh-CN/hooks
group:
  title: Async
  path: /async
  order: 1
legacy: /zh-CN/async
---

# useRequest

一个强大的管理异步数据请求的 Hook.

**核心特性**

* 自动请求/手动请求
* SWR(stale-while-revalidate)
* 缓存/预加载
* 屏幕聚焦重新请求
* 轮询
* 防抖
* 节流
* 并行请求
* 依赖请求
* loading delay
* 分页
* 加载更多，数据恢复 + 滚动位置恢复
* ......

## 代码演示

### 默认请求

<code src="./demo/default.tsx" />

### 手动触发

<code src="./demo/manual.tsx" />

### 轮询

<code src="./demo/polling.tsx" />

### 并行请求

<code src="./demo/concurrent.tsx" />

### 依赖请求

<code src="./demo/ready.tsx" />

### 防抖

<code src="./demo/debounce.tsx" />

### 节流

<code src="./demo/throttle.tsx" />

### 缓存 & SWR

<code src="./demo/cacheKey.tsx" />

### 预加载

<code src="./demo/preload.tsx" />

### 屏幕聚焦重新请求

<code src="./demo/refreshOnWindowFocus.tsx" />

### 突变

<code src="./demo/mutate.tsx" />

### Loading Delay

<code src="./demo/loadingDelay.tsx" />

### refreshDeps

当某些 `state` 变化时，我们需要重新执行异步请求，一般我们会这样写代码：

```jsx | pure
const [userId, setUserId] = useState('1');
const { data, run, loading } = useRequest(()=> getUserSchool(userId));
useEffect(() => {
  run();
}, [userId]);
```

`refreshDeps` 是一个语法糖，让你更方便的实现上面的功能。当 `refreshDeps` 变化时，会使用之前的 params 重新执行 service。

<code src="./demo/refreshDeps.tsx" />

## 基础 API

```javascript
const {
  data,
  error,
  loading,
  run,
  params,
  cancel,
  refresh,
  mutate,
  fetches,
} = useRequest(service, {
  manual,
  initialData,
  refreshDeps,
  onSuccess,
  onError,
  formatResult,
  cacheKey,
  loadingDelay,
  defaultParams,
  pollingInterval,
  pollingWhenHidden,
  fetchKey,
  refreshOnWindowFocus,
  focusTimespan,
  debounceInterval,
  throttleInterval,
  ready,
  throwOnError,
});
```

### Result

| 参数    | 说明                                                                                                                                                                            | 类型                                                                    |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| data    | <ul><li> service 返回的数据，默认为 `undefined`。</li><li> 如果有 `formatResult`, 则该数据为被格式化后的数据。</li></ul>                                                        | `undefined / any`                                                       |
| error   | service 抛出的异常，默认为 `undefined`                                                                                                                                          | `undefined / Error`                                                     |
| loading | service 是否正在执行                                                                                                                                                            | `boolean`                                                               |
| run     | <ul><li>手动触发 service 执行，参数会传递给 service</li><li>debounce 模式与 throttle 模式返回值为 `Promise<null>`</li></ul>                                                                                                                                   | `(...args: any[]) => Promise`                                           |
| params  | 当次执行的 service 的参数数组。比如你触发了 `run(1, 2, 3)`，则 params 等于 `[1, 2, 3]`                                                                                          | `any[]`                                                                 |
| cancel  | <ul><li>取消当前请求 </li><li>如果有轮询，停止 </li></ul>                                                                                                                       | `() => void`                                                            |
| refresh | 使用上一次的 params，重新执行 service                                                                                                                                           | `() => Promise`                                                            |
| mutate  | 直接修改 data                                                                                                                                                                   | `(newData) => void / ((oldData)=>newData) => void`                      |
| fetches | <ul><li>默认情况下，新请求会覆盖旧请求。如果设置了 `fetchKey`，则可以实现多个请求并行，`fetches` 存储了多个请求的状态。</li><li>外层的状态为最新触发的 fetches 数据。</li></ul> | `{[key:string]: {loading,data,error,params,cancel,refresh,mutate,run}}` |

### Params

所有的 Options 均是可选的。

| 参数                 | 说明                                                                                                                                                                                                                                                                     | 类型                                    | 默认值  |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|---------|
| manual               | <ul><li> 默认 `false`。 即在初始化时自动执行 service。</li><li>如果设置为 `true`，则需要手动调用 `run` 触发执行。 </li></ul>                                                                                                                                             | `boolean`                               | false   |
| initialData          | 默认的 data                                                                                                                                                                                                                                                              | `any`                                   | -       |
| refreshDeps          | 在 `manual = false` 时，`refreshDeps` 变化，会触发 service 重新执行                                                                                                                                                                                                      | `any[]`                                 | `[]`    |
| formatResult         | 格式化请求结果                                                                                                                                                                                                                                                           | `(response: any) => any`                | -       |
| onSuccess            | <ul><li> service resolve 时触发，参数为 `data` 和 `params` </li><li> 如果有 `formatResult` ，则 `data` 为格式化后数据。</li></ul>                                                                                                                                       | `(data: any, params: any[]) => void`    | -       |
| onError              | service 报错时触发，参数为 `error` 和 `params`。                                                                                                                                                                                                                         | `(error: Error, params: any[]) => void` | -       |
| fetchKey             | 根据 params，获取当前请求的 key，设置之后，我们会在 `fetches` 中同时维护不同 `key` 值的请求状态。                                                                                                                                                                        | `(...params: any[]) => string`          | -       |
| defaultParams        | 如果 `manual=false` ，自动执行 `run` 的时候，默认带上的参数                                                                                                                                                                                                              | `any[]`                                 | -       |
| loadingDelay         | 设置显示 loading 的延迟时间，避免闪烁                                                                                                                                                                                                                                    | `number`                                | -       |
| pollingInterval      | 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 `run`                                                                                                                                                                                                             | `number`                                | -       |
| pollingWhenHidden    | <ul><li> 在页面隐藏时，是否继续轮询。默认为 `true`，即不会停止轮询 </li><li> 如果设置为 `false` , 在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询 </li></ul>                                                                                                      | `boolean`                               | `true`  |
| refreshOnWindowFocus | <ul><li> 在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 `false`，即不会重新发起请求。 </li><li>如果设置为 `true`，在屏幕重新聚焦或重新显示时，会重新发起请求。</li></ul>                                                                                       | `boolean`                               | `false` |
| focusTimespan        | <ul><li> 屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求 </li><li> 需要配和 `refreshOnWindowFocus` 使用。 </li></ul>                                                                                          | `number`                                | `5000`  |
| debounceInterval     | 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。                                                                                                                                                                                                                         | `number`                                | -       |
| throttleInterval     | 节流间隔, 单位为毫秒，设置后，请求进入节流模式。                                                                                                                                                                                                                         | `number`                                | -       |
| ready     | 只有当 ready 为 `true` 时，才会发起请求                                                                                                                                                                                                                         | `boolean`                                | `true`       |
| throwOnError     | 如果 service 报错，我们会帮你捕获并打印日志，如果你需要自己处理异常，可以设置 throwOnError 为 true                                   | `boolean`                                | `false`       |
| cacheKey             | <ul><li> 请求唯一标识。如果设置了 `cacheKey`，我们会启用缓存机制 </li><li> 我们会缓存每次请求的 `data` , `error` , `params` , `loading` </li><li> 在缓存机制下，同样的请求我们会先返回缓存中的数据，同时会在背后发送新的请求，待新数据返回后，重新触发数据更新</li></ul> | `string`                                | -       |
| cacheTime             | <ul><li> 设置缓存数据回收时间。默认缓存数据 5 分钟后回收 </li><li> 如果设置为 `-1`, 则表示缓存数据永不过期</li><li> 需要配和 `cacheKey` 使用 </li></ul> | `number`                                | `300000`       |
| staleTime             | <ul><li> 缓存数据保持新鲜时间。在该时间间隔内，认为数据是新鲜的，不会重新发请求 </li><li> 如果设置为 `-1`，则表示数据永远新鲜</li><li> 需要配和 `cacheKey` 使用 </li> </ul> | `number`                                | `0`       |
## 扩展用法

基于基础的 useRequest，我们可以进一步封装，实现更高级的定制需求。当前 useRequest 内置了 `集成请求库`，`分页` 和 `加载更多` 三种场景。你可以参考代码，实现自己的封装。参考 [useRequest](https://github.com/alibaba/hooks/blob/master/packages/use-request/src/useRequest.ts)、[usePaginated](https://github.com/alibaba/hooks/blob/master/packages/use-request/src/usePaginated.ts)、[useLoadMore](https://github.com/alibaba/hooks/blob/master/packages/use-request/src/useLoadMore.ts) 的实现。

### 集成请求库

如果 service 是 `string` 、 `object` 、 `(...args)=> string|object`, 则自动使用 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 来发送网络请求。

```javascript
// 用法 1
const { data, error, loading } = useRequest('/api/userInfo');

// 用法 2
const { data, error, loading } = useRequest({
  url: '/api/changeUsername',
  method: 'post',
});

// 用法 3
const { data, error, loading } = useRequest((userId)=> `/api/userInfo/${userId}`);

// 用法 4
const { loading, run } = useRequest((username) => ({
  url: '/api/changeUsername',
  method: 'post',
  body: JSON.stringify({ username }),
}), {
  manual: true,
});
```

<code src="./demo/fetch.tsx" />

<br>

<code src="./demo/axios.tsx" />

#### API

```typescript
const {...} = useRequest<R>(
  service: string | object | ((...args:any) => string | object),
  {
    ...,
    requestMethod?: (service) => Promise
  })
```

#### Service

如果 service 是 `string` 、 `object` 、 `(...args)=> string|object`，则自动使用 `fetch` 来发送请求。

#### Params

| 参数          | 说明                                                                                               | 类型                                   | 默认值 |
|---------------|----------------------------------------------------------------------------------------------------|----------------------------------------|--------|
| requestMethod | 异步请求方法，参数为 service 或 service 返回的参数。如果设置该参数，则默认使用该函数发送网络请求。 | `(service: string/object)) => Promise` | -      |

### 分页

通过设置 `options.paginated = true` ， useRequest 将以分页模式运行，此时会有以下特性：

- useRequest 会自动管理分页 `current` , `pageSize` 。service 的第一个参数为 `{current, pageSize}` 。
- service 返回的数据结构必须为 `{list: Item[], total: number}` ，如果不满足，可以通过 `options.formatResult` 转换一次。
- 会额外返回 `pagination` 字段，包含所有分页信息，及操作分页的函数。
- `refreshDeps` 变化，会重置 `current` 到第一页，并重新发起请求，一般你可以把 pagination 依赖的条件放这里。

<code src="./demo/pagination-1.tsx" />


<code src="./demo/pagination-antd.tsx" />


<code src="./demo/pagination-cache.tsx" />

#### API

```javascript
const {
  ...,
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPage: number;
    onChange: (current: number, pageSize: number) => void;
    changeCurrent: (current: number) => void;
    changePageSize: (pageSize: number) => void;
  };
  tableProps: {
    dataSource: Item[];
    loading: boolean;
    onChange: (
      pagination: any,
      filters?: any,
      sorter?: any,
    ) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };
} = useRequest(service, {
  ...,
  paginated,
  defaultPageSize,
  refreshDeps,
});
```

#### Result
| 参数       | 说明                                                                                                        | 类型 |
|------------|-------------------------------------------------------------------------------------------------------------|------|
| pagination | 分页数据及操作分页的方法                                                                                    | -    |
| tableProps | 适配 [antd Table](https://ant.design/components/table-cn/) 组件的数据结构，可以直接用在 antd Table 组件上。 | -    |


#### Params

| 参数            | 说明                                                                                                                                                                                                                      | 类型      | 默认值 |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|--------|
| paginated       | <ul><li> 如果设置为 `true`，则开启分页模式。在分页模式下，service 的第一个参数为 `{curret, pageSize, sorter, filters}` </li><li> service 响应结果或 `formatResult` 结果必须为 `{list: Item[], total: number}`。</li></ul> | `boolean` | false  |
| defaultPageSize | 默认每页的数量                                                                                                                                                                                                            | `number`  | `10`   |
| refreshDeps     | 分页模式下， `refreshDeps` 变化，会重置 `current` 到第一页，并重新发起请求，一般你可以把依赖的条件放这里。                                                                                                                | `any[]`   | `[]`   |

### 加载更多

通过设置 `options.loadMore = true` ， useRequest 将以 loadMore 模式运行，此时会有以下特性：

- useRequest 会自动管理列表数据，返回的 `data.list` 为所有请求数据的 list 合并数组。service 的参数为 `result.data | undefined`。
- service 返回的数据结构必须包含 `{list: Item[]}` ，如果不满足，可以通过 `options.formatResult` 转换一次。
- useRequest 会额外返回 `result.loadingMore` 和 `result.loadMore` 。
- 通过设置 `options.ref`， `options.isNoMore`，可以实现上拉加载更多功能。
- `refreshDeps` 变化，会清空当前数据，并重新发起请求，一般你可以把 loadMore 依赖的条件放这里。

<code src="./demo/loadMore-1.tsx" />

<code src="./demo/loadMore-2.tsx" />

#### API

```javascript
const {
  ...,
  loadMore,
  loadingMore,
  noMore,
  reload
} = useRequest(service, {
  ...,
  loadMore,
  ref,
  isNoMore,
  threshold,
  refreshDeps,
});
```

#### Result
| 参数        | 说明                                             | 类型       |
|-------------|--------------------------------------------------|------------|
| loadMore    | 触发加载更多                                     | `()=>void` |
| loadingMore | 是否正在加载更多                                 | `boolean`  |
| noMore      | 是否有更多数据，需要配合 `options.isNoMore` 使用 | `boolean`  |
| reload      | 触发重新加载                                     | `()=>void` |

#### Options

| 参数        | 说明                                                                                                                                                        | 类型                     | 默认值 |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|--------|
| loadMore    | 是否开启加载更多模式                                                                                                                                        | `boolean`                | false  |
| ref         | 容器的 ref，如果存在，则在滚动到底部时，自动触发 loadMore                                                                                                   | `RefObject<HTMLElement>` | false  |
| isNoMore    | 判断是否还有更多数据的函数                                                                                                                                  | `(r: Result)=>boolan`    | false  |
| threshold   | 下拉自动加载，距离底部距离阈值                                                                                                                              | `number`                 | 100    |
| refreshDeps | 加载更多模式下， `refreshDeps` 变化，会清空当前数据，并重新发起请求，一般你可以把依赖的条件放这里。                                                         | `any[]`                  | `[]`   |

## 全局配置

### UseRequestProvider
你可以通过 `UseRequestProvider` 在项目的最外层设置全局 options。

```javascript
import { UseRequestProvider } from 'ahooks';

export function ({children})=>{
  return (
    <UseRequestProvider value={{
      refreshOnWindowFocus: true,
      requestMethod: (param)=> axios(param),
      ...
    }}>
      {children}
    </UseRequestProvider>
  )
}
```

## FAQ

### 1. 我可以在一个组件中使用多个 useRequest 吗？

可以的，建议您像下面这样使用。

```javascript

const firstRequest = useRequest(service);
const secondRequest = useRequest(service);

// firstRequest.loading
// firstRequest.data

// secondRequest.loading
// secondRequest.data
```

## 致谢
- [zeit/swr](https://github.com/zeit/swr)
- [tannerlinsley/react-query](https://github.com/tannerlinsley/react-query)
