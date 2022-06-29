import { createUseStorageState } from '../createUseStorageState';
import isBrowser from '../utils/isBrowser';

const useSessionStorageState = createUseStorageState(() =>
  isBrowser ? sessionStorage : undefined,
);

export default useSessionStorageState;
