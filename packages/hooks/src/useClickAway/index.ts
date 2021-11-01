import { useMemo } from 'react';
import useDeepCompareEffect from '../useDeepCompareEffect';
import useLatest from '../useLatest';
import { getTargetElement } from '../utils/dom2';
import type { BasicTarget } from '../utils/dom2';

export default function useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string = 'click',
) {
  const onClickAwayRef = useLatest(onClickAway);

  const deps = useMemo(() => {
    const targets = Array.isArray(target) ? target : [target];
    return targets.map((item) => (typeof target === 'function' ? undefined : item));
  }, [target]);

  useDeepCompareEffect(() => {
    const handler = (event: any) => {
      const targets = Array.isArray(target) ? target : [target];
      if (
        targets.some((item) => {
          const targetElement = getTargetElement(item);
          return !targetElement || targetElement?.contains(event.target);
        })
      ) {
        return;
      }
      onClickAwayRef.current(event);
    };

    document.addEventListener(eventName, handler);

    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [deps, eventName]);
}
