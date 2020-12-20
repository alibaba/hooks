import useRequest, { UseRequestProvider } from '@ahooksjs/use-request';
import useControllableValue from './useControllableValue';
import useDynamicList from './useDynamicList';
import useEventEmitter from './useEventEmitter';
import useVirtualList from './useVirtualList';
import { configResponsive, useResponsive } from './useResponsive';
import useSize from './useSize';
import useLocalStorageState from './useLocalStorageState';
import useSessionStorageState from './useSessionStorageState';
import useUpdateEffect from './useUpdateEffect';
import useUpdateLayoutEffect from './useUpdateLayoutEffect';
import useBoolean from './useBoolean';
import useToggle from './useToggle';
import useDocumentVisibility from './useDocumentVisibility';
import useSelections from './useSelections';
import useThrottle from './useThrottle';
import useThrottleFn from './useThrottleFn';
import useThrottleEffect from './useThrottleEffect';
import useDebounce from './useDebounce';
import useDebounceFn from './useDebounceFn';
import usePrevious from './usePrevious';
import useMouse from './useMouse';
import useScroll from './useScroll';
import useClickAway from './useClickAway';
import useFullscreen from './useFullscreen';
import useInViewport from './useInViewport';
import useKeyPress from './useKeyPress';
import useEventListener from './useEventListener';
import useHover from './useHover';
import useUnmount from './useUnmount';
import useAntdTable from './useAntdTable';
import useFusionTable from './useFusionTable';
import useSet from './useSet';
import usePersistFn from './usePersistFn';
import useMap from './useMap';
import useCreation from './useCreation';
import useDrop from './useDrop';
import useDrag from './useDrag';
import useMount from './useMount';
import useTextSelection from './useTextSelection';
import useCounter from './useCounter';
import useUpdate from './useUpdate';
import useEventTarget from './useEventTarget';
import useHistoryTravel from './useHistoryTravel';
import useDebounceEffect from './useDebounceEffect';
import useCookieState from './useCookieState';
import useSetState from './useSetState';
import useInterval from './useInterval';
import useWhyDidYouUpdate from './useWhyDidYouUpdate';
import useTitle from './useTitle';
import useNetwork from './useNetwork';
import useTimeout from './useTimeout';
import useReactive from './useReactive';
import useFavicon from './useFavicon';
import useCountDown from './useCountDown';
import useWebSocket from './useWebSocket';
import useLockFn from './useLockFn';
import useTrackedEffect from './useTrackedEffect';
import useUnmountedRef from './useUnmountedRef';
import useExternal from './useExternal';

const useControlledValue: typeof useControllableValue = function (...args) {
  console.warn(
    'useControlledValue is deprecated and will be removed in the next major version. Please use useControllableValue instead.',
  );
  return useControllableValue(...args);
};

export {
  useControlledValue,
  useControllableValue,
  useDynamicList,
  useVirtualList,
  useResponsive,
  useEventEmitter,
  useLocalStorageState,
  useSessionStorageState,
  useSize,
  configResponsive,
  useUpdateEffect,
  useUpdateLayoutEffect,
  useBoolean,
  useToggle,
  useDocumentVisibility,
  useSelections,
  useThrottle,
  useThrottleFn,
  useThrottleEffect,
  useDebounce,
  useDebounceFn,
  useDebounceEffect,
  usePrevious,
  useMouse,
  useScroll,
  useClickAway,
  useFullscreen,
  useInViewport,
  useKeyPress,
  useEventListener,
  useHover,
  useRequest,
  UseRequestProvider,
  useAntdTable,
  useUnmount,
  useSet,
  usePersistFn,
  useMap,
  useCreation,
  useDrag,
  useDrop,
  useMount,
  useCounter,
  useUpdate,
  useTextSelection,
  useEventTarget,
  useHistoryTravel,
  useFusionTable,
  useCookieState,
  useSetState,
  useInterval,
  useWhyDidYouUpdate,
  useTitle,
  useNetwork,
  useTimeout,
  useReactive,
  useFavicon,
  useCountDown,
  useTrackedEffect,
  useWebSocket,
  useLockFn,
  useUnmountedRef,
  useExternal,
};
