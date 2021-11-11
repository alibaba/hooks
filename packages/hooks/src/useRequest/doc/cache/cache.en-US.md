---
nav:
  path: /hooks
group:
  path: /use-request
---

# Cache & SWR

If `options.cacheKey` is set, useRequest will cache the successful data . The next time the component is initialized, if there is cached data, we will return the cached data first, and then send a new request in background, which is the ability of SWR.

You can set the data retention time through `options.staleTime`. During this time, we consider the data to be fresh and will not re-initiate the request.

You can also set the data cache time through `options.cacheTime`, after this time, we will clear the cached data.

Next, through a few examples to experience these features.

### SWR

In the following example, we set the cacheKey. When the component is loaded for the second time, the cached content will be returned first, and then the request will be re-run in background. You can experience the effect by clicking the button.

<code src="./demo/cacheKey.tsx" />

### Keep your data fresh

By setting `staleTime`, we can specify the data freshness time, during which time the request will not be re-run. The following example sets a fresh time of 5s, you can experience the effect by clicking the button

<code src="./demo/staleTime.tsx" />

### data sharing

The content of the same cacheKey is shared globally, which will bring the following features

* Request Promise sharing, only one of the same cacheKey will initiate a request at the same time, and the subsequent ones will share the same request Promise
* Data synchronization. At any time, when we change the content of one of the cacheKeys, the content of the other cacheKeys will be synchronized.

In the following example, the two components will only initiate one request during initialization. And the content of the two articles is always synchronized.

<code src="./demo/share.tsx" />

### Parameter cache

The cached data includes `data` and `params`. Through the `params` caching mechanism, we can remember the conditions of the last request and initialize it next time.

In the following example, we can initialize the `keyword` from the cached `params`

<code src="./demo/params.tsx" />

## API

### Options

| Property  | Description                                                                                                                                                                                                         | Type     | Default  |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------|
| cacheKey  | Request a unique identification. If cacheKey is set, we will enable the caching mechanism. The data of the same cacheKey is globally synchronized.                                                                  | `string` | `[]`     |
| cacheTime | <ul><li> Set the cache data recovery time. By default, the cached data will be recycled after 5 minutes.</li><li> If set to `-1`, the cached data will never expire</li></ul>                                       | `number` | `300000` |
| staleTime | <ul><li> Time to keep the cached data fresh. Within this time interval, the data is considered fresh and the request will not be reissued</li><li> If set to `-1`, it means that the data is always fresh</li></ul> | `number` | `0`      |

## Remark

* Only successful request data will be cached
* Cached data includes `data` and `params`