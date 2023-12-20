import { useEffect } from 'react';
import { createUpdateEffect } from '../createUpdateEffect';

/**
 * A hook alike `useEffect` but skips running the effect for the first time.
 * @see https://ahooks.js.org/hooks/use-update-effect
 */
export default createUpdateEffect(useEffect);
