---
nav:
  path: /hooks
group:
  path: /use-request
---

# ClearCache

You can clear the cached data by calling `clearCache`. 

`clearCache` receives a maximum of one parameter, `cacheKey: string` or `cacheKeys: string[]`.

You can also clear all cached data by passing in nothing.

```tsx | pure
import { clearCache } from 'ahooks';

clearCache(cacheKey);
clearCache(cacheKeys)
clearCache();
```

In the following example, we set three different `cacheKey`. When the component is loaded for the second time, the cached content will be returned first, and then the request will be re-run in background. You can experience clear the cached data by clicking these buttons.

<code src="./demo/clear.tsx" />

## API

### Options

| Property  | Description                                                                                                                                                                                                         | Type     | Default  |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------|
| cacheKey  |  A unique ID of the request. If `cacheKey` is set, we will enable the caching mechanism. The data of the same `cacheKey` is globally synchronized.                                                                      | `string` | `[]`     |
| cacheTime | <ul><li> Set the cache time. By default, the cached data will be cleared after 5 minutes.</li><li> If set to `-1`, the cached data will never expire</li></ul>                                       | `number` | `300000` |
| staleTime | <ul><li> Time to consider the cached data is fresh. Within this time interval, the request will not be re-initiated</li><li> If set to `-1`, it means that the data is always fresh</li></ul> | `number` | `0`      |

## Remark

* Only successful request data will be cached
* Cached data includes `data` and `params`
