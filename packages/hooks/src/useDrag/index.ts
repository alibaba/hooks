import { useEffect } from 'react';
import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/dom2';
import { getTargetElement } from '../utils/dom2';

export interface Options {
  onDragStart?: (event: React.DragEvent) => void;
  onDragEnd?: (event: React.DragEvent) => void;
}

const useDrag = <T>(data: T, target: BasicTarget, options: Options = {}) => {
  const optionsRef = useLatest(options);

  useEffect(() => {
    const targetElement = getTargetElement(target);
    if (!targetElement?.addEventListener) {
      return;
    }

    const onDragStart = (event: React.DragEvent) => {
      optionsRef.current.onDragStart?.(event);
      event.dataTransfer.setData('custom', JSON.stringify(data));
    };

    const onDragEnd = (event: React.DragEvent) => {
      optionsRef.current.onDragEnd?.(event);
    };

    targetElement.setAttribute('draggable', 'true');

    targetElement.addEventListener('dragstart', onDragStart as any);
    targetElement.addEventListener('dragend', onDragEnd as any);

    return () => {
      targetElement.removeEventListener('dragstart', onDragStart as any);
      targetElement.removeEventListener('dragend', onDragEnd as any);
    };
  }, [typeof target === 'function' ? 'undefined' : target]);
};

export default useDrag;
