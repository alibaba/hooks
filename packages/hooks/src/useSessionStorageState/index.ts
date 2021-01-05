import { createUseStorageState } from '../createUseStorageState';

const useSessionStorageState = createUseStorageState(
  typeof window === 'object' ? window.sessionStorage : null,
);

export default useSessionStorageState;
