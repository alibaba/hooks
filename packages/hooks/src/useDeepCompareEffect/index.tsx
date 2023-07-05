import { useEffect } from 'react';
import { createDeepCompareEffect } from '../createDeepCompareEffect';

// 将高阶函数执行一次，导出内部修改过依赖项的hooks函数
export default createDeepCompareEffect(useEffect);
