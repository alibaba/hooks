import useStorageState from '../useStorageState';

function useSessionStorageState<T = undefined>(
  key: string,
): [T | undefined, (value?: T | ((previousState?: T) => T)) => void];

function useSessionStorageState<T>(
  key: string,
  defaultValue: T | (() => T),
): [T, (value?: T | ((previousState: T) => T)) => void];

function useSessionStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorageState(() => sessionStorage, key, defaultValue);
}

export default useSessionStorageState;
