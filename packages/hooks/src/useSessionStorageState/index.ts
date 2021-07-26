import { createUseStorageState } from '../createUseStorageState';
import { isBrowser } from '../utils/dom2';

const useSessionStorageState = createUseStorageState(() =>
  isBrowser ? sessionStorage : undefined,
);

export default useSessionStorageState;
