import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

export interface Options {
  onDragStart?: (event: React.DragEvent) => void;
  onDragEnd?: (event: React.DragEvent) => void;
  dragImg?: {
    img: string | HTMLImageElement;
    offsetX?: number;
    offsetY?: number;
  };
}

const useDrag = <T>(data: T, target: BasicTarget, options: Options = {}) => {
  const optionsRef = useLatest(options);
  const dataRef = useLatest(data);
  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target);
      if (!targetElement?.addEventListener) {
        return;
      }

      const onDragStart = (event: React.DragEvent) => {
        optionsRef.current.onDragStart?.(event);
        event.dataTransfer.setData('custom', JSON.stringify(dataRef.current));

        if (optionsRef.current.dragImg) {
          const { img, offsetX, offsetY } = optionsRef.current.dragImg;
          if (typeof img === 'string') {
            const imgElement = new Image();
            imgElement.src = img;
            event.dataTransfer.setDragImage(imgElement, offsetX || 0, offsetY || 0);
          } else {
            event.dataTransfer.setDragImage(img, offsetX || 0, offsetY || 0);
          }
        }
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
    },
    [],
    target,
  );
};

export default useDrag;
