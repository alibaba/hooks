import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

export default function useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string | string[] = 'click',
) {
  const onClickAwayRef = useLatest(onClickAway);

  useEffectWithTarget(
    () => {
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

      const eventNames = Array.isArray(eventName) ? eventName : [eventName];

      eventNames.forEach((event) => document.addEventListener(event, handler));

      return () => {
        eventNames.forEach((event) => document.removeEventListener(event, handler));
      };
    },
    Array.isArray(eventName) ? eventName : [eventName],
    target,
  );
}
