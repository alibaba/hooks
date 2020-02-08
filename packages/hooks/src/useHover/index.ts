import { MutableRefObject, useEffect, useRef } from 'react';
import useBoolean from '../useBoolean';

export interface Options<T> {
  dom?: T | (() => T) | null;
  onEnter?: () => void;
  onLeave?: () => void;
}

export default <T extends HTMLElement = HTMLElement>(
  options?: Options<T>,
): [boolean | undefined, MutableRefObject<T>?] => {
  const { dom, onEnter, onLeave } = options || {};

  const element = useRef<T>(null);

  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  const onLeaveRef = useRef(onLeave);
  onLeaveRef.current = onLeave;

  const { state, setTrue, setFalse } = useBoolean(false);

  useEffect(() => {
    const onMouseEnter = () => {
      if (onEnterRef.current) onEnterRef.current();
      setTrue();
    };
    const onMouseLeave = () => {
      if (onLeaveRef.current) onLeaveRef.current();
      setFalse();
    };
    const passedInElement = typeof dom === 'function' ? dom() : dom;
    // 如果 传入dom
    if (passedInElement) {
      passedInElement.addEventListener('mouseenter', onMouseEnter);
      passedInElement.addEventListener('mouseleave', onMouseLeave);
      return () => {
        passedInElement.removeEventListener('mouseenter', onMouseEnter);
        passedInElement.removeEventListener('mouseleave', onMouseLeave);
      };
    }
    const node = element.current;
    if (node) {
      node.addEventListener('mouseenter', onMouseEnter);
      node.addEventListener('mouseleave', onMouseLeave);
      return () => {
        node.removeEventListener('mouseenter', onMouseEnter);
        node.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, [element.current, typeof dom === 'function' ? undefined : dom]);

  if (dom) {
    return [!!state];
  }

  return [!!state, element as MutableRefObject<T>];
};
