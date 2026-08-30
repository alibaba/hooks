import { useLayoutEffect } from 'react';
import isBrowser from '../utils/isBrowser';
import noop from '../utils/noop';

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : noop;

export default useIsomorphicLayoutEffect;
