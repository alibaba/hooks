import { createUseStorageState } from '../createUseStorageState';
import isBrowser from '../utils/isBrowser';

const useLocalStorageState = createUseStorageState(() => (isBrowser ? localStorage : undefined));

export default useLocalStorageState;
