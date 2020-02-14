import useStorageState from '../useStorageState';

/**
 * SessionStorageState
 * @param key : 获取对应key
 * 返回值： [state, updateState];
 */
function useSessionStorageState<T = undefined>(
  key: string,
): [T | undefined, (value?: T | ((previousState?: T) => T)) => void];

/**
 *
 * @param key : 缓存对应的key
 * @param defaultValue : 对应的值
 */
function useSessionStorageState<T>(
  key: string,
  defaultValue: T | (() => T),
): [T, (value?: T | ((previousState?: T) => T)) => void];

function useSessionStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorageState(sessionStorage, key, defaultValue);
}

export default useSessionStorageState;
