import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from '../utils/dom2';

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
