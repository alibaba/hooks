---
nav:
  path: /hooks
group:
  path: /use-request
---

# 清除缓存

通过调用 `clearCache` 来清除指定的缓存数据。

`clearCache` 最多接收一个参数，`cacheKey: string` 或者 `cacheKeys: string[]`。

你也可以不传参来清空所有缓存数据。

```tsx | pure
import { clearCache } from 'ahooks';

clearCache(cacheKey);
clearCache(cacheKeys)
clearCache();
```

下面的示例，我们设置了不同的 `cacheKey`，在组件第二次加载时，会优先返回缓存的内容，然后在背后重新发起请求。你可以通过点击按钮来清除指定的缓存。

<code src="./demo/clear.tsx" />

## API

### Options

| 参数      | 说明                                                                                                                                    | 类型     | 默认值   |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------|----------|----------|
| cacheKey  | 请求唯一标识。如果设置了 `cacheKey`，我们会启用缓存机制。同一个 `cacheKey` 的数据全局同步。                                                 | `string` | `[]`     |
