import { useLayoutEffect } from 'react';
import { createDeepCompareEffect } from '../createDeepCompareEffect';

export default createDeepCompareEffect(useLayoutEffect);
