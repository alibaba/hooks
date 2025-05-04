import useRafState from '../useRafState';
import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type Position = { left: number; top: number };

export type Target = BasicTarget<Element | Document>;
export type ScrollListenController = (val: Position) => boolean;

function useScroll(
  target?: Target,
  shouldUpdate: ScrollListenController = () => true,
): Position | undefined {
  const [position, setPosition] = useRafState<Position>();

  const shouldUpdateRef = useLatest(shouldUpdate);

  useEffectWithTarget(
    () => {
      const el = getTargetElement(target, document);
      if (!el) {
        return;
      }
      const updatePosition = () => {
        let newPosition: Position;
        if (el === document) {
          if (document.scrollingElement) {
            newPosition = {
              left: document.scrollingElement.scrollLeft,
              top: document.scrollingElement.scrollTop,
            };
          } else {
            // When in quirks mode, the scrollingElement attribute returns the HTML body element if it exists and is potentially scrollable, otherwise it returns null.
            // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scrollingElement
            // https://stackoverflow.com/questions/28633221/document-body-scrolltop-firefox-returns-0-only-js
            newPosition = {
              left: Math.max(
                window.pageXOffset,
                document.documentElement.scrollLeft,
                document.body.scrollLeft,
              ),
              top: Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop,
              ),
            };
          }
        } else {
          newPosition = {
            left: (el as Element).scrollLeft,
            top: (el as Element).scrollTop,
          };
        }
        if (shouldUpdateRef.current(newPosition)) {
          setPosition(newPosition);
        }
      };

      updatePosition();

      el.addEventListener('scroll', updatePosition);
      return () => {
        el.removeEventListener('scroll', updatePosition);
      };
    },
    [],
    target,
  );

  return position;
}

export default useScroll;
