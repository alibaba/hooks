import { useLayoutEffect } from 'react';
import { createDeepCompareEffect } from '../createDeepCompareEffect';

/**
 * Usage is the same as `useLayoutEffect`, but deps are compared with [lodash.isEqual](https://lodash.com/docs/4.17.15#isEqual).
 * @see https://ahooks.js.org/hooks/use-deep-compare-layout-effect
 */
export default createDeepCompareEffect(useLayoutEffect);
