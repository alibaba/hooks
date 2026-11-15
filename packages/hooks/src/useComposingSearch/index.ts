import { useRef } from 'react';
import useDebounceFn from '../useDebounceFn';
import useMemoizedFn from '../useMemoizedFn';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

export interface Options<T extends HTMLElement = HTMLElement> {
  /**
   * Debounce wait in milliseconds.
   * @default 300
   */
  wait?: number;
  /**
   * Element or ref that receives the IME composition events. Composition
   * events bubble, so the wrapper of the real input works too.
   * @default document
   */
  target?: BasicTarget<T>;
}

export interface Result {
  /**
   * Debounced search runner. Call it from the input's change handler; keys
   * typed while an IME is composing are held instead of searched.
   */
  run: (keyword: string) => void;
  /** Cancel a pending search. */
  cancel: () => void;
  /** Run a pending search immediately. Do not call while composing. */
  flush: () => void;
}

/**
 * Debounced search that ignores the intermediate keys of an IME composition.
 *
 * Typing `zhongguo` and picking `中国` sends one search for `中国` instead of
 * nine searches for the pinyin fragments.
 */
const useComposingSearch = <T extends HTMLElement = HTMLElement>(
  fn: (keyword: string) => void,
  options: Options<T> = {},
): Result => {
  const { wait = 300, target } = options;

  const composingRef = useRef<boolean>(false);
  // Whether a keyword arrived while composing, and the latest one seen. Both
  // are updated synchronously in `run`, so the committed text wins whichever
  // side of `compositionend` the browser reports it on.
  const composedRunRef = useRef<boolean>(false);
  const latestKeywordRef = useRef<string | null>(null);

  const {
    run: debouncedRun,
    cancel,
    flush,
  } = useDebounceFn(
    (keyword: string) => {
      if (composingRef.current) {
        return;
      }
      fn(keyword);
    },
    { wait },
  );

  const run = useMemoizedFn((keyword: string) => {
    latestKeywordRef.current = keyword;
    if (composingRef.current) {
      composedRunRef.current = true;
    }
    debouncedRun(keyword);
  });

  useEffectWithTarget(
    () => {
      const el = (target ? getTargetElement(target) : undefined) ?? document;
      if (!el?.addEventListener) {
        return;
      }

      const onCompositionStart = () => {
        composingRef.current = true;
      };

      const onCompositionEnd = () => {
        composingRef.current = false;
        const pending = composedRunRef.current;
        composedRunRef.current = false;
        if (!pending) {
          return;
        }
        const keyword = latestKeywordRef.current;
        latestKeywordRef.current = null;
        if (keyword !== null) {
          // Re-arm the debounce with the latest keyword. A change event
          // carrying the committed text (whichever side of `compositionend`
          // the browser fires it on) goes through the same debounce and
          // replaces this call, so one search runs for the composed text; a
          // browser that sends no change event still searches the last
          // keyword instead of dropping it.
          debouncedRun(keyword);
        }
      };

      el.addEventListener('compositionstart', onCompositionStart);
      el.addEventListener('compositionend', onCompositionEnd);

      return () => {
        el.removeEventListener('compositionstart', onCompositionStart);
        el.removeEventListener('compositionend', onCompositionEnd);
      };
    },
    [target, debouncedRun],
    target,
  );

  return { run, cancel, flush };
};

export default useComposingSearch;
