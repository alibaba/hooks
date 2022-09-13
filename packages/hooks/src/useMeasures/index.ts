import { useMemo } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import useRafState from '../useRafState';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useIsomorphicLayoutEffectWithTarget from '../utils/useIsomorphicLayoutEffectWithTarget';

export type UseMeasuresRect = Omit<DOMRectReadOnly, 'toJSON'>;
export type UseMeasuresResult = UseMeasuresRect;

export const defaultState: UseMeasuresRect = {
  x: 0,
  y: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
};

function useMeasures(target: BasicTarget): UseMeasuresResult {
  const [measures, setMeasures] = useRafState<UseMeasuresRect>(defaultState);
  const observer = useMemo(
    () =>
      new ResizeObserver((entries) => {
        const [observedEl] = entries;

        if (observedEl) {
          setMeasures(observedEl.contentRect);
        }
      }),
    [],
  );

  useIsomorphicLayoutEffectWithTarget(
    () => {
      const element = getTargetElement(target);

      if (element) observer.observe(element);

      return () => {
        observer.disconnect();
      };
    },
    [],
    target,
  );

  return measures;
}

export default useMeasures;
