import { getTargetElement, type BasicTarget } from '../utils/domTarget';
import { useState, useEffect, useRef } from 'react';
import useMouse, { type CursorState } from '../useMouse';
import useEventListener from '../useEventListener';

type ElementStateKeys = 'elementH' | 'elementW' | 'elementPosX' | 'elementPosY';

export type ElementState = Pick<CursorState, ElementStateKeys>;

export type Result = {
  clientX: number;
  clientY: number;
  isInside: boolean;
} & ElementState;

const useMouseInElement = (
  target?: BasicTarget,
  inCallback?: (result: Result) => void,
  outCallback?: (result: Result) => void,
) => {
  const { clientX, clientY } = useMouse();
  const elementStatus = useRef<ElementState>({
    elementH: 0,
    elementW: 0,
    elementPosX: 0,
    elementPosY: 0,
  });

  const [isInside, setIsInside] = useState(false);

  const [el, setEl] = useState<HTMLElement>(window?.document.body);

  useEffect(() => {
    const targetElement = getTargetElement(target);
    setEl((targetElement as HTMLElement) ?? window?.document.body);
  }, [target]);

  useEffect(() => {
    if (!el || !(el instanceof HTMLElement)) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    elementStatus.current.elementPosX = left;
    elementStatus.current.elementPosY = top;
    elementStatus.current.elementW = width;
    elementStatus.current.elementH = height;

    const elX = clientX - elementStatus.current.elementPosX;
    const elY = clientY - elementStatus.current.elementPosY;
    const isOutside =
      width === 0 || height === 0 || elX < 0 || elY < 0 || elX > width || elY > height;
    setIsInside(!isOutside);
  }, [el, clientX, clientY]);

  useEventListener(
    'mouseleave',
    () => {
      setIsInside(false);
    },
    { target: document },
  );

  const result: Result = {
    clientX,
    clientY,
    elementW: elementStatus.current.elementW,
    elementH: elementStatus.current.elementH,
    elementPosX: elementStatus.current.elementPosX,
    elementPosY: elementStatus.current.elementPosY,
    isInside,
  };

  useEffect(() => {
    if (!isInside) {
      outCallback?.(result);
    } else {
      inCallback?.(result);
    }
  }, [isInside]);

  return result;
};

export default useMouseInElement;
