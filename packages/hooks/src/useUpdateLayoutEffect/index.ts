import { useLayoutEffect } from 'react';
import { createUpdateEffect } from '../createUpdateEffect';

/**
 * A hook alike `useLayoutEffect` but skips running the effect for the first time.
 * @see https://ahooks.js.org/hooks/use-update-layout-effect
 */
export default createUpdateEffect(useLayoutEffect);
