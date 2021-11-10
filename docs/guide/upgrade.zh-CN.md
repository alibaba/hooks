## V2 to V3

相较于 ahooks v2 版本，ahooks v3 版本的变更主要包括：

- 全新的 useRequest
- 全面支持 SSR
- 对输入输出函数做特殊处理，避免闭包问题
- DOM 类 Hooks 支持 target 动态变化
- 解决了在严格模式（Strict Mode）下的问题
- 解决了在 react-refresh（HRM）模式下的问题
- 修复了更多已知问题
- 新增了更多的 Hooks

## 全新的 useRequest

useRequest 完全进行了重写：

- 通过插件式组织代码，核心代码极其简单，可以很方便的扩展出更高级的能力。
- 提供了循序渐进的文档。
- 彻底修复了异常处理方式，提供了 `run` 和 `runAsync` 两种触发函数。
- `options` 参数支持动态变化。
- 删除了 `pagination`、`loadMore`、`formatResult` 属性，避免了 `useRequest` typescript 重载，可以更方便的基于 `useRequest` 封装更高级的 Hooks。

### 详细变更

- 删除了 `UseRequestProvider`，建议自行基于 `useRequest` 封装高级 Hooks 来代替。
- 删除了 `pagination` 相关属性，建议使用 `usePagination` 或 `useAntdTable` 来实现分页能力。
- 删除了 `loadMore` 相关属性，建议使用 `useInfiniteScroll` 来实现无限加载能力。
- 删除了 `fetchKey`，也就是删除了并行能力。
- 删除了 `formatResult`、`initialData`、`ready`、`thrownError`。
- 不再默认集成请求库，`service` 不再支持字符换或对象。

- 新增了错误重试能力。
- 新增了 `onBefore`、`onFinally` 生命周期。
- 新增了 `runAsync` 和 `refreshAsync`。
- 所有参数支持动态变化。
- 防抖/节流模式下，`runAsync` 可以返回正常 Promise。
- 只有成功的请求数据才会缓存。

## SSR 支持

ahooks v3 全面支持 SSR，相关文档可见《[React Hooks 在 SSR 模式下常见问题及解决方案](/zh-CN/guide/blog/ssr)》。

## DOM 类 Hooks 支持 target 动态变化

DOM 类 Hooks 支持 target 动态变化，相关文档可见《[Dom 类 Hooks 使用规范](zh-CN/guide/dom)》

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

v3 修复了在严格模式下的一些问题。参考《[React Hooks 在严格模式下的常见问题和解决方案](/zh-CN/guide/blog/strict)》

## 支持 react-refresh（HRM）模式

v3 修复了在 react-refresh（HRM）模式下的一些问题。参考《[React Hooks 在 react-refresh（HMR）模式下常见问题及解决方案](/zh-CN/guide/blog/hmr)》

## 更多变更

### 新增 Hooks

- useRafState
- useAsyncEffect
- useDeepCompareEffect
- useIsomorphicLayoutEffect
- useLatest
- usePagination
- useLongPress
- useInfiniteScroll

### Break Change

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

- useLocalStorageState / useSessionStorate

  - 第二个参数从 `defaultValue` 变为了 `Options`，使用 `options.defaultValue` 代替

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

- useInViewport

  - API 进行了升级，请查阅文档
  - 增加了可见比例能力

- useScroll

  - 返回值类型从 `{left?: number, top?: number}` 改为 `{left: number, top: number} | undefined`

- useSize

  - 返回值类型从 `{width?: number, height?: number}` 改为 `{width: number, height: number} | undefined`

- useKeyPress

  - 修改了所有别名，请查阅文档

- useAntdTable

  - 删除了 `options.formatResult`

- useFusionTable

  - 删除了 `options.formatResult`

- usePersistFn 更名为 useMemoizedFn

- 废弃了 1.0 遗留的 useControlledValue 命名，请使用 useControllableValue 代替

### 优化

- useControllableValue

  - 受控模式下，不再维护内部状态，避免额外的 rerender

- useLocalStorageState / useSessionStorate

  - 增加了 `options.serializer` 和 `options.deserializer`，支持自定义序列法方法

- useVirtualList
  - `options.itemHeight` 参数增加了 `data` 参数
