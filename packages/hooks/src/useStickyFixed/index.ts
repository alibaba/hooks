import { useRef } from 'react';
import { getTargetElement, type BasicTarget } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';
import useRafState from '../useRafState';

function useStickyFixed(
  target: BasicTarget<Element>,
  options?: {
    scrollTarget?: BasicTarget<Element | Document>;
  },
): [boolean] {
  const { scrollTarget } = options || {};

  const [state, setState] = useRafState<boolean>(false);
  const lastTopRef = useRef(0);

  useEffectWithTarget(
    () => {
      const scrollElement = getTargetElement(scrollTarget, document);
      if (!scrollElement) {
        return;
      }

      const stickyElement = getTargetElement(target);
      if (!stickyElement) {
        return;
      }

      const handleScroll = () => {
        const rect = stickyElement.getBoundingClientRect();
        const currentTop = rect.top;
        const lastTop = lastTopRef.current;
        setState(currentTop === lastTop);
        lastTopRef.current = currentTop;
      };

      scrollElement.addEventListener('scroll', handleScroll);
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
      };
    },
    [],
    target,
  );

  return [state];
}
export default useStickyFixed;
