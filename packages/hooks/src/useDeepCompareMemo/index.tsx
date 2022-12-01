import { useMemo } from 'react';
import { createDeepCompareHook } from '../createDeepCompareHook';

export default createDeepCompareHook(useMemo);
