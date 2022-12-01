import { useLayoutEffect } from 'react';
import { createDeepCompareHook } from '../createDeepCompareHook';

export default createDeepCompareHook(useLayoutEffect);
