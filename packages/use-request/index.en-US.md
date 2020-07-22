---
title: useRequest
nav:
  title: Hooks
  path: /hooks
group:
  title: Async
  path: /async
  order: 1
legacy: /async
---

# useRequest

Production-ready React Hook to manage asynchronous data.

**Core Characteristics**

* Auto-triggered request and Manually-triggered Request
* SWR(stale-while-revalidate)
* Cache / Preload
* Refresh On Window Focus
* Polling
* Debounce
* Throttle
* Concurrent Request
* Dependent Request
* Loading Delay
* Pagination
* Load more, data recovery and scroll position recovery
* ......

## Examples

### Default request

<code src="./demo/default.tsx" />

### Manual trigger

<code src="./demo/manual.tsx" />

### Polling

<code src="./demo/polling.tsx" />

### Concurrent Request

<code src="./demo/concurrent.tsx" />

### Dependent Request

<code src="./demo/ready.tsx" />

### Debounce

<code src="./demo/debounce.tsx" />

### Throttle

<code src="./demo/throttle.tsx" />

### Cache & SWR

<code src="./demo/cacheKey.tsx" />

### Preload

<code src="./demo/preload" />

### Refresh On Window Focus

<code src="./demo/refreshOnWindowFocus.tsx" />

### Mutate

<code src="./demo/mutate.tsx" />

### Loading Delay

<code src="./demo/loadingDelay.tsx" />

### RefreshDeps

When some `state` changes, we need to re-execute the asynchronous request. Generally, we will write code like this:

```jsx | pure
const [userId, setUserId] = useState('1');
const { data, run, loading } = useRequest(()=> getUserSchool(userId));
useEffect(() => {
  run();
}, [userId]);
```

`refreshDeps` is an equivalent yet easy way to implement the above function. When `refreshDeps` changes, the service will be re-executed using the previous params.

<code src="./demo/refreshDeps.tsx" />

## Basic API

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

