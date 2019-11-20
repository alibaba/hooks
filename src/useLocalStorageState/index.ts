import useStorageState from '../useStorageState';

function useLocalStorageState<T = undefined>(key: string): [T | undefined, (value?: T) => void];
function useLocalStorageState<T>(
  key: string,
  defaultValue: T | (() => T),
): [T, (value?: T) => void];
function useLocalStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorageState(window.localStorage, key, defaultValue);
}

export default useLocalStorageState;
