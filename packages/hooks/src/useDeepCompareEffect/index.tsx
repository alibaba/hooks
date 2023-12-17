import { useEffect } from 'react';
import { createDeepCompareEffect } from '../createDeepCompareEffect';

/**
 * Usage is the same as `useEffect`, but deps are compared with [lodash.isEqual](https://lodash.com/docs/4.17.15#isEqual).
 * @see https://ahooks.js.org/hooks/use-deep-compare-effect
 */
export default createDeepCompareEffect(useEffect);
