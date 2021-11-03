import { createUseStorageState } from '../createUseStorageState';
import { isBrowser } from '../utils/dom2';

const useLocalStorageState = createUseStorageState(() => (isBrowser ? localStorage : undefined));

export default useLocalStorageState;
