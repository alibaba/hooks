import { useEffect, useMemo } from 'react';
import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/dom2';
import { getTargetElement } from '../utils/dom2';

type EventType = MouseEvent | TouchEvent;

export default function useClickAway(
  onClickAway: (event: EventType) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string = 'click',
) {
  const onClickAwayRef = useLatest(onClickAway);

  const deps = useMemo(() => {
    const targets = Array.isArray(target) ? target : [target];
    return targets.map((item) => (typeof target === 'function' ? undefined : item));
  }, [target]);

  useEffect(() => {
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
  }, [...deps, eventName]);
}
