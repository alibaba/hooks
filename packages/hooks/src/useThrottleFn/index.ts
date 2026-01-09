import throttle from 'lodash/throttle';
import type { ThrottleOptions } from '../useThrottle/throttleOptions';
import { createRateLimitFn } from '../createRateLimitHooks';

type noop = (...args: any[]) => any;

const useThrottleFn = createRateLimitFn<noop>(throttle, 'useThrottleFn');

export default useThrottleFn;
export type { ThrottleOptions };
