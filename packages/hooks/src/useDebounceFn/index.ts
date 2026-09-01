import { debounce } from '../utils/lodash-polyfill';
import type { DebounceOptions } from '../useDebounce/debounceOptions';
import { createRateLimitFn } from '../createRateLimitHooks';

type noop = (...args: any[]) => any;

const useDebounceFn = createRateLimitFn<noop, DebounceOptions>(debounce, 'useDebounceFn');

export default useDebounceFn;
export type { DebounceOptions };
