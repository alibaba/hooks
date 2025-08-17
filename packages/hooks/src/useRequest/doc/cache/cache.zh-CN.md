---
nav:
  path: /hooks
group:
  path: /use-request
---

# 缓存 & SWR

如果设置了 `options.cacheKey`，`useRequest` 会将当前请求成功的数据缓存起来。下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求，也就是 SWR 的能力。

你可以通过 `options.staleTime` 设置数据保持新鲜时间，在该时间内，我们认为数据是新鲜的，不会重新发起请求。

你也可以通过 `options.cacheTime` 设置数据缓存时间，超过该时间，我们会清空该条缓存数据。

接下来通过几个例子来体验缓存这些功能。

### SWR

下面的示例，我们设置了 `cacheKey`，在组件第二次加载时，会优先返回缓存的内容，然后在背后重新发起请求。你可以通过点击按钮来体验效果。

<code src="./demo/cacheKey.tsx" />

### 数据保持新鲜

通过设置 `staleTime`，我们可以指定数据新鲜时间，在这个时间内，不会重新发起请求。下面的示例设置了 5s 的新鲜时间，你可以通过点击按钮来体验效果

<code src="./demo/staleTime.tsx" />

### 数据共享

> 注意：如果没有发起新请求，不会触发数据共享。`cacheTime`、`staleTime` 参数会使数据共享失效。[#2313](https://github.com/alibaba/hooks/issues/2313)

同一个 `cacheKey` 的内容，在全局是共享的，这会带来以下几个特性：

- 请求 `Promise` 共享：相同的 `cacheKey` 同时只会有一个在发起请求，后发起的会共用同一个请求 `Promise`
- 数据同步：当某个 `cacheKey` 发起请求时，其它相同 `cacheKey` 的内容均会随之同步

下面的示例中，初始化时，两个组件只会发起一个请求。并且两篇文章的内容永远是同步的。

<code src="./demo/share.tsx" />

### 参数缓存

缓存的数据包括 `data` 和 `params`，通过 `params` 缓存机制，我们可以记忆上一次请求的条件，并在下次初始化。

下面的示例中，我们可以从缓存的 `params` 中初始化 `keyword`

<code src="./demo/params.tsx" />

### 删除缓存

ahooks 提供了一个 `clearCache` 方法，可以清除指定 `cacheKey` 的缓存数据。

<code src="./demo/clearCache.tsx" />

### 自定义缓存

通过配置 `setCache` 和 `getCache`，可以自定义数据缓存，比如可以将数据存储到 `localStorage`、`IndexDB` 等。

请注意：

1. `setCache` 和 `getCache` 需要配套使用。
2. 在自定义缓存模式下，`cacheTime` 和 `clearCache` 不会生效，请根据实际情况自行实现。

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

| 参数      | 说明                                                                                                                                                                          | 类型                              | 默认值   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | -------- |
| cacheKey  | 请求的唯一标识。相同 `cacheKey` 的数据全局同步（`cacheTime`、`staleTime` 参数会使该机制失效，见示例：[数据共享](#数据共享)）。                                                | `string`                          | -        |
| cacheTime | <ul><li> 设置缓存数据回收时间。默认缓存数据 5 分钟后回收 </li><li> 如果设置为 `-1`, 则表示缓存数据永不过期</li></ul>                                                          | `number`                          | `300000` |
| staleTime | <ul><li> 缓存数据保持新鲜时间。在该时间间隔内，认为数据是新鲜的，不会重新发请求 </li><li> 如果设置为 `-1`，则表示数据永远新鲜</li></ul>                                       | `number`                          | `0`      |
| setCache  | <ul><li> 自定义设置缓存 </li><li> `setCache` 和 `getCache` 需要配套使用</li><li> 在自定义缓存模式下，`cacheTime` 和 `clearCache` 不会生效，请根据实际情况自行实现。</li></ul> | `(data: CachedData) => void;`     | -        |
| getCache  | 自定义读取缓存                                                                                                                                                                | `(params: TParams) => CachedData` | -        |

### clearCache

```tsx | pure
import { clearCache } from 'ahooks';

clearCache(cacheKey?: string | string[]);
```

1. 支持清空单个缓存，或一组缓存
2. 如果 `cacheKey` 为空，则清空所有缓存数据

## 备注

- 只有成功的请求数据才会缓存
- 缓存的数据包括 `data` 和 `params`
