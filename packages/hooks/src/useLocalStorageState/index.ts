import { createUseStorageState } from '../createUseStorageState';

const useLocalStorageState = createUseStorageState(
  typeof window === 'object' ? window.localStorage : null,
);

export default useLocalStorageState;
