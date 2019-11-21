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
import useDebounce from './useDebounce';
import useDebounceFn from './useDebounceFn';
import usePrevious from './usePrevious';
import useMouse from './useMouse';
import useClickAway from './useClickAway';

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
  useDebounce,
  useDebounceFn,
  usePrevious,
  useMouse,
  useClickAway,
};
