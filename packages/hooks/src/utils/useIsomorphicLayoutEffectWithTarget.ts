import isBrowser from '../utils/isBrowser';
import useEffectWithTarget from './useEffectWithTarget';
import useLayoutEffectWithTarget from './useLayoutEffectWithTarget';

const useIsomorphicLayoutEffectWithTarget = isBrowser
  ? useLayoutEffectWithTarget
  : useEffectWithTarget;

export default useIsomorphicLayoutEffectWithTarget;
