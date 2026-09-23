import type { ThrottleOptions } from '../useThrottle/throttleOptions';
import useThrottleFn from '../useThrottleFn';
import { createRateLimitEffect } from '../createRateLimitHooks';

const useThrottleEffect = createRateLimitEffect(useThrottleFn);

export default useThrottleEffect;
export type { ThrottleOptions };
