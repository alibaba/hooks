import type { DebounceOptions } from '../useDebounce/debounceOptions';
import useDebounceFn from '../useDebounceFn';
import { createRateLimitEffect } from '../createRateLimitHooks';

const useDebounceEffect = createRateLimitEffect(useDebounceFn);

export default useDebounceEffect;
export type { DebounceOptions };
