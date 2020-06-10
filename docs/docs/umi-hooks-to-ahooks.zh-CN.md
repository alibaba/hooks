# 从 Umi Hooks 到 ahooks

ahooks 是 Umi Hooks 的 2.0 版本，本文档将帮助你快速的从 Umi Hooks 升级到 ahooks。

## 升级概览

- 新增了 3 个 Hooks
- 删除了 Umi Hooks 中废弃的 6 个 Hooks
- 制定了 [API 规范](/zh-CN/docs/api)，对 Hooks 进行了 API 升级
- 所有的 DOM 类 Hooks 不再返回 ref
- 部分 Hooks 不兼容升级

## 升级详情

### 新增

- 新增了 [useFusionTable](/zh-CN/hooks/table/use-fusion-table)
- 新增了 [useDebounceEffect](/zh-CN/hooks/life-cycle/use-debounce-effect)
- 新增了 [useThrottleEffect](/zh-CN/hooks/life-cycle/use-throttle-effect)

### 删除

删除的 6 个 Hooks 可以用 useRequest 代替

- 删除了 useLoadMore
- 删除了 useAntdTable
- 删除了 useAPI
- 删除了 useAsync
- 删除了 usePagination
- 删除了 useSearch

### 其它
- useFormTable
   - 重命名为 useAntdTable
- useRequest
   - 内置请求库从 `umi-request` 变成了 `fetch` 
   - 增加了 `options.ready` 配置，可以方便的实现依赖请求
   - 增加了 `options.throwOnError` 配置
   - Provider 从 `UseAPIProvider` 改名为 `UseRequestProvider` 
- useDebounce
   - 基于 `lodash.debounce` 实现，支持更多参数
- useDebounceFn
   - 基于 `lodash.debounce` 实现，支持更多参数
   - 删除了 `deps` 参数
- useThrottle
   - 基于 `lodash.throttle` 实现，支持更多参数
- useThrottleFn
   - 基于 `lodash.throttle` 实现，支持更多参数
   - 删除了 `deps` 参数
- useBoolean
   - API 升级
- useToggle
   - API 升级
- useEventTarget
   - API 升级
- useDocumentVisibility
   - 如果 document 不存在，返回值从 `true` 变为 `undefined`
- useSize
   - API 升级，同时不再返回 `ref`
- useScroll
   - API 升级，同时不再返回 `ref` 
- useTextSelection
   - API 升级，同时不再返回 `ref` 
- useInViewport
   - API 升级，同时不再返回 `ref`
- useFullscreen
   - API 升级，同时不再返回 `ref` 
- useEventListener
   - API 升级，同时不再返回 `ref`
- useClickAway
   - API 升级，同时不再返回 `ref` 
- useHover
   - API 升级，同时不再返回 `ref` 
- useKeyPress
   - API 升级，同时不再返回 `ref` 
