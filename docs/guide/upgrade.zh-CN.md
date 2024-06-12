## v2 to v3

相较于 ahooks v2 版本，ahooks v3 版本的变更主要包括：

- 全新的 `useRequest`
- 全面支持 SSR
- 对输入输出函数做特殊处理，避免闭包问题
- DOM 类 Hooks 支持 target 动态变化
- 解决了在严格模式（Strict Mode）下的问题
- 解决了在 react-refresh（HMR）模式下的问题
- 修复了已知问题
- 新增了更多的 Hooks

## 升级建议

我们发布了 `ahooks-v2` 包，你可以同时安装 v2 和 v3 依赖，以过渡升级。

```bash
npm install ahooks-v2 --save
npm install ahooks --save
```

## 全新的 useRequest

useRequest 完全进行了重写：

- 通过插件式组织代码，核心代码极其简单，可以很方便的扩展出更高级的能力。
- 提供了循序渐进的文档。
- 彻底修复了异常处理方式，提供了 `run` 和 `runAsync` 两种触发函数。
- `options` 参数支持动态变化。
- 删除了 `pagination`、`loadMore`、`formatResult` 属性，避免了 `useRequest` TypeScript 重载，可以更方便的基于 `useRequest` 封装更高级的 Hooks。

### 详细变更

- 删除了 `UseRequestProvider`，建议自行基于 `useRequest` 封装高级 Hooks 来代替。
- 删除了 `pagination` 相关属性，建议使用 `usePagination` 或 `useAntdTable` 来实现分页能力。
- 删除了 `loadMore` 相关属性，建议使用 `useInfiniteScroll` 来实现无限加载能力。
- 删除了 `fetchKey`，也就是删除了并行能力。
- 删除了 `formatResult`、`initialData`、`throwOnError`。
- 不再默认集成请求库，`service` 不再支持字符或对象。
- 新增了 `runAsync` 和 `refreshAsync`，原来的 `run` 不再返回 Promise。
- 新增了错误重试能力。
- 新增了 `onBefore`、`onFinally` 生命周期。
- 新增了缓存清理能力。
- 所有参数支持动态变化。
- 防抖/节流模式下，`runAsync` 可以返回正常 Promise。
- 防抖/节流支持更多参数。
- 只有成功的请求数据才会缓存。
- `ready` 行为升级

