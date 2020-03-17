import useRequest from '@umijs/use-request';
import useAntdTable from './useAntdTable';
import useAPI, { configRequest } from './useAPI';
import useAsync from './useAsync';
import useLoadMore from './useLoadMore';
import useSearch from './useSearch';
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
import usePagination from './usePagination';
import useBoolean from './useBoolean';
import useToggle from './useToggle';
import useSelections from './useSelections';
import useThrottle from './useThrottle';
import useThrottleFn from './useThrottleFn';
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
import useFormTable from './useFormTable';
import useSet from './useSet';
import usePersistFn from './usePersistFn';
import useMap from './useMap';
import useCreation from './useCreation'
import { useDrag, useDrop } from './useDrop';
import useCounter from './useCounter'
import useMount from './useMount';
import useUpdate from './useUpdate'

const useControlledValue: typeof useControllableValue = function (...args) {
  console.warn(
    'useControlledValue is deprecated and will be removed in the next major version. Please use useControllableValue instead.',
  );
  return useControllableValue(...args);
};

export {
  useAntdTable,
  useAPI,
  useAsync,
  useLoadMore,
  useSearch,
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
  configRequest,
  useUpdateEffect,
  useUpdateLayoutEffect,
  usePagination,
  useBoolean,
  useToggle,
  useSelections,
  useThrottle,
  useThrottleFn,
  useDebounce,
  useDebounceFn,
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
  useFormTable,
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
};
