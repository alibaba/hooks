/**
 * useStorageState使用缓存
 */
import useStorageState from '../useStorageState';

/**
 * 方法重载
 * @param key： key
 * 返回数组对象
 * [key， value]
 */
function useLocalStorageState<T = undefined>(
  key: string,
): [T | undefined, (value?: T | ((previousState?: T) => T)) => void];

/**
 *
 * @param key： key
 * @param defaultValue: 值
 * [key， value]
 */
function useLocalStorageState<T>(
  key: string,
  defaultValue: T | (() => T),
): [T, (value?: T | ((previousState?: T) => T)) => void];

/**
 *
 * @param key ： key
 * @param defaultValue ： 值
 * 返回: 获取对应的值 localStorage(key);
 */
function useLocalStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorageState(localStorage, key, defaultValue);
}

export default useLocalStorageState;