| Property | Description                                                                                                                                                                                                                                                            | Type                                                                    |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| data     | <ul><li> Data returned by the service。</li><li> If `formatResult` is set, the data will be the return of `formatResult`. </li></ul>                                                                                                                                   | `undefined / any`                                                       |
| error    | exception thrown by service, default is `undefined`                                                                                                                                                                                                                    | `undefined / Error`                                                     |
| loading  | Whether the service is loaded                                                                                                                                                                                                                                          | `boolean`                                                               |
| run      | <ul><li>Manually trigger the service execution. Its parameters will be passed to the service function. </li><li>In Debounce or Throttle mode, will return `Promise<null>`</li></ul>                                                                                                                                                                          | `(...args: any[]) => Promise`                                           |
| params   | An array of parameters for the service being executed. For example, you triggered `run (1, 2, 3)`, then params is equal to [[1, 2, 3] `                                                                                          | `any[]`                             |
| cancel   | <ul><li>Cancel the current running request </li><li>This will also stop the polling. </li></ul>                                                                                                                                                                        | `() => void`                                                            |
| refresh  | Using the last params, re-execute the service                                                                                                                                                                                                                          | `() => Promise`                                                            |
| mutate   | Modify the returned data directly                                                                                                                                                                                                                                      | `(newData) => void / ((oldData)=>newData) => void`                      |
| fetches  | <ul><li>By default, new requests overwrite old ones. If `fetchKey` is set, multiple requests can be implemented in parallel, and` fetches` stores the status of all the requests.</li><li>The status of the outer layer is the newly triggered fetches data.</li></ul> | `{[key:string]: {loading,data,error,params,cancel,refresh,mutate,run}}` |

### Params

All Options are optional.

| Property             | Description                                                                                                                                                                                                                                                                                                                                                                                                | Type                                    | Default |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|---------|
| manual               | <ul><li> The default `false`. That is, the service is automatically executed during initialization.</li><li>If set to `true`, you need to call `run` manually to trigger execution. </li></ul>                                                                                                                                                                                                             | `boolean`                               | false   |
| initialData          | initial data                                                                                                                                                                                                                                                                                                                                                                                               | `any`                                   | -       |
| refreshDeps          | When `manual = false`,`refreshDeps` changes will trigger the service to re-execute                                                                                                                                                                                                                                                                                                                         | `any[]`                                 | `[]`    |
| formatResult         | Format request results                                                                                                                                                                                                                                                                                                                                                                                     | `(response: any) => any`                | -       |
| onSuccess            | <ul><li> Triggered when the service resolved, the parameters are `data` and` params` </li><li> If `formatResult` is present,` data` is the formatted data.</li></ul>                                                                                                                                                                                                                                      | `(data: any, params: any[]) => void`    | -       |
| onError              | Triggered when the service reports an error. The parameters are `error` and` params`.                                                                                                                                                                                                                                                                                                                      | `(error: Error, params: any[]) => void` | -       |
| fetchKey             | According to params, get the key of the current request. After setting, we will maintain the request status of different key values ​​at the same time in fetches.                                                                                                                                                                                                                                             | `(...params: any[]) => string`          | -       |
| defaultParams        | If `manual = false`, the default parameters when run is executed automatically,                                                                                                                                                                                                                                                                                                                            | `any[]`                                 | -       |
| loadingDelay         | Set delay time for display loading to avoid flicker                                                                                                                                                                                                                                                                                                                                                        | `number`                                | -       |
| pollingInterval      | Polling interval in milliseconds. After setting, it will enter polling mode and trigger `run` periodically.                                                                                                                                                                                                                                                                                                | `number`                                | -       |
| pollingWhenHidden    | <ul><li> Whether to continue polling when the page is hidden. Default is `true`, that is, polling will not stop </li><li> If set to `false`, polling is temporarily stopped when the page is hidden, and the last polling is continued when the page is redisplayed      </li></ul>                                                                                                                        | `boolean`                               | `true`  |
| refreshOnWindowFocus | <ul><li> Whether to re-initiate the request when the screen refocus or revisible. The default is `false`, which means the request will not be re-initiated. </li><li>If set to `true`, the request will be re-initiated when the screen is refocused or revisible.</li></ul>                                                                                                                               | `boolean`                               | `false` |
| focusTimespan        | <ul><li>  If the request is re-initiated every time, it is not good. We need to have a time interval. In the current time interval, the request will not be re-initiated. </li><li> Needs to be used with refreshOnWindowFocus. </li></ul>                                                                                                                                                                 | `number`                                | `5000`  |
| debounceInterval     | debounce interval, the unit is millisecond. After setting, request to enter debounce mode.                                                                                                                                                                                                                                                                                                                 | `number`                                | -       |
| throttleInterval     | throttle interval, the unit is millisecond. After setting, request to enter throttle mode.                                                                                                                                                                                                                                                                                                                 | `number`                                | -       |
| ready     | Only when ready is `true`, will the request be initiated                                                                                                                                                                                                               | `boolean`                                | `true`       |
| throwOnError     | If the service errors, the error will only be logged. If you want an error to be thrown, pass the throwOnError: true                                    | `boolean`                                | `false`       |
| cacheKey             | <ul><li> Request a unique identifier. If `cacheKey` is set, we will enable the cache mechanism</li><li> We cache `data`,` error`, `params`,` loading` for each request </li><li> Under the cache mechanism, the same request will return the data in the cache first, and a new request will be sent behind the scene. After the new data is returned, the data update will be triggered again. </li></ul> | `string`                                | -       |
| cacheTime             | <ul><li> the cache data recycling time. Default cache data is recycled after 5 minutes </li><li> If set to `-1`, it means that the cached data will never expire. </li><li> Need to be used with `cacheKey` </li></ul> | `number`                                | `300000`       |
| staleTime             | <ul><li> The cached data keeps fresh time. Within this time interval, the data is considered fresh and the request will not be resent </li><li> If set to `-1`, it means the data is always fresh. </li><li> Need to be used with `cacheKey` </li> </ul> | `number`                                | `0`       |
## Advanced usage

Based on the basic useRequest, we can further encapsulate and implement more advanced customization requirements. Currently useRequest has three scenarios: `Integrated Request Library`,` Pagination` and `Load More`. You can refer to the code to implement your own encapsulation. Refer to the implementation of [useRequest](./src/useRequest.ts)、[usePaginated](./src/usePaginated.ts)、[useLoadMore](./src/useLoadMore.ts) 的实现。

### Integration Request Library

If service is `string`,` object`, `(... args) => string | object`, we will automatically use [fetch] (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to send network requests. 

```javascript
// Usage 1
const { data, error, loading } = useRequest('/api/userInfo');

// Usage 2
const { data, error, loading } = useRequest({
  url: '/api/changeUsername',
  method: 'post',
});

// Usage 3
const { data, error, loading } = useRequest((userId)=> `/api/userInfo/${userId}`);

// Usage 4
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

If service is `string`,` object`, `(... args) => string | object`, then automatically use `fetch` to send the request.

#### Params

| Property      | Description                                                                                                                                                                         | Type                                   | Default |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|---------|
| requestMethod | Asynchronous request method, the parameters are the service or parameters returned by service. If this parameter is set, this function is used to send network requests by default. | `(service: string/object)) => Promise` | -       |

### Pagination

By setting `options.paginated = true`, useRequest will run in pagination mode, which will have the following characteristics:

- useRequest will automatically manage the `current`, `pageSize`. The first parameter of service is `{current, pageSize}`.
- The data structure returned by service must be `{list: Item [], total: number}`. If it is not satisfied, it can be converted once by `options.formatResult`.
- Additional pagination field will be returned, which contains all pagination information and functions for manipulating pagination.
- The `refreshDeps` change will reset` current` to the first page and re-initiate the request. Generally you can put the pagination dependent conditions here.

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
      pagination: PaginationConfig,
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
| Property   | Description                                                                                                                                  | Type |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------|------|
| pagination | Paging data and methods for operating paging                                                                                                 | -    |
| tableProps | The data structure of the [antd Table] (https://ant.design/components/table-cn/) component can be used directly on the antd Table component. | -    |

#### Params

| Property        | Description                                                                                                                                                                                                                                                          | Type     | Default |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------|
| paginated       | <ul> <li> If set to `true`, paging mode is turned on. In paging mode, the first parameter of service is `{curret, pageSize, sorter, filters}` </li> <li> The service response result or `formatResult` result must be` {list: Item [], total: number} `. </li> </ul>| `boolean`       | false                                                                                                                                                                                                                                |
| defaultPageSize | default each page size                                                                                                                                                                                                                                               | `number` | `10` |
| refreshDeps     | In pagination mode, changing refreshDeps will reset current to the first page and re-initiate the request. Generally you can put the dependent conditions here.                                                                                                      | `any[]`  | `[]` |

### Load More

By setting `options.loadMore = true`, useRequest will run in loadMore mode, which will have the following characteristics:

- useRequest will automatically manage the list data, `result.data.list` is a merged list. The first parameter of service is `result.data | undefined`
- The data structure returned by the service must contain `{list: Item []}`, if it is not satisfied, it can be converted once by `options.formatResult`.
- useRequest will return `result.loadingMore` and `result.loadMore` additionally.
- By setting `options.ref`， `options.isNoMore`, loadMore is automatically triggered when scrolling to the bottom.
- The `refreshDeps` change will clear the current data and re-initiate the request. Generally, you can put the conditions that loadMore depends on here.

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
| Property    | Description                                          | Type       |
|-------------|------------------------------------------------------|------------|
| loadMore    | Trigger load more                                    | `()=>void`  |
| loadingMore | Is loading more                                      | `boolean`   |
| noMore      | Is there have more data, need use with `options.isNoMore` | `boolean`  |
| reload      | trigger reload                                       | `()=>void` |

#### Params

| Property    | Description                                                                                                                                                      | Type    | Default |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|------|
| loadMore    | Enable loading more mode | `boolean`   | false  |
| ref         | The container's ref, if it exists, automatically triggers loadMore when scrolling to the bottom loadMore                                                                                                   | `RefObject<HTMLElement>` | false  |
| isNoMore    | Is there has more data | `(r: Result)=>boolan`    | false  |
| threshold   | Set the distance bottom threshold when pulling down autoload  | `number`                 | 100    |
| refreshDeps | The `refreshDeps` change will clear the current data and re-initiate the request. Generally, you can put the conditions that loadMore depends on here. | `any[]`                  | `[]`   |

## Global configuration

### UseRequestProvider
You can set global options at the outermost level of the project via `UseRequestProvider`.

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

### 1. Can I use multiple useRequests in a component?

Yes, You shoud use it like this.

```javascript

const firstRequest = useRequest(service);
const secondRequest = useRequest(service);

// firstRequest.loading
// firstRequest.data

// secondRequest.loading
// secondRequest.data
```

## Thanks
- [zeit/swr](https://github.com/zeit/swr)
- [tannerlinsley/react-query](https://github.com/tannerlinsley/react-query)
