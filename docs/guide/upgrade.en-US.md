## V2 to V3

Compared with the ahooks v2 version, the changes in the ahooks v3 version mainly include:

- New useRequest
- Support SSR
- Special treatment for input and output functions to avoid closure problems
- Hooks of dom support dynamic target
- Solved the problem in Strict Mode
- Solved the problem in react-refresh (HRM) mode
- Fixed known issues
- Added more Hooks

## Upgrade suggestion

We have released the `ahooks-v2` package, you can install v2 and v3 dependencies at the same time to transition upgrades.

```bash
npm install ahooks-v2 --save
npm install ahooks@next --save
```

## New useRequest

useRequest has been rewritten:

- Through plug-in organization code, the core code is extremely simple, and can easily expand more advanced capabilities.
- Provides step-by-step documentation.
- Fixed the way of exception handling, provide `run` and `runAsync`.
- The `options` parameter supports dynamic changes.
- Deleted `pagination`, `loadMore`, `formatResult` attributes, avoiding the overload of typescript, and encapsulating more advanced Hooks based on `useRequest` more conveniently.

### Detailed changes

- Deleted `UseRequestProvider`, it is recommended to encapsulate advanced Hooks based on `useRequest` instead.
- Removed `pagination` related attributes, it is recommended to use `usePagination` or `useAntdTable` to achieve paging capability.
- Removed `loadMore` related attributes, it is recommended to use `useInfiniteScroll` to achieve unlimited loading capacity.
- Removed `fetchKey`, that is, deleted concurrent request.
- Removed `formatResult`, `initialData`, `ready`, and `thrownError`.
- The request library is no longer integrated by default, and `service` no longer supports string or object.
- Added `runAsync` and `refreshAsync`, the original `run` no longer returns Promise.
- Added error retry ability.
- Added `onBefore` and `onFinally` life cycles.
- All options support dynamic changes.
- In debounce/throttling mode, `runAsync` can return current Promise.
- Debounce/throttling mode supports more parameters.
- Only successful request data will be cached.

## Support SSR

ahooks v3 fully supports SSR, and related documents can be found in "[React Hooks & SSR](/guide/blog/ssr)".

## Hooks of dom support dynamic target

Hooks of dom support dynamic target, and related documents can be found in "[Hooks of dom specification](/guide/dom)".

## Avoid closure problems

Inside ahooks, we have made special treatment for the functions input by the user and the functions returned, to avoid the closure problem as much as possible.

**The reference address of all output functions of ahooks will not change.**

```ts
const [state, setState] = React.useState();
```

As we all know, the `setState` reference address returned by `React.useState` will not change.

All functions returned in ahooks have the same characteristics as `setState`, and the reference address will not change.

```ts
const [state, { toggle }] = useToggle();
```

For example, the reference address of `toggle` function returned by `useToggle` is always stable.

**All input functions of ahooks always use the latest one.**

For the received function, ahooks will do a special process to ensure that the function called each time is always the latest.

```ts
const [state, setState] = useState();

useInterval(() => {
  console.log(state);
}, 1000);
```

For example, in the above example, the function called by `useInterval` is always the latest.

Related documents can be found in "[ahooks function specification](//guide/blog/function)".

## Support strict mode

v3 fixes some problems in strict mode. Refer to "[React Hooks & strict mode](/guide/blog/strict)"

## Support react-refresh (HRM) mode

v3 fixes some problems in react-refresh (HRM) mode. Refer to "[React Hooks & react-refresh (HMR)](/guide/blog/hmr)"

## More changes

### New Hooks

- [useRafState](/hooks/use-raf-state)
- [useAsyncEffect](/hooks/use-async-effect)
- [useDeepCompareEffect](/hooks/use-deep-compare-effect)
- [useIsomorphicLayoutEffect](/hooks/use-isomorphic-layout-effect)
- [useLatest](/hooks/use-latest)
- [usePagination](/hooks/use-pagination)
- [useLongPress](/hooks/use-long-press)
- [useInfiniteScroll](/hooks/use-infinite-scroll)

### Break Change

- useBoolean

  - `toggle` no longer accepts parameters
  - Added `set`

- useToggle

  - `toggle` no longer accepts parameters
  - Added `set`

- useSet

  - Removed `has` method, use `state.has` instead

- useCookieState

  - `setState(null)` is no longer supported to delete cookies, please use `setState(undefined)` or `setState()` instead

- useCountDown

  - Deleted the return value of `setTargetDate`, you can dynamically change `options.targetDate` to achieve the same effect

- useLocalStorageState / useSessionStorate

  - The second parameter changed from `defaultValue` to `Options`, use `options.defaultValue` instead
  - Added `options.serializer` and `options.deserializer` to support custom sequence method

- useDynamicList

  - `sortForm` was renamed to `sortList`

- useDrag & useDrop

  - API is redesigned and needs to be upgraded according to the new document

- useExternal

  - API has undergone major adjustments, please refer to the documentation
  - No longer supports image type resources
  - The resource becomes unique globally and will not be loaded repeatedly. At the same time, if there are multiple references, the resource will be deleted only after all references are unloaded

- useFullscreen

  - API has been renamed, please refer to the documentation

- useVirtualList

  - API is redesigned and needs to be upgraded according to the new document
  - Added the `data` parameter to the `options.itemHeight` parameter

- useInViewport

  - API has been upgraded, please refer to the documentation
  - Added visible ratio ability

- useScroll

  - The return value type is changed from `{left?: number, top?: number}` to `{left: number, top: number} | undefined`

- useSize

  - The return value type is changed from `{width?: number, height?: number}` to `{width: number, height: number} | undefined`

- useKeyPress

  - All aliases have been modified, please refer to the documentation

- useAntdTable

  - Removed `options.formatResult`
  - More changes are the same as useRequest

- useFusionTable

  - Removed `options.formatResult`
  - More changes are the same as useRequest

- usePersistFn was renamed to useMemoizedFn

- Deprecated the useControlledValue naming left over from 1.0, please use useControllableValue instead

### Optimization

- useUrlState

  - Support React Rouer v6

- useControllableValue

  - Optimized logic to avoid unnecessary rerennder

- More other optimizations
