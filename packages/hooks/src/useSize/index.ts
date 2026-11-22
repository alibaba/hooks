import ResizeObserver from 'resize-observer-polyfill';
import useRafState from '../useRafState';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useIsomorphicLayoutEffectWithTarget from '../utils/useIsomorphicLayoutEffectWithTarget';

type Size = { width: number; height: number };

function useSize(target: BasicTarget): Size | undefined {
  const [state, setState] = useRafState<Size | undefined>(() => {
    const el = getTargetElement(target);
    return el ? { width: el.clientWidth, height: el.clientHeight } : undefined;
  });

  useIsomorphicLayoutEffectWithTarget(
    () => {
      const el = getTargetElement(target);

      if (!el) {
        return;
      }

      const updateSize = ({ clientWidth: width, clientHeight: height }: Element) => {
        setState((previous) =>
          previous?.width === width && previous.height === height ? previous : { width, height },
        );
      };

      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => updateSize(entry.target));
      });
      resizeObserver.observe(el);

      // The client dimensions can change with padding even while the content box stays at zero.
      const borderBoxObserver =
        typeof window.ResizeObserver === 'function'
          ? new ResizeObserver((entries) => {
              entries.forEach((entry) => updateSize(entry.target));
            })
          : undefined;
      borderBoxObserver?.observe(el, { box: 'border-box' });

      // Ant Design Tabs with forceRender keeps inactive panes mounted under display:none.
      // ResizeObserver may not notify when an ancestor toggles display (size stays stale / 0
      // until a later window resize). Re-read size when the target becomes visible again.
      let intersectionObserver: IntersectionObserver | undefined;
      if (typeof IntersectionObserver !== 'undefined') {
        intersectionObserver = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              updateSize(el);
            }
          }
        });
        intersectionObserver.observe(el);
      }

      return () => {
        resizeObserver.disconnect();
        borderBoxObserver?.disconnect();
        intersectionObserver?.disconnect();
      };
    },
    [],
    target,
  );

  return state;
}

export default useSize;
