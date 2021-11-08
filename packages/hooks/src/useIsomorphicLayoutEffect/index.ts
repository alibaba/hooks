import { useEffect, useLayoutEffect } from 'react';
import isBrowser from '../utils/isBrowser';

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
