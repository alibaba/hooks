import { useRef, useMemo } from 'react';
import useDeepCompareEffect from '../useDeepCompareEffect';
import useLatest from '../useLatest';
import { getTargetElement } from '../utils/dom2';
import type { BasicTarget } from '../utils/dom2';

type EventType = MouseEvent | TouchEvent;

function useLongPress(
  onLongPress: (enent: EventType) => void,
  target: BasicTarget | BasicTarget[],
  delay: number,
) {
  const onClickAwayRef = useLatest(onLongPress);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  let startTime = 0;
  let endTime = 0;

  const deps = useMemo(() => {
    const targets = Array.isArray(target) ? target : [target];
    return targets.map((item) => (typeof target === 'function' ? undefined : item));
  }, [target]);

  useDeepCompareEffect(() => {
    document.addEventListener('mousedown', (e) => {
      e.preventDefault();

      startTime = Date.now();
      timer.current = setTimeout(() => onClickAwayRef.current(e), delay);
    });

    document.addEventListener('mouseup', (e) => {
      e.preventDefault();
      endTime = Date.now();
      if (endTime - startTime < delay) {
        clearTimeout(timer.current!);
      }
    });
  }, [deps]);
}

export default useLongPress;
