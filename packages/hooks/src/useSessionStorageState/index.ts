import { createUseStorageState } from '../createUseStorageState';
import isBrowser from '../utils/isBrowser';

/**
 * A Hook for store state into sessionStorage.
 * @see https://ahooks.js.org/hooks/use-session-storage-state
 */
const useSessionStorageState = createUseStorageState(() =>
  isBrowser ? sessionStorage : undefined,
);

export default useSessionStorageState;
