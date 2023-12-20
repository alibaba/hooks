import { createUseStorageState } from '../createUseStorageState';
import isBrowser from '../utils/isBrowser';

/**
 * A Hook that store state into localStorage.
 * @see https://ahooks.js.org/hooks/use-local-storage-state
 */
const useLocalStorageState = createUseStorageState(() => (isBrowser ? localStorage : undefined));

export default useLocalStorageState;
