---
nav:
  path: /hooks
group:
  path: /use-request
---

# Cache & SWR

If `options.cacheKey` is set, `useRequest` will cache the successful data . The next time the component is initialized, if there is cached data, we will return the cached data first, and then send a new request in background, which is the ability of SWR.

You can set the data retention time through `options.staleTime`. During this time, we consider the data to be fresh and will not re-initiate the request.

You can also set the data cache time through `options.cacheTime`, after this time, we will clear the cached data.

Next, through a few examples to experience these features.

### SWR

In the following example, we set the `cacheKey`. When the component is loaded for the second time, the cached content will be returned first, and then the request will be re-run in background. You can experience the effect by clicking the button.

<code src="./demo/cacheKey.tsx" />

### Keep your data fresh

By setting `staleTime`, we can specify the data retention time, during which time the request will not be re-run. The following example sets a fresh time of 5s, you can experience the effect by clicking the button

<code src="./demo/staleTime.tsx" />

### Data sharing

> Note: If no new request is issued, the "Data sharing" will not be triggered. `cacheTime` and `staleTime` parameters will invalidate "Data sharing". [#2313](https://github.com/alibaba/hooks/issues/2313)

The content of the same `cacheKey` is shared globally, which will bring the following features:

- Sharing request `Promise`: Only one of the same `cacheKey` will initiate a request at the same time, and the subsequent ones will share the same request `Promise`.
- Data synchronization: When a request is made by one `cacheKey`, the contents of other identical `cacheKey` will be synchronized accordingly.

In the following example, the two components will only initiate one request during initialization. And the content of the two articles is always synchronized.

<code src="./demo/share.tsx" />

### Parameters cache

The cached data includes `data` and `params`. Through the `params` caching mechanism, we can remember the conditions of the last request and initialize it next time.

In the following example, we can initialize the `keyword` from the cached `params`

<code src="./demo/params.tsx" />

### Clear cache

ahooks provides a `clearCache` method, which can clear the cache data of the specified `cacheKey`.

<code src="./demo/clearCache.tsx" />

### Custom cache

By setting `setCache` and `getCache`, you can customize the cache, for example, you can store data in `localStorage`, `IndexDB`, etc.

Please note:

1. `setCache` and `getCache` need to be used together.
2. In the custom cache mode, `cacheTime` and `clearCache` will be unused, please implement it yourself according to the actual situation.

<code src="./demo/setCache.tsx" />

## API

```ts
interface CachedData<TData, TParams> {
  data: TData;
  params: TParams;
  time: number;
}
```

### Options

| Property  | Description                                                                                                                                                                                                                                   | Type                              | Default  |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | -------- |
| cacheKey  | A unique ID of the request. Data of the same `cacheKey` will synchronized globally (`cacheTime` and `staleTime` parameters will invalidate this mechanism, see demo: [Data sharing](#data-sharing))                                           | `string`                          | -        |
| cacheTime | <ul><li> Set the cache time. By default, the cached data will be cleared after 5 minutes.</li><li> If set to `-1`, the cached data will never expire</li></ul>                                                                                | `number`                          | `300000` |
| staleTime | <ul><li> Time to consider the cached data is fresh. Within this time interval, the request will not be re-initiated</li><li> If set to `-1`, it means that the data is always fresh</li></ul>                                                 | `number`                          | `0`      |
| setCache  | <ul><li> Custom set cache </li><li> `setCache` and `getCache` need to be used together</li><li> In the custom cache mode, `cacheTime` and `clearCache` are useless, please implement it yourself according to the actual situation.</li></ul> | `(data: CachedData) => void;`     | -        |
| getCache  | Custom get cache                                                                                                                                                                                                                              | `(params: TParams) => CachedData` | -        |

### clearCache

```tsx | pure
import { clearCache } from 'ahooks';

clearCache(cacheKey?: string | string[]);
```

1. Support clearing a single cache, or a group of caches
2. If `cacheKey` is empty, all cached data will be cleared

## Remark

- Only successful request data will be cached
- Cached data includes `data` and `params`
