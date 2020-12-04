import { createUseStorageState } from '../createUseStorageState';

// function useLocalStorageState<T = undefined>(
//   key: string,
// ): [T | undefined, (value?: T | ((previousState?: T) => T)) => void];

// function useLocalStorageState<T>(
//   key: string,
//   defaultValue: T | (() => T),
// ): [T, (value?: T | ((previousState: T) => T)) => void];

// function useLocalStorageState<T>(key: string, defaultValue?: T | (() => T)) {
//   return useStorageState(() => localStorage, key, defaultValue);
// }

const useLocalStorageState = createUseStorageState(
  typeof window === 'object' ? window.localStorage : null,
);

export default useLocalStorageState;
