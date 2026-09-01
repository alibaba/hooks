import type { DebounceOptions } from './debounceOptions';
import useDebounceFn from '../useDebounceFn';
import { createRateLimitValue } from '../createRateLimitHooks';

const useDebounce = createRateLimitValue(useDebounceFn);

export default useDebounce;
export type { DebounceOptions };
