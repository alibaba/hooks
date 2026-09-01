import type { ThrottleOptions } from './throttleOptions';
import useThrottleFn from '../useThrottleFn';
import { createRateLimitValue } from '../createRateLimitHooks';

const useThrottle = createRateLimitValue(useThrottleFn);

export default useThrottle;
export type { ThrottleOptions };
