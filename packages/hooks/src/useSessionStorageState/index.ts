import { createUseStorageState } from '../createUseStorageState';

// function useSessionStorageState<T = undefined>(
//   key: string,
// ): [T | undefined, (value?: T | ((previousState?: T) => T)) => void];

// function useSessionStorageState<T>(
//   key: string,
//   defaultValue: T | (() => T),
// ): [T, (value?: T | ((previousState: T) => T)) => void];

// function useSessionStorageState<T>(key: string, defaultValue?: T | (() => T)) {
//   return useStorageState(() => sessionStorage, key, defaultValue);
// }

const useSessionStorageState = createUseStorageState(
  typeof window === 'object' ? window.sessionStorage : null,
);

export default useSessionStorageState;
