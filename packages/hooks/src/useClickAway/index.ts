import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import getDocumentOrShadow from '../utils/getDocumentOrShadow';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type DocumentEventKey = keyof DocumentEventMap;

export type UseClickAwayEventName = DocumentEventKey | DocumentEventKey[];

export interface UseClickAwayOptions {
  eventName?: UseClickAwayEventName;
  /** Whether the away listener is active. Defaults to `true`. */
  enabled?: boolean;
}

const normalizeOptions = (
  options: UseClickAwayEventName | UseClickAwayOptions,
): Required<Pick<UseClickAwayOptions, 'eventName' | 'enabled'>> => {
  if (typeof options === 'string' || Array.isArray(options)) {
    return { eventName: options, enabled: true };
  }
  return {
    eventName: options.eventName ?? 'click',
    enabled: options.enabled ?? true,
  };
};

const useClickAway = <T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: BasicTarget | BasicTarget[],
  eventNameOrOptions: UseClickAwayEventName | UseClickAwayOptions = 'click',
) => {
  const onClickAwayRef = useLatest(onClickAway);
  const { eventName, enabled } = normalizeOptions(eventNameOrOptions);

  useEffectWithTarget(
    () => {
      if (!enabled) {
        return;
      }

      const handler = (event: any) => {
        const targets = Array.isArray(target) ? target : [target];
        if (
          targets.some((item) => {
            const targetElement = getTargetElement(item);
            return !targetElement || targetElement.contains(event.target);
          })
        ) {
          return;
        }
        onClickAwayRef.current(event);
      };

      const documentOrShadow = getDocumentOrShadow(target);

      const eventNames = Array.isArray(eventName) ? eventName : [eventName];

      eventNames.forEach((event) => {
        documentOrShadow.addEventListener(event, handler);
      });

      return () => {
        eventNames.forEach((event) => {
          documentOrShadow.removeEventListener(event, handler);
        });
      };
    },
    [...(Array.isArray(eventName) ? eventName : [eventName]), enabled],
    target,
  );
};

export default useClickAway;