[被删除的参数如何兼容？](#userequest-被删除的能力如何兼容)

## SSR 支持

ahooks v3 全面支持 SSR，相关文档可见《[React Hooks & SSR](/zh-CN/guide/blog/ssr)》。

## DOM 类 Hooks 支持 target 动态变化

DOM 类 Hooks 支持 target 动态变化，相关文档可见《[DOM 类 Hooks 使用规范](/zh-CN/guide/dom)》

## 避免闭包问题

ahooks v3 通过对输入输出函数做特殊处理，尽力帮助大家避免闭包问题。

**所有的输出函数，地址是不会变化的。**

```ts
const [state, setState] = React.useState();
```

大家熟知的`React.useState`返回的 `setState` 函数，地址是不会变化的。

v3 所有 Hooks 返回的函数，也有和 `setState` 一样的特性，地址不会变化。

```ts
const [state, { toggle }] = useToggle();
```

比如 `useToggle` 返回的 `toggle` 函数，地址就是永远固定的。

**所有的输入函数，永远使用最新的一份。**

对于接收的函数，v3 会做一次特殊处理，保证每次调用的函数永远是最新的。

```ts
const [state, setState] = useState();

useInterval(() => {
  console.log(state);
}, 1000);
```

比如以上示例，`useInterval` 调用的函数永远是最新的。

相关文档可见《[ahooks 输入输出函数处理规范](/zh-CN/guide/blog/function)》。

## 支持严格模式

v3 修复了在严格模式下的一些问题。参考《[React Hooks & strict mode](/zh-CN/guide/blog/strict)》

## 支持 react-refresh（HMR）模式

v3 修复了在 react-refresh（HMR）模式下的一些问题。参考《[React Hooks & react-refresh（HMR）](/zh-CN/guide/blog/hmr)》

## 更多变更

### 新增 Hooks

- [useRafState](/zh-CN/hooks/use-raf-state)
- [useSetState](/zh-CN/hooks/use-set-state)
- [useAsyncEffect](/zh-CN/hooks/use-async-effect)
- [useDeepCompareEffect](/zh-CN/hooks/use-deep-compare-effect)
- [useIsomorphicLayoutEffect](/zh-CN/hooks/use-isomorphic-layout-effect)
- [useLatest](/zh-CN/hooks/use-latest)
- [usePagination](/zh-CN/hooks/use-pagination)
- [useLongPress](/zh-CN/hooks/use-long-press)
- [useInfiniteScroll](/zh-CN/hooks/use-infinite-scroll)

### Breaking Changes

- useBoolean

  - `toggle` 不再接收参数
  - 增加了 `set`

- useToggle

  - `toggle` 不再接收参数
  - 增加了 `set`

- useSet

  - 删除了 `has` 方法，使用 `state.has` 代替

- useCookieState

  - 不再支持 `setState(null)` 删除 Cookie，请使用 `setState(undefined)` 或 `setState()` 替代

- useCountDown

  - 删除了 `setTargetDate` 返回值，可以动态改变 `options.targetDate` 实现相同效果

- useLocalStorageState / useSessionStorageState

  - 第二个参数从 `defaultValue` 变为了 `Options`，使用 `options.defaultValue` 代替
  - 增加了 `options.serializer` 和 `options.deserializer`，支持自定义序列法方法

- useDynamicList

  - `sortForm` 改名为 `sortList`

- useDrag & useDrop

  - API 重新设计，需要对照新的文档做升级

- useExternal

  - API 进行了比较大的调整，请查阅文档
  - 不再支持图片类型资源
  - 资源在全局变成唯一的，不会重复加载，同时如果有多处引用，只有等全部引用卸载之后，才会删除该资源

- useFullscreen

  - API 进行了重命名，请查阅文档

- useVirtualList

  - API 重新设计，需要对照新的文档做升级
  - `options.itemHeight` 函数型参数增加了 `data` 参数

- useInViewport

  - API 进行了升级，请查阅文档
  - 增加了可见比例能力

- useScroll

  - 返回值类型从 `{ left?: number, top?: number }` 改为 `{ left: number, top: number } | undefined`

- useSize

  - 返回值类型从 `{ width?: number, height?: number }` 改为 `{ width: number, height: number } | undefined`

- useKeyPress

  - 修改了所有别名，请查阅文档

- useAntdTable

  - 删除了 `options.formatResult`
  - 更多变更同 useRequest

- useFusionTable

  - 删除了 `options.formatResult`
  - 更多变更同 useRequest

- usePersistFn 更名为 useMemoizedFn

- 废弃了 1.0 遗留的 useControlledValue 命名，请使用 useControllableValue 代替

### 优化

- useUrlState

  - 支持了 React Router v6

- useControllableValue

  - 优化了代码逻辑，避免了不必要的 re-render

- 更多其它优化

## FAQ

### useRequest 被删除的能力如何兼容？

新版 useRequest 只做 Promise 管理的底层能力，更多高级能力可以基于 useRequest 封装高级 Hooks 来支持。

1. 原 `options.formatResult` 删除，期望 service 返回最终格式的数据。比如：

```ts
const { data } = useRequest(async () => {
  const result = await getData();
  return result.data;
});
```

2. 原 `options.fetchKey` 并行模式删除，期望将每个请求动作和 UI 封装为一个组件，而不是把所有请求都放到父级。

3. 原 `options.initialData` 删除，可以这样做

```ts
const { data = initialData } = useRequest(getData);
```

4. 不再默认集成请求库，`service` 不再支持字符或对象。期望基于 useReqeust 封装高级 Hooks 来支持。比如：

```ts
const useCustomHooks = (pathname, options) => {
  return useRequest(() => {
    return axios(pathname);
  }, options);
};
```
