# Umi Hooks to ahooks

ahooks is version 2.0 of Umi Hooks. This document will help you quickly upgrade from Umi Hooks to ahooks.

## Upgrade overview

- Added 3 Hooks
- 6 abandoned Hooks in Umi Hooks were deleted
- Formulated [API specification](/docs/api), upgraded the Hooks API
- All DOM class Hooks no longer return ref
- Some Hooks are incompatible with upgrades

## Upgrade details

### Add

- Added [useFusionTable](/hooks/table/use-fusion-table)
- Added [useDebounceEffect](/hooks/life-cycle/use-debounce-effect)
- Added [useThrottleEffect](/hooks/life-cycle/use-throttle-effect)

### Delete
The deleted 6 Hooks can be replaced by useRequest

- Deleted useLoadMore
- Deleted useAntdTable
- Deleted useAPI
- Deleted useAsync
- Deleted usePagination
- Deleted useSearch

### Other

- useFormTable
   - Rename to useAntdTable
- useRequest
   - Built-in request Library from `umi-request` Became `fetch`
   - Added `options.ready` Configuration, can easily implement dependency requests
   - Added `options.throwOnError`Configuration
   - Change the Provider name from `UseAPIProvider` to `UseRequestProvider`
- useDebounce
   - Based on `lodash.debounce` Implementation, support more parameters
- useDebounceFn
   - Based on `lodash.debounce` Implementation, support more parameters
   - Deleted `deps` Parameter
- useThrottle
   - Based on `lodash.throttle` Implementation, support more parameters
- useThrottleFn
   - Based on `lodash.throttle` Implementation, support more parameters
   - Deleted `deps` Parameter
- useBoolean
   - API upgrade
- useToggle
   - API upgrade
- useEventTarget
   - API upgrade
- useDocumentVisibility
   - If the document does not exist, the return value is from `true` Into `undefined`
- useSize
   - API upgrade, and no longer return ref
- useScroll
   - API upgrade, and no longer return ref
- useTextSelection
   - API upgrade, and no longer return ref
- useInViewport
   - API upgrade, and no longer return ref
- useFullscreen
   - API upgrade, and no longer return ref
- useEventListener
   - API upgrade, and no longer return ref
- useClickAway
   - API upgrade, and no longer return ref
- useHover
   - API upgrade, and no longer return ref 
- useKeyPress
   - API upgrade, and no longer return ref
