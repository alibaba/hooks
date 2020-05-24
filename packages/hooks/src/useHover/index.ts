import { useEffect, useRef } from 'react';
import useBoolean from '../useBoolean';

export interface Options {
  target?: () => HTMLElement | React.RefObject<HTMLInputElement>;
  onEnter?: () => void;
  onLeave?: () => void;
}

export default (
  options?: Options,
): boolean => {
  const { target, onEnter, onLeave } = options || {};

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
    // @ts-ignore
    const targetElement = typeof target === 'function' ? target() : target.current;
    // 如果 传入dom
    if (targetElement) {
      targetElement.addEventListener('mouseenter', onMouseEnter);
      targetElement.addEventListener('mouseleave', onMouseLeave);
      return () => {
        targetElement.removeEventListener('mouseenter', onMouseEnter);
        targetElement.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, [typeof target === 'function' ? undefined : target]);

  return !!state;
};
