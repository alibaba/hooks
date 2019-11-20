import useStorageState from '../useStorageState';

function useSessionStorageState<T = undefined>(key: string): [T | undefined, (value?: T) => void];
function useSessionStorageState<T>(
  key: string,
  defaultValue: T | (() => T),
): [T, (value?: T) => void];
function useSessionStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorageState(window.sessionStorage, key, defaultValue);
}

export default useSessionStorageState;
